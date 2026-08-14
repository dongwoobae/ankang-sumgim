# 백로그

코드에 `TODO` 주석으로 남기지 않고 여기서 추적한다. 주석은 grep으로만 발견되고 맥락을 담지 못한다.

## R2 버킷이 공개라 `original/` 무블러 원본을 키만 알면 읽는다

`pub-b7ac63154d17462da44c76addda6b6be.r2.dev`로 서빙된다. 공개 상세 페이지가 `is_face_blurred=true`일 때 `original_url`을 `null`로 지워 보내는 건(`app/(public)/board/photos/[id]/page.tsx`) URL 은닉이지 접근 통제가 아니다. 키는 `<timestamp>-<random36>`이라 추측은 어렵지만, 한 번이라도 노출된 URL(브라우저 기록·캐시·로그·이전 배포본)은 계속 유효하다.

제대로 막으려면 버킷을 비공개로 돌리고 `original/`은 서명 URL로만 내주거나, 아예 별도 비공개 버킷으로 분리해야 한다. 설정·배포 변경이 따르므로 별건으로 잡는다.

## `savePhotoMetadata`가 `original_url` 유무로 `is_face_blurred`를 추론한다

`is_face_blurred: originalUrl !== null`. 지금은 맞지만 "얼굴 없는 사진도 원본 보존", "원본은 보관하되 공개는 항상 블러본", "수동 검수 대기" 같은 상태가 생기면 곧바로 깨진다. 상태를 늘릴 때 명시적 인자나 별도 컬럼으로 분리한다.

## `/api/upload-photo`의 422가 machine-readable code를 갖고 있지 않다

에러 식별자가 한국어 문자열뿐이다. 소비자가 `PhotoUploader` 한 곳인 지금은 문제가 아니지만, 재시도 정책이나 분석 로그가 붙으면 문자열이 계약이 된다. `{ error, code }` 형태로 넓히는 비용은 소비자가 하나일 때 가장 싸다.

## 서비스 소개 캐러셀 사진이 하드코딩돼 있다

`components/ServicePhotoCarousel.tsx`의 `SERVICE_GROUPS[].photos`는 R2 공개 URL 문자열이다. 그룹당 3칸 중 채워진 것은 신체활동 2장·가사활동 1장·정서지원 1장뿐이고, 나머지는 빈 문자열이라 placeholder 아이콘이 뜬다.

관리자 화면에서 교체할 수단이 없어 사진을 바꾸려면 배포가 필요하다. 사진 게시판(`photos` 테이블)은 이미 카테고리별로 관리되므로, 소개용 카테고리를 지정해 그 카테고리의 사진을 읽어오는 쪽이 자연스럽다.

주의 — 여기 걸린 URL 중 하나(`/photos/categories/4/1778059735407-…`)는 `blurred/`도 `manual/`도 아닌 무블러 경로다. 얼굴이 없는 사진인지 확인이 필요하다.

2026-08-14 — 코드의 `TODO` 3건("Supabase Storage URL로 교체")을 여기로 옮겼다. 저장소는 Supabase Storage가 아니라 R2로 옮겨간 뒤라 주석 문구 자체가 틀려 있었다.
