# 안강 섬김 노인복지센터 홈페이지

> 경상북도 경주시 안강읍에 위치한 안강 섬김 노인복지센터의 공식 홈페이지 및 운영자 관리 시스템

[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-DB%20%2F%20Auth-3ECF8E?logo=supabase)](https://supabase.com/)
[![Cloudflare R2](https://img.shields.io/badge/Cloudflare_R2-Storage-F38020?logo=cloudflare&logoColor=white)](https://www.cloudflare.com/developer-platform/r2/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://vercel.com/)

---

## 📖 프로젝트 소개

안강 섬김 노인복지센터의 서비스, 상담, 공지, 사진 기록, 채용 정보를 한곳에서 제공하는 공식 웹사이트입니다.

센터를 처음 찾는 보호자와 어르신이 방문요양 서비스, 노인장기요양보험, 등급 신청 절차, 본인부담금 정보를 쉽게 이해할 수 있도록 공개 페이지를 구성했고, 운영자는 `/admin`에서 공지사항, 사진 게시판, 상담문의, 구인 지원, 메인 사진, 수상 내역, 계산기 기준값을 직접 관리할 수 있습니다.

특히 사진 게시판은 노인복지센터 특성상 개인정보 보호가 중요하므로, 업로드 단계에서 얼굴을 자동 감지해 블러 처리하고 수동 보정까지 할 수 있도록 설계했습니다.

---

## 🚀 핵심 성과

- **1인 개발 전 과정 수행** — 요구사항 정리부터 정보 구조, UI, 백엔드, 데이터베이스, 인프라, 배포·운영까지 단독으로 설계하고 구현
- **이용자 초상권 보호 파이프라인** — 브라우저 얼굴 감지, 서버 Sharp 블러, 원본·공개본 분리 저장, 관리자 수동 보정을 결합
- **서버리스 이미지 업로드 최적화** — 3.5MB 초과 이미지를 브라우저에서 최대 1920px로 압축해 Vercel 요청 본문 제한에 대응
- **신뢰 경계 검증** — MIME 선언을 신뢰하지 않고 JPEG·PNG·WebP 매직바이트와 얼굴 좌표를 서버에서 재검증하며, 처리 불가능한 HEIC는 변환 방법과 함께 명확히 거절
- **인증·데이터 보안 강화** — Supabase JWT 로컬 검증, RLS·service role 경계, SECURITY DEFINER 함수 권한 회수, 스팸 방지와 원자적 rate limit 적용
- **운영 기능 통합** — 공지·사진·상담·답변 발송·수상 이력·구인 지원자·장기요양 계산기·오류 로그를 하나의 관리자 시스템에서 관리
- **서비스 주소** — [https://sumgim-welfare.com](https://sumgim-welfare.com)

---

## ✨ 주요 기능

### 사용자 공개 페이지

- 🏠 **홈** — Hero 사진 캐러셀, 센터 핵심 메시지, 통계/서비스 요약, 공지사항 미리보기
- 👋 **센터 소개** — 인사말, 센터 철학, 오시는 길, 카카오맵/지도 HTML 연동
- 🏅 **수상·기관선정** — DB 기반 수상 및 기관 선정 이력 노출
- 🧾 **노인장기요양보험 안내** — 제도 설명, 방문요양, 가족요양, 인지활동서비스, 등급 신청 흐름 안내
- 🧮 **본인부담금 계산기** — 등급과 이용 시간을 선택하면 예상 월 본인부담금 자동 계산
- 💬 **상담문의** — 온라인 문의 접수, FAQ 아코디언, 이메일/SMS 답변 연계
- 📰 **공지사항** — 고정 공지, 목록, 상세 페이지 제공
- 🖼️ **사진 게시판** — 얼굴 비식별화된 앨범 목록·상세, 키보드/배경 클릭을 지원하는 사진 라이트박스
- 🙋 **요양보호사 구인** — 상시 구인 안내, 전화/카카오톡 상담 유도
- 🔐 **개인정보처리방침** — 상담 및 개인정보 처리 안내
- 🎵 **배경 음악 설정** — 정적 음악 파일과 흐르는 제목 UI 지원

### 관리자 페이지 (`/admin`)

Supabase Auth 세션을 기준으로 보호되며, `middleware.ts`에서 `/admin` 하위 경로 접근을 제어합니다.

- 🔒 **관리자 로그인** — `/admin/login`만 공개 접근 허용, 나머지 관리자 라우트는 Supabase JWT를 로컬 검증해 보호
- 📊 **대시보드** — 운영 현황 패널과 주요 관리 메뉴 진입점
- 📝 **공지사항 관리** — 목록, 작성, 수정, 삭제, 고정 공지 관리
- 🖼️ **사진 게시판 관리** — 카테고리 생성/삭제, 앨범별 사진 업로드
- 😶‍🌫️ **얼굴 자동 블러** — face-api.js 감지 좌표를 리사이즈본에 맞게 변환·클램프한 뒤 Sharp로 여러 얼굴을 병렬 블러 처리
- ✍️ **수동 블러 편집** — 자동 감지가 놓친 영역을 관리자가 직접 드래그 지정
- 💬 **상담문의 관리** — 문의 목록/상세 조회, 답변 작성, 답변 완료 상태 토글
- 📩 **답변 발송** — Resend 이메일, Solapi SMS 연동
- 👥 **기존 지원자 데이터 관리** — 과거 온라인 접수 데이터의 상태값, 메모 관리
- 🏞️ **메인 Hero 사진 관리** — 홈페이지 첫 화면 사진 업로드/삭제/순서 관리
- 🏅 **수상·기관선정 관리** — 수상 내역 CRUD
- 🧮 **계산기 설정 관리** — 장기요양 등급별 월 한도액, 방문요양 시간별 수가 관리
- 🧯 **오류 로그 조회** — Server Action/API 오류를 DB에 기록하고 관리자 화면에서 확인
- 📱 **반응형 사이드바** — 데스크탑 접힘/펼침, 모바일 오버레이 메뉴 지원

### 보안·운영 기능

- 🪤 **Honeypot 스팸 방지** — 숨겨진 필드 값이 있으면 봇 제출로 판단
- ⏱️ **제출 시간 체크** — 폼 로드 후 3초 미만 제출 차단
- 🚦 **Rate Limiting** — 동일 IP 기준 1시간 내 문의 제출 횟수 제한
- 🧼 **HTML 이스케이프** — 문의/답변 본문 인젝션 방어
- 🗂️ **R2 key 추출 검증** — Cloudflare R2 삭제 시 허용된 URL만 key 추출
- 🧪 **업로드 실파일 검증** — JPEG·PNG·WebP 매직바이트 확인, 위조 MIME·SVG 차단, HEIC 변환 안내
- 🗜️ **클라이언트 이미지 압축** — 대용량 이미지를 업로드 전에 WebP/JPEG로 축소해 서버리스 요청 크기 제한 대응
- ☁️ **R2 파이프라인 통합** — 사진 원본·블러본, Hero, 수상 이미지를 동일한 Cloudflare R2 업로드/삭제 흐름으로 관리
- 🛡️ **Supabase RLS 보안 보강** — 공개 읽기·문의 접수만 정책으로 허용하고 관리자 쓰기는 service role로 분리, 자동 RLS 함수의 외부 실행 권한 회수
- ⚡ **리전·인증 최적화** — Vercel 함수를 Supabase와 같은 서울 리전에 배치하고 middleware 인증 서버 왕복 제거
- 🔎 **SEO 기본 구성** — 동적 sitemap, robots, OG 이미지, 페이지별 metadata
- 🌐 **도메인 리다이렉트** — `ankang-sumgim.vercel.app` → `sumgim-welfare.com` 영구 리다이렉트

---

## 🛠️ 기술 스택

| 구분             | 기술                                                 |
| ---------------- | ---------------------------------------------------- |
| Framework        | Next.js 16 App Router                                |
| Language         | TypeScript                                           |
| UI               | React 19                                             |
| Styling          | Tailwind CSS v4, CSS variables                       |
| Auth             | Supabase Auth, `@supabase/ssr`                       |
| Database         | Supabase PostgreSQL                                  |
| Storage          | Cloudflare R2 (사진 원본·블러본, Hero, 수상 이미지)  |
| Image Processing | 브라우저 선압축, Sharp 리사이즈·WebP 변환·얼굴 블러  |
| Face Detection   | face-api.js Tiny Face Detector                       |
| Email            | Resend                                               |
| SMS              | Solapi                                               |
| Icons            | Lucide React                                         |
| Analytics        | Vercel Analytics, Speed Insights                     |
| Test             | Vitest                                               |
| Code Quality     | ESLint, Prettier, TypeScript                         |
| CI               | GitHub Actions (lint, format check, typecheck, test) |
| Deploy           | Vercel                                               |

---

## 📁 프로젝트 구조

```text
app/
  (public)/                         # 공개 페이지 그룹
    page.tsx                        # 메인 홈
    about/
      greeting/page.tsx             # 센터 인사말
      location/page.tsx             # 오시는 길
      awards/page.tsx               # 수상·기관선정
    services/
      insurance/page.tsx            # 노인장기요양보험 안내
      visit-care/page.tsx           # 방문요양 서비스
      family-care/page.tsx          # 가족요양 안내
      cognitive/page.tsx            # 인지활동서비스
      grade-apply/page.tsx          # 등급 신청 안내
    calculator/
      page.tsx                      # 본인부담금 계산기 서버 페이지
      CalculatorClient.tsx          # 계산기 클라이언트 인터랙션
    board/
      notice/page.tsx               # 공지사항 목록
      notice/[id]/page.tsx          # 공지사항 상세
      photos/page.tsx               # 사진 앨범 목록
      photos/[id]/page.tsx          # 앨범 상세/라이트박스
    inquiry/page.tsx                # 상담문의 + FAQ
    recruit/page.tsx                # 요양보호사 상시 구인 안내
    privacy/page.tsx                # 개인정보처리방침
  admin/                            # 관리자 페이지
    login/page.tsx                  # 관리자 로그인
    page.tsx                        # 대시보드
    notices/                        # 공지사항 목록/작성/수정
    photos/                         # 사진 카테고리/업로드 관리
    inquiries/                      # 상담문의 목록/상세/답변
    recruits/page.tsx               # 기존 구인 지원자 데이터 관리
    hero/page.tsx                   # 메인 Hero 사진 관리
    awards/page.tsx                 # 수상·기관선정 관리
    calculator/page.tsx             # 계산기 수가/한도액 관리
    logs/page.tsx                   # 오류 로그 조회
  actions/
    sendInquiry.ts                  # 공개 상담문의 제출
    submitJobApplication.ts         # 공개 구인 지원 제출
    adminInquiry.ts                 # 관리자 문의 답변
    admin/                          # 관리자 Server Actions
      auth.ts                       # 로그인/로그아웃
      notices.ts                    # 공지 CRUD
      photos.ts                     # 사진 카테고리/사진 관리
      uploadPhoto.ts                # 사진 업로드 + 자동 블러
      applyManualBlur.ts            # 수동 블러 적용
      inquiries.ts                  # 문의 관리
      recruits.ts                   # 기존 구인 지원자 데이터 관리
      hero.ts                       # Hero 사진 관리
      awards.ts                     # 수상 내역 관리
      calculator.ts                 # 계산기 기준값 관리
  api/upload-photo/route.ts         # Sharp + R2 사진 업로드 API
  sitemap.ts                        # 정적/동적 sitemap
  robots.ts                         # robots.txt
components/
  layout/                           # Header, Footer, FloatingButton, HeroPhotoCarousel
  home/                             # Hero, Stats, HeroBackground 등 홈 컴포넌트
  board/                            # 공지/사진 게시판 카드, 목록, 툴바
  admin/                            # AdminSidebar, BlurEditor 등 관리자 UI
  common/                           # Reveal, CtaBanner, PageToc, SiblingNav
  services/                         # 서비스 절차 타임라인
  KakaoMap.tsx                      # 오시는 길 카카오맵
  PhotoGallery.tsx                  # 사진 갤러리 + 라이트박스
  FaqAccordion.tsx                  # FAQ 아코디언
lib/
  supabase/                         # browser/server/admin Supabase 클라이언트
  auth/requireSession.ts            # 관리자 세션 가드
  r2.ts                             # Cloudflare R2 업로드/삭제/key 추출
  client-image-compress.ts            # 대용량 이미지 브라우저 선압축
  image-type.ts                       # 매직바이트 기반 이미지 포맷 판별
  blur-regions.ts                     # 얼굴 좌표 검증·리사이즈·경계 클램프
  email.ts                          # Resend 이메일 발송
  sms.ts                            # Solapi SMS 발송
  rateLimit.ts                      # IP 기반 제출 제한
  errorLog.ts                       # 오류 로그 DB 기록
  escapeHtml.ts                     # HTML 이스케이프
  music.config.ts                   # 배경 음악 설정
public/
  models/                           # face-api.js Tiny Face Detector 모델
  music/                            # 정적 배경 음악 파일
  logo.png, og-image.jpg, map.html  # 브랜드/공유/지도 정적 자산
supabase/
  migrations/20260707000000_baseline_schema.sql # 운영 DB·RLS 단일 베이스라인
__tests__/                          # 인증·R2·이미지 검증·블러 좌표 Vitest
middleware.ts                       # /admin 인증 미들웨어
.github/workflows/ci.yml            # lint·Prettier·typecheck·test CI
```

---

## 🗄️ DB 스키마 (Supabase)

```sql
-- 공지사항
notices
  id           serial primary key
  title        text not null
  content      text not null
  is_pinned    boolean default false
  created_at   timestamptz default now()

-- 상담 문의
inquiries
  id           serial primary key
  name         text not null
  phone        text not null
  email        text
  title        text not null
  content      text not null
  is_answered  boolean default false
  created_at   timestamptz default now()

-- 문의 답변
inquiry_replies
  id           serial primary key
  inquiry_id   integer references inquiries(id) on delete cascade
  content      text not null
  created_at   timestamptz default now()

-- 사진 카테고리
photo_categories
  id           serial primary key
  name         text not null
  created_at   timestamptz default now()

-- 사진
photos
  id           serial primary key
  category_id  integer references photo_categories(id) on delete cascade
  url          text not null       -- 공개용 블러 이미지
  original_url text                -- 원본 이미지
  caption      text
  created_at   timestamptz default now()

-- 메인 Hero 사진
hero_photos
  id            uuid primary key default gen_random_uuid()
  url           text not null
  display_order integer default 1
  created_at    timestamptz default now()

-- 수상·기관선정
awards
  id            serial primary key
  title         text not null
  org           text not null
  description   text
  awarded_at    date not null
  image_url     text
  display_order integer default 1
  created_at    timestamptz default now()

-- 기존 온라인 지원 접수 데이터
job_applications
  id               serial primary key
  name             text not null
  phone            text not null
  certificates     text[] default '{}'
  preferred_region text not null
  work_type        text not null
  introduction     text
  status           text default 'pending'
  memo             text
  created_at       timestamptz default now()

-- 문의/지원 Rate Limiting
inquiry_rate_limits
  ip            text primary key
  attempts      integer default 1
  window_start  timestamptz default now()
  blocked_until timestamptz

-- 방문요양 수가
ltc_service_rates
  id               serial primary key
  service_type     text default 'visit_care'
  duration_minutes integer not null
  price            integer not null
  updated_at       timestamptz default now()

-- 장기요양 등급별 월 한도액
ltc_grade_limits
  id            serial primary key
  grade         text not null
  monthly_limit integer not null
  updated_at    timestamptz default now()

-- 오류 로그
error_logs
  id         serial primary key
  source     text not null
  message    text not null
  created_at timestamptz default now()
```

### RLS / 보안 정책

| 영역              | 정책                                                                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 공개 콘텐츠       | 공지, 사진, Hero, 수상 내역은 공개 페이지 조회 목적의 SELECT 허용                                                                        |
| 상담문의          | 공개 INSERT 허용, 목록/상세 관리는 관리자 서버 액션에서 service role로 처리                                                              |
| 관리자 작업       | 브라우저 직접 DB 쓰기 대신 Server Action + service role 경유                                                                             |
| 파일 저장         | 이미지 자산은 Cloudflare R2로 분리하며 Supabase 베이스라인은 Storage 버킷·정책을 관리하지 않음                                           |
| 보안 마이그레이션 | `supabase/migrations/20260707000000_baseline_schema.sql`에 운영 스키마·RLS와 `rls_auto_enable` 실행 권한 회수를 단일 베이스라인으로 관리 |

---

## ⚙️ 환경변수 설정

루트에 `.env.local` 파일을 생성하고 아래 값을 입력합니다.

```env
# 사이트 URL
NEXT_PUBLIC_SITE_URL=https://sumgim-welfare.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Cloudflare R2
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key_id
R2_SECRET_ACCESS_KEY=your_secret_access_key
R2_BUCKET_NAME=your_bucket_name
R2_PUBLIC_URL=https://pub-xxxx.r2.dev

# Resend
RESEND_API_KEY=your_resend_api_key
INQUIRY_EMAIL=your@email.com

# Solapi
SOLAPI_API_KEY=your_solapi_api_key
SOLAPI_API_SECRET=your_solapi_api_secret
SOLAPI_SENDER_PHONE=01012345678
```

---

## 🚀 로컬 실행

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속합니다.

```bash
# ESLint 검사
npm run lint

# Prettier 검사 / 자동 포맷
npm run format:check
npm run format

# TypeScript 검사
npm run typecheck

# Vitest 테스트
npm run test

# 프로덕션 빌드
npm run build
```

---

## 🧪 테스트 범위

현재 Vitest 단위 테스트는 인증·입력 신뢰 경계·이미지 비식별화처럼 운영 리스크가 큰 유틸 중심으로 구성되어 있습니다.

| 테스트                   | 검증 대상                                                    |
| ------------------------ | ------------------------------------------------------------ |
| `escapeHtml.test.ts`     | 문의/답변 HTML 이스케이프 및 XSS 방어 보조 로직              |
| `extractR2Key.test.ts`   | R2 공개 URL에서 삭제 가능한 key만 안전하게 추출              |
| `requireSession.test.ts` | 관리자 세션 검증 실패/성공 흐름                              |
| `image-type.test.ts`     | JPEG·PNG·WebP·HEIC 매직바이트 판별과 위조/미지원 형식 차단   |
| `blur-regions.test.ts`   | 얼굴 좌표 비례 변환, 경계 클램프, 다중 얼굴·비정상 입력 처리 |

---

## 📦 Cloudflare R2 / 이미지 처리

사진 업로드 흐름은 다음과 같습니다.

1. 관리자가 JPEG·PNG·WebP 사진을 선택합니다. HEIC는 서버 런타임에서 디코딩할 수 없어 JPG 변환 안내와 함께 거절합니다.
2. 3.5MB를 넘는 이미지는 브라우저에서 최대 1920px의 WebP/JPEG로 먼저 압축합니다.
3. 브라우저에서 face-api.js Tiny Face Detector 모델로 얼굴 위치를 감지합니다.
4. 서버는 세션, 폴더 prefix, 파일 크기, 매직바이트, 얼굴 좌표 구조를 다시 검증합니다.
5. Sharp가 EXIF 회전과 WebP 변환을 적용하고, 얼굴 좌표를 리사이즈본 기준으로 변환·클램프해 블러합니다.
6. 얼굴이 있으면 원본과 블러본을 Cloudflare R2에 병렬 저장하고, 공개 사진 게시판에는 블러본만 노출합니다.
7. 자동 감지가 부족하면 관리자가 원본을 기준으로 추가 영역을 지정해 수동 블러본을 다시 생성합니다.

Next Image 설정은 WebP 포맷, quality 75, 긴 캐시 TTL을 사용합니다.

---

## 🔐 스팸·개인정보 보호

상담문의와 채용 지원처럼 개인정보가 들어오는 입력 경로는 다음 방식을 조합합니다.

- Honeypot 필드로 단순 봇 제출 차단
- 폼 로드 후 3초 미만 제출 차단
- Supabase 기반 IP rate limit 적용
- 관리자 답변/문의 표시 전 HTML escape 처리
- 오래된 문의 데이터 삭제용 Supabase Cron Job 권장
- 사진 공개 전 얼굴 블러 처리로 이용자 초상권 보호

### Supabase Cron Job 예시

Supabase Dashboard → Database → Cron Jobs에서 설정합니다.

| 항목     | 값                                                                     |
| -------- | ---------------------------------------------------------------------- |
| Name     | `delete-old-inquiries`                                                 |
| Schedule | `0 3 * * *`                                                            |
| Command  | `delete from inquiries where created_at < now() - interval '3 years';` |

---

## 🔎 SEO / 배포

- `app/sitemap.ts`: 정적 라우트와 DB 기반 동적 라우트 생성
- `app/robots.ts`: `/admin` 크롤링 차단
- `public/og-image.jpg`: SNS/카카오톡 공유 이미지
- `next.config.ts`: Vercel 기본 도메인에서 운영 도메인으로 301 리다이렉트
- Vercel Analytics / Speed Insights 적용

배포는 Vercel에 연결된 GitHub 저장소에 push하면 자동으로 진행됩니다. Vercel 환경변수에는 `.env.local`과 동일한 값을 설정해야 합니다.

배포 후 Google Search Console에 다음 sitemap을 제출합니다.

```text
https://sumgim-welfare.com/sitemap.xml
```

---

## 🎨 디자인 시스템

노인 사용자와 보호자를 함께 고려해 큰 기본 폰트, 높은 대비, 넓은 클릭 영역, 부드러운 블루 계열 팔레트를 사용합니다.

| 역할        | 색상      |
| ----------- | --------- |
| 주요 텍스트 | `#0E1A2E` |
| 보조 텍스트 | `#1A2E4A` |
| 메인 포인트 | `#1A56A0` |
| 보조 포인트 | `#2E6DB4` |
| 깊은 포인트 | `#0E3A78` |
| 배경        | `#FFFFFF` |
| 보조 배경   | `#F4F7FC` |
| 섹션 배경   | `#EEF4FB` |
| 테두리      | `#D6DFEB` |
| 강조/경고   | `#E07A3A` |

`app/globals.css`에서 모바일 기본 18px, 데스크탑 기본 20px에 해당하는 폰트 스케일을 적용합니다.

---

## 🔄 개발 현황

### ✅ 완성된 기능

**공개 페이지**

- 홈, 센터 소개, 오시는 길, 수상·기관선정
- 노인장기요양보험, 방문요양, 가족요양, 인지활동서비스, 등급 신청 안내
- 본인부담금 계산기
- 공지사항 목록/상세
- 사진 게시판 앨범 목록/상세/라이트박스
- 상담문의 + FAQ
- 요양보호사 상시 구인 안내
- 개인정보처리방침
- sitemap/robots/OG 이미지

**관리자**

- Supabase Auth 로그인 및 `/admin` 미들웨어 보호
- 공지사항 CRUD
- 사진 카테고리 및 사진 업로드/삭제
- 얼굴 자동 블러 및 수동 블러 편집
- 상담문의 목록/상세/답변/상태 관리
- 기존 요양보호사 지원자 상태/메모 관리
- Hero 사진 관리
- 수상·기관선정 관리
- 본인부담금 계산기 기준값 관리
- 오류 로그 조회

**운영/보안**

- Resend 이메일 발송
- Solapi SMS 발송
- Cloudflare R2 업로드/삭제
- 대용량 이미지 브라우저 선압축, 매직바이트 검증, HEIC 변환 안내
- 얼굴 좌표 스케일링·경계 클램프·다중 얼굴 블러 회귀 테스트
- 문의 rate limit, honeypot, 제출 시간 체크
- Supabase 운영 스키마·RLS 단일 베이스라인
- 핵심 유틸 Vitest 테스트
- GitHub Actions lint·Prettier·typecheck·Vitest 검증

### 🚧 개선 예정

- [ ] 관리자 통계 대시보드 고도화
- [ ] 상담문의 데이터 보존 정책 UI화
- [ ] 사진 업로드 진행률 및 실패 재시도 UX 개선
- [ ] 계산기 기준값 변경 이력 관리
- [ ] 접근성 점검 결과 문서화

---

## 🙋 프로젝트 정보

| 항목        | 내용                                                                     |
| ----------- | ------------------------------------------------------------------------ |
| 프로젝트명  | 안강 섬김 노인복지센터 홈페이지                                          |
| 대상 기관   | 안강 섬김 노인복지센터                                                   |
| 위치        | 경상북도 경주시 안강읍                                                   |
| 운영 도메인 | `https://sumgim-welfare.com`                                             |
| 주요 사용자 | 보호자, 어르신, 센터 운영자, 요양보호사 구직자                           |
| 핵심 목적   | 센터 소개, 상담 접수, 공지/사진 운영, 구인 문의 안내, 장기요양 정보 제공 |

---

## 📄 라이선스

본 프로젝트는 안강 섬김 노인복지센터의 기관 홈페이지 운영을 위해 제작되었습니다.
