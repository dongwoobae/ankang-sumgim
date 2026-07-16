// lib/r2.ts
// Cloudflare R2 클라이언트 — @aws-sdk/client-s3 사용 (S3 호환)

import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// ── R2 클라이언트 싱글턴 ──────────────────────────────────────
export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

// ── 업로드 ────────────────────────────────────────────────────
// key 예) "photos/categories/42/1700000000000-abc123.webp"
export async function uploadToR2(key: string, body: Buffer, contentType: string): Promise<string> {
  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
  return `${process.env.R2_PUBLIC_URL}/${key}`;
}

// ── 삭제 ──────────────────────────────────────────────────────
export async function deleteFromR2(key: string): Promise<void> {
  await r2.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
    }),
  );
}

// ── URL → Key 변환 (삭제 시 사용) ────────────────────────────
export function extractR2Key(url: string): string | null {
  const base = process.env.R2_PUBLIC_URL;
  if (!base) return null;

  try {
    const parsedUrl = new URL(url);
    const parsedBase = new URL(base);
    // origin 동일성 강제 (타 origin/우회 차단)
    if (parsedUrl.origin !== parsedBase.origin) return null;
    // base의 path prefix(버킷 등) 제거해 순수 key만 반환
    const basePath = parsedBase.pathname.replace(/\/$/, "");
    if (!parsedUrl.pathname.startsWith(basePath)) return null;
    return parsedUrl.pathname.slice(basePath.length).replace(/^\//, "");
  } catch {
    return null;
  }
}
