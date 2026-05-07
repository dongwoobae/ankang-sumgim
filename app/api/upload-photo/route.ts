// app/api/upload-photo/route.ts
// Server Action 대신 API Route로 구현 → Promise.all 병렬 업로드 가능
// 인증: Supabase 세션 확인 (middleware는 /admin만 커버하므로 직접 체크)

import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { uploadToR2 } from "@/lib/r2";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export type UploadPhotoResponse =
  | { url: string; originalUrl: string | null }
  | { error: string };

export async function POST(
  req: NextRequest,
): Promise<NextResponse<UploadPhotoResponse>> {
  // ── 인증 확인 ─────────────────────────────────────────────────────────────
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  // ── FormData 파싱 ─────────────────────────────────────────────────────────
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "요청 파싱 실패" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const folder = formData.get("folder") as string | null;
  const faceRegionsRaw = formData.get("faceRegions") as string | null;

  if (!file || !folder) {
    return NextResponse.json(
      { error: "file, folder는 필수입니다." },
      { status: 400 },
    );
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/heic"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: `지원하지 않는 형식: ${file.type}` },
      { status: 400 },
    );
  }

  if (file.size > 30 * 1024 * 1024) {
    return NextResponse.json(
      { error: "파일 크기가 30MB를 초과합니다." },
      { status: 400 },
    );
  }

  type FaceRegion = { x: number; y: number; width: number; height: number };
  let faceRegions: FaceRegion[] = [];
  if (faceRegionsRaw) {
    try {
      faceRegions = JSON.parse(faceRegionsRaw);
    } catch {
      faceRegions = [];
    }
  }

  // ── Sharp 처리 + R2 업로드 ────────────────────────────────────────────────
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    // 얼굴 없는 경우: 단순 압축 업로드
    if (faceRegions.length === 0) {
      const compressed = await sharp(buffer)
        .rotate()
        .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
        .webp({ quality: 75 })
        .toBuffer();

      const key = `${folder}/${timestamp}.webp`;
      const url = await uploadToR2(key, compressed, "image/webp");
      return NextResponse.json({ url, originalUrl: null });
    }

    // 얼굴 있는 경우: 원본 + 블러 버전 각각 업로드
    const rotatedBuffer = await sharp(buffer).rotate().toBuffer();
    const meta = await sharp(rotatedBuffer).metadata();
    const imgW = meta.width ?? 1920;
    const imgH = meta.height ?? 1920;

    const originalCompressed = await sharp(rotatedBuffer)
      .resize(1920, 1920, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();

    const resizedMeta = await sharp(originalCompressed).metadata();
    const resizedW = resizedMeta.width ?? imgW;
    const resizedH = resizedMeta.height ?? imgH;

    // 블러 합성
    const composites = await Promise.all(
      faceRegions
        .map((face) => ({
          fx: Math.max(0, Math.round((face.x / imgW) * resizedW)),
          fy: Math.max(0, Math.round((face.y / imgH) * resizedH)),
          fw: Math.min(Math.round((face.width / imgW) * resizedW), resizedW),
          fh: Math.min(Math.round((face.height / imgH) * resizedH), resizedH),
        }))
        .filter(({ fw, fh }) => fw > 4 && fh > 4)
        .map(async ({ fx, fy, fw, fh }) => {
          const blurredRegion = await sharp(originalCompressed)
            .extract({ left: fx, top: fy, width: fw, height: fh })
            .blur(28)
            .toBuffer();
          return { input: blurredRegion, left: fx, top: fy };
        }),
    );

    const blurredBuffer =
      composites.length > 0
        ? await sharp(originalCompressed)
            .composite(composites)
            .webp({ quality: 75 })
            .toBuffer()
        : originalCompressed;

    const [url, originalUrl] = await Promise.all([
      uploadToR2(
        `${folder}/blurred/${timestamp}.webp`,
        blurredBuffer,
        "image/webp",
      ),
      uploadToR2(
        `${folder}/original/${timestamp}.webp`,
        originalCompressed,
        "image/webp",
      ),
    ]);

    return NextResponse.json({ url, originalUrl });
  } catch (err) {
    console.error("[api/upload-photo] 오류:", err);
    return NextResponse.json(
      { error: "업로드 중 서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
