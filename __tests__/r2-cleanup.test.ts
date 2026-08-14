import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));

vi.mock("@aws-sdk/client-s3", () => ({
  S3Client: class {
    send = sendMock;
  },
  PutObjectCommand: class PutObjectCommand {
    constructor(public input: { Key: string }) {}
  },
  DeleteObjectCommand: class DeleteObjectCommand {
    constructor(public input: { Key: string }) {}
  },
}));

const { deleteUrlsFromR2, uploadAllToR2 } = await import("@/lib/r2");

const PUBLIC_URL = "https://pub-test.r2.dev";

/** 목 호출에서 지정 커맨드의 Key만 뽑는다. */
function keysOf(command: "PutObjectCommand" | "DeleteObjectCommand"): string[] {
  return sendMock.mock.calls
    .map(([arg]) => arg)
    .filter((arg) => arg.constructor.name === command)
    .map((arg) => arg.input.Key);
}

beforeEach(() => {
  sendMock.mockReset();
  sendMock.mockResolvedValue({});
  vi.stubEnv("R2_PUBLIC_URL", PUBLIC_URL);
  vi.stubEnv("R2_BUCKET_NAME", "test-bucket");
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("uploadAllToR2", () => {
  it("전부 성공하면 URL을 순서대로 돌려주고 아무것도 지우지 않는다", async () => {
    const urls = await uploadAllToR2(
      [
        { key: "photos/1/blurred/a.webp", body: Buffer.from("b") },
        { key: "photos/1/original/a.webp", body: Buffer.from("o") },
      ],
      "image/webp",
    );

    expect(urls).toEqual([
      `${PUBLIC_URL}/photos/1/blurred/a.webp`,
      `${PUBLIC_URL}/photos/1/original/a.webp`,
    ]);
    expect(keysOf("DeleteObjectCommand")).toEqual([]);
  });

  // 원본만 남으면 무블러 얼굴 사진이 짝 없이 공개 버킷에 남는다.
  it("하나가 실패하면 이미 올라간 것을 지우고 원래 오류를 올린다", async () => {
    const boom = new Error("R2 down");
    sendMock.mockImplementation(
      (command: { constructor: { name: string }; input: { Key: string } }) =>
        command.constructor.name === "PutObjectCommand" && command.input.Key.includes("original")
          ? Promise.reject(boom)
          : Promise.resolve({}),
    );

    await expect(
      uploadAllToR2(
        [
          { key: "photos/1/blurred/a.webp", body: Buffer.from("b") },
          { key: "photos/1/original/a.webp", body: Buffer.from("o") },
        ],
        "image/webp",
      ),
    ).rejects.toBe(boom);

    expect(keysOf("DeleteObjectCommand")).toEqual(["photos/1/blurred/a.webp"]);
  });

  it("정리마저 실패해도 원래 오류를 삼키지 않는다", async () => {
    const boom = new Error("R2 down");
    sendMock.mockImplementation(
      (command: { constructor: { name: string }; input: { Key: string } }) =>
        command.constructor.name === "PutObjectCommand" && command.input.Key.includes("original")
          ? Promise.reject(boom)
          : command.constructor.name === "DeleteObjectCommand"
            ? Promise.reject(new Error("delete also down"))
            : Promise.resolve({}),
    );

    await expect(
      uploadAllToR2(
        [
          { key: "photos/1/blurred/a.webp", body: Buffer.from("b") },
          { key: "photos/1/original/a.webp", body: Buffer.from("o") },
        ],
        "image/webp",
      ),
    ).rejects.toBe(boom);
  });
});

describe("deleteUrlsFromR2", () => {
  it("전부 지워지면 true, null은 건너뛴다", async () => {
    const ok = await deleteUrlsFromR2([`${PUBLIC_URL}/photos/1/blurred/a.webp`, null, undefined]);

    expect(ok).toBe(true);
    expect(keysOf("DeleteObjectCommand")).toEqual(["photos/1/blurred/a.webp"]);
  });

  // false면 호출부가 DB 행을 남긴다 — 행을 지우면 키를 잃는다.
  it("하나라도 실패하면 false", async () => {
    sendMock.mockRejectedValueOnce(new Error("R2 down"));

    const ok = await deleteUrlsFromR2([
      `${PUBLIC_URL}/photos/1/blurred/a.webp`,
      `${PUBLIC_URL}/photos/1/original/a.webp`,
    ]);

    expect(ok).toBe(false);
  });

  it("다른 origin의 URL은 삭제하지 않는다", async () => {
    const ok = await deleteUrlsFromR2(["https://evil.example.com/photos/1/a.webp"]);

    expect(ok).toBe(true);
    expect(keysOf("DeleteObjectCommand")).toEqual([]);
  });
});
