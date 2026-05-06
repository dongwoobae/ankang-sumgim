# 안강 섬김 노인복지센터 홈페이지

경상북도 경주시 안강읍에 위치한 안강 섬김 노인복지센터의 공식 홈페이지입니다.

---

## 기술 스택

| 분류         | 기술                            |
| ------------ | ------------------------------- |
| Framework    | Next.js 16 (App Router)         |
| Language     | TypeScript                      |
| Styling      | Tailwind CSS v4                 |
| Backend / DB | Supabase (PostgreSQL + Storage) |
| 배포         | Vercel                          |
| 이메일       | Resend                          |
| SMS          | Solapi                          |
| 아이콘       | Lucide React                    |

---

## 주요 기능

### 공개 페이지

- **홈** — Hero 사진 캐러셀, 서비스 소개, 수상 내역, 공지사항 미리보기
- **센터소개** — 인사말, 오시는길, 수상·기관선정
- **노인장기요양보험** — 방문요양, 가족요양, 인지활동, 등급신청 안내
- **상담문의** — 온라인 폼 (Supabase 저장 + 이메일/SMS 발송)
- **게시판** — 공지사항, 사진 게시판 (앨범 → 사진 구조)
- **개인정보처리방침**

### 관리자 페이지 (`/admin`)

- 공지사항 CRUD
- 사진 게시판 카테고리 및 사진 관리
- 문의 목록 조회 및 답변 (이메일 자동 발송)
- 메인 Hero 사진 관리
- 수상·기관선정 관리
- 토글 사이드바 (데스크탑 접힘/펼침, 모바일 오버레이)

---

## 환경변수 설정

`.env.local` 파일을 루트에 생성하고 아래 값을 입력하세요.

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend (이메일)
RESEND_API_KEY=your_resend_api_key
INQUIRY_EMAIL=miyeong0695@daum.net

# Solapi (SMS)
SOLAPI_API_KEY=your_solapi_api_key
SOLAPI_API_SECRET=your_solapi_api_secret
SOLAPI_SENDER_PHONE=01012345678
```

---

## Supabase 설정

### 테이블

```sql
-- 공지사항
create table notices (
  id serial primary key,
  title text not null,
  content text not null,
  is_pinned boolean default false,
  created_at timestamptz default now()
);

-- 문의
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
```

### Storage 버킷

| 버킷명   | 용도               | 공개 여부 |
| -------- | ------------------ | --------- |
| `photos` | 사진 게시판 이미지 | Public    |
| `hero`   | 메인 Hero 사진     | Public    |
| `awards` | 수상 내역 이미지   | Public    |

### 자동 삭제 (Cron Job)

Supabase → Database → Cron Jobs에서 설정:

- **Name**: `delete-old-inquiries`
- **Schedule**: `0 3 * * *` (매일 새벽 3시)
- **Command**: `delete from inquiries where created_at < now() - interval '3 years';`

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

## 색상 팔레트

| 역할        | 색상      |
| ----------- | --------- |
| 메인 포인트 | `#1A56A0` |
| 다크 네이비 | `#1A2E4A` |
| 미디엄 블루 | `#2E6DB4` |
| 배경/섹션   | `#EEF4FB` |
| 골드 포인트 | `#E8A020` |
| 주요 텍스트 | `#1A2E4A` |
| 보조 텍스트 | `#5A7A99` |
| 테두리      | `#A8C4E0` |

---

## 배포

Vercel에 연결된 GitHub 레포지토리에 push하면 자동 배포됩니다.
Vercel 환경변수에 위의 `.env.local` 값들을 동일하게 설정해주세요.
