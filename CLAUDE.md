# 안강 섬김 노인복지센터 — Claude 프로젝트 지침

## 기술 스택

| 항목         | 내용                                                       |
| ------------ | ---------------------------------------------------------- |
| Framework    | Next.js (App Router 기반)                                  |
| Language     | TypeScript                                                 |
| Styling      | Tailwind CSS v4                                            |
| Backend / DB | Supabase (supabase-js, SSR)                                |
| Storage      | **Cloudflare R2** (Supabase Storage에서 마이그레이션 완료) |
| 배포         | Vercel                                                     |
| 이메일       | Resend                                                     |
| 아이콘       | Lucide React                                               |

---

## 색상 팔레트

| 역할        | 색상 코드 |
| ----------- | --------- |
| 메인 포인트 | `#2E6DB4` |
| 배경 / 섹션 | `#EEF4FB` |
| 버튼 / 강조 | `#1A56A0` |
| 주요 텍스트 | `#1A2E4A` |
| 보조 텍스트 | `#5A7A99` |
| 테두리      | `#A8C4E0` |
| 흰 배경     | `#FFFFFF` |
| 성공        | `#2E8B57` |
| 경고        | `#C0392B` |
| 포인트 골드 | `#E8A020` |

---

## 폰트 스케일 정책

- **모바일**: Tailwind 기본값 유지 (별도 스케일 없음)
- **데스크탑** (`min-width: 768px`): `font-size: 112.5%` 적용 → rem 전체가 비례 확대

`globals.css` 에서 `@theme inline` 커스텀 폰트 스케일은 제거되어 있음.  
FAQ 섹션 등 특정 컴포넌트는 명시적으로 큰 텍스트 클래스 사용.

---

## 이미지 전략

- **플랫 일러스트**: SVG 인라인 방식 (별도 파일 없이 컴포넌트 내 직접 작성)
- **실사 사진**: Cloudflare R2에 업로드 후 Public URL 참조

### Cloudflare R2 사진 업로드 방법

관리자 콘솔(Cloudflare Dashboard) → R2 → 버킷 → 파일 업로드 후 Public URL 복사.  
Supabase Storage는 더 이상 사용하지 않음.  
버킷은 Public으로 설정되어 있어야 URL 직접 접근 가능.

---

## 주요 컴포넌트 구조

```
components/
  layout/
    Header.tsx
    HeroPhotoCarousel.tsx       # 메인 페이지 Hero 사진 캐러셀 (opacity fade)
  ServicePhotoCarousel.tsx      # 방문요양 서비스 탭+캐러셀 (신체/가사/정서 각 3장)
  ServiceProcess.tsx            # 서비스 이용 절차 (SVG 일러스트 + 스텝)
  FaqAccordion.tsx              # 자주 묻는 질문 아코디언
  PhotoGallery.tsx              # 사진 게시판 갤러리 + 라이트박스

app/
  (public)/                     # 공개 페이지
    page.tsx                    # 메인 홈
    services/
      visit-care/page.tsx       # 방문요양서비스
      family-care/page.tsx      # 가족요양
      cognitive/page.tsx        # 인지활동서비스
      grade-apply/page.tsx      # 등급신청 안내
    about/
      greeting/page.tsx         # 인사말
      location/page.tsx         # 오시는길
      awards/page.tsx           # 수상·기관선정
    board/
      notice/page.tsx           # 공지사항 목록
      notice/[id]/page.tsx      # 공지사항 상세
      photos/page.tsx           # 사진 게시판
    inquiry/page.tsx            # 상담문의 + FAQ
  admin/                        # 관리자 페이지
    hero/page.tsx               # 메인 사진 관리
    notices/page.tsx            # 공지사항 관리
    inquiries/page.tsx          # 문의 관리
```

---

## Supabase DB 주요 테이블

| 테이블            | 용도                                    |
| ----------------- | --------------------------------------- |
| `hero_photos`     | 메인 페이지 캐러셀 사진                 |
| `notices`         | 공지사항 (is_pinned, title, content)    |
| `awards`          | 수상·기관선정 내역 (image_url은 R2 URL) |
| `inquiries`       | 상담 문의                               |
| `inquiry_replies` | 문의 답변                               |

---

## 코딩 규칙

### useEffect 내 setState

```ts
// ❌ 금지 — "Calling setState synchronously within an effect" 에러
useEffect(() => {
  setState(value);
}, []);

// ✅ 올바른 방법 — 다음 틱에 실행
useEffect(() => {
  setTimeout(() => setState(value), 0);
}, []);
```

### 프로젝트 코드 확인

- GitHub 코드 확인은 `project_knowledge_search` 툴로 검색

### 서버 컴포넌트 / 클라이언트 컴포넌트

- DB 조회는 서버 컴포넌트에서 (`adminSupabase` 사용)
- 인터랙션이 필요한 경우 `"use client"` 선언

---

## FAQ 섹션 (FaqAccordion)

현재 유지 중인 5개 항목:

1. 장기요양 등급 신청은 어떻게 하나요?
2. 서비스 비용은 어떻게 되나요?
3. 방문요양과 가족요양의 차이는 무엇인가요?
4. 요양보호사 자격증이 없는 가족도 가족요양을 받을 수 있나요?
5. 인지활동서비스는 어떤 분이 이용하나요?

(등급없이 상담, 서비스 지역, 무료인가요 항목은 제거됨)

---

## ServicePhotoCarousel (방문요양서비스 페이지)

`components/ServicePhotoCarousel.tsx`

- 탭: 신체활동 지원 / 가사활동 지원 / 정서 지원 (밑줄만 표시)
- 사진 9장 (각 3장): opacity fade 전환, 3초 자동 슬라이드
- 순서: 신체1→2→3 → 가사1→2→3 → 정서1→2→3 → 반복
- 탭 클릭 시 해당 세트 첫 번째 사진으로 이동 + 타이머 리셋
- 사진 URL은 `SERVICE_GROUPS` 배열의 `photos` 필드에 R2 URL 삽입

```ts
// ServicePhotoCarousel.tsx 상단 photos 배열에 R2 URL 입력
photos: [
  "https://pub-xxx.r2.dev/신체활동1.jpg",
  "https://pub-xxx.r2.dev/신체활동2.jpg",
  "https://pub-xxx.r2.dev/신체활동3.jpg",
],
```
