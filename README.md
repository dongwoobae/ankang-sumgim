# 안강 섬김 노인복지센터 홈페이지

경상북도 경주시 안강읍에 위치한 **안강 섬김 노인복지센터**의 공식 홈페이지입니다.

---

## 기술 스택

| 분류        | 기술                  |
| ----------- | --------------------- |
| Framework   | Next.js (App Router)  |
| Language    | TypeScript            |
| Styling     | Tailwind CSS v4       |
| Database    | Supabase (PostgreSQL) |
| Storage     | Cloudflare R2         |
| 이미지 처리 | Sharp (WebP 압축)     |
| 배포        | Vercel                |
| 이메일      | Resend                |
| SMS         | Solapi                |
| 아이콘      | Lucide React          |
| Analytics   | Vercel Analytics      |

---

## 주요 기능

### 공개 페이지

- **홈** — Hero 사진 캐러셀, 서비스 소개, 수상 내역, 공지사항 미리보기
- **센터 소개** — 인사말, 오시는 길(카카오맵), 수상·기관선정
- **노인장기요양보험** — 제도 안내, 방문요양, 가족요양, 인지활동서비스, 등급신청 안내
- **상담문의** — 온라인 상담 폼 + 자주 묻는 질문(FAQ)
- **게시판** — 공지사항, 사진 게시판 (앨범 → 사진 라이트박스 구조)
- **요양보호사 구인** — 온라인 입사 지원 폼
- **개인정보처리방침**

### 관리자 페이지 (`/admin`)

Supabase Auth 기반 로그인 보호 (미들웨어 적용)

- 공지사항 CRUD
- 사진 게시판 — 카테고리 및 사진 관리 (R2 업로드/삭제, Sharp WebP 자동 변환)
- 상담문의 목록 조회 및 답변 (이메일·SMS 자동 발송)
- 요양보호사 지원서 목록 — 상태 관리(검토중/면접예정/채용/불합격) 및 메모
- 메인 Hero 사진 관리 (순서 변경, 업로드/삭제)
- 수상·기관선정 관리
- 토글 사이드바 (데스크탑 접힘/펼침, 모바일 오버레이)

### 스팸 방지

- **Honeypot** — 숨겨진 필드에 값이 있으면 봇으로 판단
- **제출 시간 체크** — 폼 로드 후 3초 미만 제출 차단
- **Rate Limiting** — 동일 IP 1시간 내 5회 초과 차단 (Supabase 기반)

### SEO

- 페이지별 `metadata` / `generateMetadata` 적용
- `sitemap.xml` — 정적 라우트 + DB 기반 동적 라우트 (공지사항, 사진 카테고리)
- `robots.txt` — `/admin` 크롤링 차단
- OG 이미지 (`/public/og-image.png`) — SNS·카카오톡 공유 미리보기

---

## 프로젝트 구조

```
├── app/
│   ├── (public)/                    # 공개 페이지
│   │   ├── page.tsx                 # 메인 홈
│   │   ├── about/
│   │   │   ├── greeting/page.tsx    # 인사말
│   │   │   ├── location/page.tsx    # 오시는 길
│   │   │   └── awards/page.tsx      # 수상·기관선정
│   │   ├── services/
│   │   │   ├── insurance/page.tsx   # 노인장기요양보험이란
│   │   │   ├── visit-care/page.tsx  # 방문요양서비스
│   │   │   ├── family-care/page.tsx # 가족요양
│   │   │   ├── cognitive/page.tsx   # 인지활동서비스
│   │   │   └── grade-apply/page.tsx # 등급신청 안내
│   │   ├── board/
│   │   │   ├── notice/
│   │   │   │   ├── page.tsx         # 공지사항 목록
│   │   │   │   └── [id]/page.tsx    # 공지사항 상세
│   │   │   └── photos/page.tsx      # 사진 게시판
│   │   ├── inquiry/page.tsx         # 상담문의 + FAQ
│   │   ├── recruit/page.tsx         # 요양보호사 구인
│   │   └── privacy/page.tsx         # 개인정보처리방침
│   ├── admin/                       # 관리자 페이지 (로그인 필요)
│   │   ├── login/page.tsx
│   │   ├── hero/page.tsx
│   │   ├── notices/page.tsx
│   │   ├── photos/page.tsx
│   │   ├── inquiries/page.tsx
│   │   ├── recruits/page.tsx
│   │   └── awards/page.tsx
│   ├── api/
│   │   └── upload-photo/route.ts    # 사진 업로드 API (Sharp + R2)
│   ├── actions/
│   │   ├── sendInquiry.ts           # 상담문의 Server Action
│   │   └── submitJobApplication.ts  # 구인 지원 Server Action
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── HeroPhotoCarousel.tsx        # 메인 Hero 사진 캐러셀 (opacity fade)
│   ├── ServicePhotoCarousel.tsx     # 방문요양 탭+캐러셀 (신체/가사/정서)
│   ├── ServiceProcess.tsx           # 서비스 이용 절차 (SVG 일러스트)
│   ├── FaqAccordion.tsx             # 자주 묻는 질문 아코디언
│   └── PhotoGallery.tsx             # 사진 게시판 갤러리 + 라이트박스
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── r2.ts                        # Cloudflare R2 업로드/삭제
│   ├── email.ts                     # Resend 이메일 발송
│   ├── sms.ts                       # Solapi SMS 발송
│   └── rateLimit.ts                 # IP 기반 Rate Limiting
└── middleware.ts                    # /admin 인증 미들웨어
```

---

## 환경변수 설정

루트에 `.env.local` 파일을 생성하고 아래 값을 입력하세요.

```env
# 사이트 URL
NEXT_PUBLIC_SITE_URL=https://your-domain.com

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

# Resend (이메일)
RESEND_API_KEY=your_resend_api_key
INQUIRY_EMAIL=your@email.com

# Solapi (SMS)
SOLAPI_API_KEY=your_solapi_api_key
SOLAPI_API_SECRET=your_solapi_api_secret
SOLAPI_SENDER_PHONE=01012345678
```

---

## Supabase 설정

### 테이블 생성

```sql
-- 공지사항
create table notices (
  id serial primary key,
  title text not null,
  content text not null,
  is_pinned boolean default false,
  created_at timestamptz default now()
);

-- 상담 문의
create table inquiries (
  id serial primary key,
  name text not null,
  phone text not null,
  email text,
  title text not null,
  content text not null,
  is_answered boolean default false,
  created_at timestamptz default now()
);

-- 문의 답변
create table inquiry_replies (
  id serial primary key,
  inquiry_id integer references inquiries(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

-- 사진 카테고리
create table photo_categories (
  id serial primary key,
  name text not null,
  created_at timestamptz default now()
);

-- 사진
create table photos (
  id serial primary key,
  category_id integer references photo_categories(id) on delete cascade,
  url text not null,
  caption text,
  created_at timestamptz default now()
);

-- Hero 사진
create table hero_photos (
  id uuid default gen_random_uuid() primary key,
  url text not null,
  display_order integer default 1,
  created_at timestamptz default now()
);

-- 수상·기관선정
create table awards (
  id serial primary key,
  title text not null,
  org text not null,
  description text,
  awarded_at date not null,
  image_url text,
  display_order integer default 1,
  created_at timestamptz default now()
);

-- 요양보호사 구인 지원
create table job_applications (
  id serial primary key,
  name text not null,
  phone text not null,
  certificates text[] default '{}',
  preferred_region text not null,
  work_type text not null,
  introduction text,
  status text default 'pending',
  memo text,
  created_at timestamptz default now()
);

-- Rate Limiting
create table rate_limit_inquiry (
  ip text not null,
  count integer default 1,
  window_start timestamptz default now(),
  primary key (ip)
);
```

### Cron Job (오래된 문의 자동 삭제)

Supabase → Database → Cron Jobs에서 설정:

- **Name**: `delete-old-inquiries`
- **Schedule**: `0 3 * * *` (매일 새벽 3시)
- **Command**:
  ```sql
  delete from inquiries where created_at < now() - interval '3 years';
  ```

---

## Cloudflare R2 설정

1. Cloudflare 대시보드 → **R2** → 버킷 생성
2. 버킷 → **Settings → Public Access** 활성화 → `R2_PUBLIC_URL` 확인
3. **R2 → API Tokens**에서 액세스 키 발급 → `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` 입력
4. 이미지는 업로드 시 Sharp로 자동 WebP 변환 (최대 1920px, quality 75)

> 관리자 페이지 사진 업로드 외에 직접 업로드가 필요한 경우(방문요양 서비스 사진 등):  
> Cloudflare Dashboard → R2 → 버킷 → 파일 업로드 후 Public URL을 복사해 코드에 입력.

---

## 로컬 실행

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인

---

## 배포

Vercel에 연결된 GitHub 레포지토리에 push하면 자동 배포됩니다.  
Vercel 환경변수에 `.env.local`의 값들을 동일하게 설정하세요.

### Google Search Console 등록 (SEO)

배포 후 [Google Search Console](https://search.google.com/search-console)에서 사이트를 등록하고 sitemap을 제출하면 구글 색인이 빠르게 진행됩니다.

```
https://your-domain.com/sitemap.xml
```

---

## 색상 팔레트

| 역할        | 색상      |
| ----------- | --------- |
| 메인 포인트 | `#2E6DB4` |
| 버튼 / 강조 | `#1A56A0` |
| 주요 텍스트 | `#1A2E4A` |
| 보조 텍스트 | `#5A7A99` |
| 배경 / 섹션 | `#EEF4FB` |
| 테두리      | `#A8C4E0` |
| 흰 배경     | `#FFFFFF` |
| 골드 포인트 | `#E8A020` |
| 성공        | `#2E8B57` |
| 경고        | `#C0392B` |
