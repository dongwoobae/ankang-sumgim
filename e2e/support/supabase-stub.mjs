/**
 * E2E용 Supabase 대역 서버.
 *
 * 이 레포의 관리자 인증은 SSR 쿠키 기반이라 Supabase 왕복이 전부 Next 서버에서 일어난다.
 * 브라우저를 거치지 않으므로 Playwright의 page.route로는 가로챌 수 없다. 그래서 실제
 * HTTP 서버를 띄우고 NEXT_PUBLIC_SUPABASE_URL을 여기로 돌린다.
 *
 * 발급하는 액세스 토큰은 alg=HS256이다. auth-js의 getClaims()는 대칭 알고리즘이면
 * 로컬 검증을 포기하고 /auth/v1/user로 물어보므로(GoTrueClient.getClaims), 서명이
 * 가짜여도 이 서버가 인증 여부를 온전히 통제한다. proxy.ts가 그 경로를 탄다.
 */
import { createServer } from "node:http";

const PORT = Number(process.env.SUPABASE_STUB_PORT ?? 54399);

export const ADMIN_EMAIL = "admin@example.com";
export const ADMIN_PASSWORD = "e2e-password";

const USER = {
  id: "00000000-0000-4000-8000-000000000001",
  email: ADMIN_EMAIL,
  aud: "authenticated",
  role: "authenticated",
  app_metadata: { provider: "email" },
  user_metadata: {},
  created_at: "2026-01-01T00:00:00.000Z",
};

const b64url = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");

function issueSession() {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url({ alg: "HS256", typ: "JWT" });
  const payload = b64url({
    sub: USER.id,
    email: USER.email,
    aud: "authenticated",
    role: "authenticated",
    iss: `http://127.0.0.1:${PORT}/auth/v1`,
    iat: now,
    exp: now + 3600,
  });
  const accessToken = `${header}.${payload}.${"e2e".padEnd(43, "x")}`;
  return {
    access_token: accessToken,
    refresh_token: "e2e-refresh-token",
    token_type: "bearer",
    expires_in: 3600,
    expires_at: now + 3600,
    user: USER,
  };
}

// ── in-memory 데이터 ────────────────────────────────────────────────────────
const categories = [{ id: 1, name: "E2E 카테고리" }];
let photos = [];
let nextPhotoId = 1;

function reset() {
  photos = [];
  nextPhotoId = 1;
}

// ── 응답 헬퍼 ───────────────────────────────────────────────────────────────
function send(res, status, body) {
  const payload = body === undefined ? "" : JSON.stringify(body);
  res.writeHead(status, {
    "content-type": "application/json",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "*",
    "access-control-expose-headers": "*",
  });
  res.end(payload);
}

/** PostgREST는 Accept가 object+json이면 배열이 아니라 단건을 돌려준다(.single()). */
const wantsSingle = (req) => String(req.headers.accept ?? "").includes("object+json");

function readBody(req) {
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : null);
      } catch {
        resolve(null);
      }
    });
  });
}

/** `?id=eq.3` → "3" */
const eqValue = (url, column) => {
  const raw = url.searchParams.get(column);
  return raw?.startsWith("eq.") ? raw.slice(3) : null;
};

// ── 라우팅 ──────────────────────────────────────────────────────────────────
async function handleAuth(req, res, url) {
  if (url.pathname.endsWith("/token")) {
    const body = (await readBody(req)) ?? {};
    if (url.searchParams.get("grant_type") === "refresh_token") {
      return send(res, 200, issueSession());
    }
    if (body.email !== ADMIN_EMAIL || body.password !== ADMIN_PASSWORD) {
      return send(res, 400, {
        error: "invalid_grant",
        error_description: "Invalid login credentials",
        message: "Invalid login credentials",
      });
    }
    return send(res, 200, issueSession());
  }

  if (url.pathname.endsWith("/logout")) return send(res, 204);

  if (url.pathname.endsWith("/user")) {
    const token = String(req.headers.authorization ?? "").replace(/^Bearer\s+/i, "");
    // 발급한 토큰은 3-segment JWT다. 그 외(anon key 등)는 세션이 아니다.
    if (token.split(".").length !== 3) {
      return send(res, 401, { message: "invalid claim: missing sub claim", code: 401 });
    }
    return send(res, 200, USER);
  }

  if (url.pathname.endsWith("/settings")) {
    return send(res, 200, { external: {}, disable_signup: true, mailer_autoconfirm: true });
  }

  return send(res, 200, {});
}

async function handleRest(req, res, url) {
  const table = url.pathname.replace("/rest/v1/", "");

  if (req.method === "GET" || req.method === "HEAD") {
    if (table === "photo_categories") {
      const id = eqValue(url, "id");
      const rows = categories
        .filter((c) => id === null || String(c.id) === id)
        // 업로드 페이지가 select="id, name, photos(...)"로 임베드해 읽는다.
        .map((c) => ({ ...c, photos: photos.filter((p) => p.category_id === c.id) }));
      return send(res, 200, wantsSingle(req) ? (rows[0] ?? null) : rows);
    }
    if (table === "photos") {
      const id = eqValue(url, "id");
      const categoryId = eqValue(url, "category_id");
      const rows = photos.filter(
        (p) =>
          (id === null || String(p.id) === id) &&
          (categoryId === null || String(p.category_id) === categoryId),
      );
      return send(res, 200, wantsSingle(req) ? (rows[0] ?? null) : rows);
    }
    return send(res, 200, wantsSingle(req) ? null : []);
  }

  if (req.method === "POST") {
    const body = (await readBody(req)) ?? {};
    const incoming = Array.isArray(body) ? body : [body];
    const inserted = incoming.map((row) => {
      const created = { id: nextPhotoId++, created_at: new Date().toISOString(), ...row };
      if (table === "photos") photos.push(created);
      return created;
    });
    return send(res, 201, wantsSingle(req) ? inserted[0] : inserted);
  }

  if (req.method === "PATCH" || req.method === "DELETE") {
    if (table === "photos" && req.method === "DELETE") {
      const id = eqValue(url, "id");
      photos = photos.filter((p) => String(p.id) !== id);
    }
    return send(res, 204);
  }

  return send(res, 405, { message: "method not allowed" });
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://127.0.0.1:${PORT}`);

  if (req.method === "OPTIONS") return send(res, 204);

  // 테스트 간 격리용. Playwright 훅에서 호출한다.
  if (url.pathname === "/__reset") {
    reset();
    return send(res, 200, { ok: true });
  }
  if (url.pathname === "/__health") return send(res, 200, { ok: true });

  if (url.pathname.startsWith("/auth/v1/")) return handleAuth(req, res, url);
  if (url.pathname.startsWith("/rest/v1/")) return handleRest(req, res, url);

  return send(res, 404, { message: "not found" });
}).listen(PORT, "127.0.0.1", () => {
  console.log(`[supabase-stub] listening on http://127.0.0.1:${PORT}`);
});
