// app/api/upload-photo/route.ts
// Server Action 대신 API Route로 구현 → Promise.all 병렬 업로드 가능
// 인증: Supabase 세션 확인 (middleware는 /admin만 커버하므로 직접 체크)

import { NextRequest, NextResponse } from "next/server";
import { uploadAllToR2, uploadToR2 } from "@/lib/r2";
import { isFaceRegion, type FaceRegion } from "@/lib/blur-regions";
import { composePhotoUpload } from "@/lib/photo-blur";
import { detectImageType } from "@/lib/image-type";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const FOLDER_PATTERN = /^(photos|awards|hero)(\/[A-Za-z0-9_-]+)*$/;

export type UploadPhotoResponse = { url: string; originalUrl: string | null } | { error: string };

export async function POST(req: NextRequest): Promise<NextResponse<UploadPhotoResponse>> {
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
    return NextResponse.json({ error: "file, folder는 필수입니다." }, { status: 400 });
  }

  if (!FOLDER_PATTERN.test(folder)) {
    return NextResponse.json({ error: "잘못된 folder" }, { status: 400 });
  }

  // HEIC 제외: Vercel의 sharp 프리빌드에 HEVC 디코더가 없어 처리 불가
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: `지원하지 않는 형식: ${file.type} (HEIC는 JPG로 변환 후 업로드)` },
      { status: 400 },
    );
  }

  if (file.size > 30 * 1024 * 1024) {
    return NextResponse.json({ error: "파일 크기가 30MB를 초과합니다." }, { status: 400 });
  }

  let faceRegions: FaceRegion[] = [];
  if (faceRegionsRaw) {
    try {
      const parsed = JSON.parse(faceRegionsRaw) as unknown;
      if (!Array.isArray(parsed) || parsed.length > 50 || !parsed.every(isFaceRegion)) {
        return NextResponse.json({ error: "잘못된 faceRegions" }, { status: 400 });
      }
      faceRegions = parsed;
    } catch {
      return NextResponse.json({ error: "잘못된 faceRegions" }, { status: 400 });
    }
  }

  // ── Sharp 처리 + R2 업로드 ────────────────────────────────────────────────
  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    // file.type은 클라이언트 선언값이라 위조 가능 → 매직바이트로 실제 포맷 확인
    const detected = detectImageType(buffer);
    if (!detected || !allowedTypes.includes(detected)) {
      return NextResponse.json(
        { error: "이미지 파일이 아니거나 지원하지 않는 형식입니다." },
        { status: 400 },
      );
    }

    const timestamp = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const composed = await composePhotoUpload(buffer, faceRegions);
    if (!composed.ok) {
      return NextResponse.json({ error: composed.error }, { status: 422 });
    }

    if (composed.kind === "plain") {
      const url = await uploadToR2(`${folder}/${timestamp}.webp`, composed.image, "image/webp");
      return NextResponse.json({ url, originalUrl: null });
    }

    const [url, originalUrl] = await uploadAllToR2(
      [
        { key: `${folder}/blurred/${timestamp}.webp`, body: composed.blurred },
        { key: `${folder}/original/${timestamp}.webp`, body: composed.original },
      ],
      "image/webp",
    );

    return NextResponse.json({ url, originalUrl });
  } catch (err) {
    console.error("[api/upload-photo] 오류:", err);
    return NextResponse.json({ error: "업로드 중 서버 오류가 발생했습니다." }, { status: 500 });
  }
}
