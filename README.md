# 섬김노인복지센터 홈페이지

경주 안강읍 섬김노인복지센터의 서비스와 상담 정보를 안내하고, 운영자가 콘텐츠를 관리하는 공식 웹사이트입니다.

**서비스:** [sumgim-welfare.com](https://www.sumgim-welfare.com)

## 주요 기능

- **이용 안내:** 노인장기요양보험, 방문요양, 등급 신청, 본인부담금 계산기
- **소통과 소식:** 상담문의, 공지사항, 사진 게시판, 요양보호사 구인 안내
- **관리자:** 공지·사진·상담·수상 내역·계산기 기준값 관리
- **사진 보호:** 얼굴 자동 감지와 블러 처리, 관리자의 수동 보정 지원

## 기술 스택

Next.js · React · TypeScript · Supabase · Cloudflare R2 · Resend · Solapi · Vercel

## 프로젝트 구조

```text
app/          공개 페이지, 관리자, API
components/   공통 화면과 관리자 UI
lib/          인증, DB·스토리지, 이미지 처리
supabase/     데이터베이스 마이그레이션
__tests__/    Vitest 테스트
```

## 로컬 실행

Supabase, Cloudflare R2, Resend, Solapi 환경변수를 설정한 뒤 실행합니다.

```bash
npm install
npm run dev
```

주요 검증 명령: `npm run lint`, `npm run typecheck`, `npm run test`

## 더 알아보기

- [DeepWiki 개요](https://deepwiki.com/dongwoobae/ankang-sumgim)
- [DeepWiki 시작하기와 환경 설정](https://deepwiki.com/dongwoobae/ankang-sumgim/1.1-getting-started-and-configuration)
- [공식 웹사이트](https://www.sumgim-welfare.com)
