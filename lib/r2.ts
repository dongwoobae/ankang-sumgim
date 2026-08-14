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

// ── 여러 개를 전부 올리거나 하나도 안 남기거나 ────────────────
// 사진 한 장이 블러본과 원본 두 오브젝트로 저장되는데, 한쪽만 성공하면
// 공개 버킷에 짝 없는 오브젝트가 남는다. 무블러 원본이 남는 쪽이 특히 나쁘다.
// 부분 성공을 되돌리고 원래 오류를 그대로 올린다.
export async function uploadAllToR2(
  items: { key: string; body: Buffer }[],
  contentType: string,
): Promise<string[]> {
  const results = await Promise.allSettled(
    items.map((item) => uploadToR2(item.key, item.body, contentType)),
  );

  const failure = results.find((r) => r.status === "rejected");
  if (!failure) {
    return results.map((r) => (r as PromiseFulfilledResult<string>).value);
  }

  await Promise.allSettled(
    items
      .filter((_, i) => results[i].status === "fulfilled")
      .map((item) =>
        deleteFromR2(item.key).catch((e) =>
          console.error("[uploadAllToR2] 부분 성공 정리 실패:", item.key, e),
        ),
      ),
  );

  throw (failure as PromiseRejectedResult).reason;
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

/**
 * URL 목록에 해당하는 오브젝트를 지운다. 하나라도 실패하면 false.
 * 호출부는 false일 때 DB 행을 지우지 말아야 한다 — 행을 지우면 키를 잃어
 * 공개 버킷의 무블러 원본을 다시는 찾지 못한다.
 */
export async function deleteUrlsFromR2(urls: (string | null | undefined)[]): Promise<boolean> {
  const keys = urls.flatMap((url) => {
    if (!url) return [];
    const key = extractR2Key(url);
    return key ? [key] : [];
  });

  const results = await Promise.allSettled(keys.map((key) => deleteFromR2(key)));
  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error("[deleteUrlsFromR2] 삭제 실패:", keys[i], result.reason);
    }
  });

  return results.every((r) => r.status === "fulfilled");
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
