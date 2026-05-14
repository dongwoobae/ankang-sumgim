-- ============================================================
-- Security Advisor 경고 수정
-- 실행: Supabase Dashboard > SQL Editor
-- ============================================================

-- -----------------------------------------------
-- 1. awards 테이블: 과도한 authenticated 정책 제거
--    이유: 모든 admin 작업은 service_role key 사용 → RLS 우회
--          authenticated 롤에 INSERT/UPDATE/DELETE 불필요
-- -----------------------------------------------
DROP POLICY IF EXISTS "awards_delete" ON public.awards;
DROP POLICY IF EXISTS "awards_insert" ON public.awards;
DROP POLICY IF EXISTS "awards_update" ON public.awards;

-- -----------------------------------------------
-- 2. hero_photos 테이블: 과도한 authenticated 정책 제거
-- -----------------------------------------------
DROP POLICY IF EXISTS "hero_photos_delete" ON public.hero_photos;
DROP POLICY IF EXISTS "hero_photos_insert" ON public.hero_photos;

-- -----------------------------------------------
-- 3. rls_auto_enable 함수: anon/authenticated EXECUTE 권한 차단
--    이유: SECURITY DEFINER 함수가 외부 API로 노출되어 있음
-- -----------------------------------------------
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated;

-- -----------------------------------------------
-- 4. Storage 버킷 listing 차단
--    이유: 광범위한 SELECT 정책으로 전체 파일 목록 열람 가능
--          public 버킷 URL 접근은 정책 없이도 동작함
-- -----------------------------------------------
DROP POLICY IF EXISTS "Allow public read - awards" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read - hero" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read - photos" ON storage.objects;

-- -----------------------------------------------
-- 참고: 아래 항목은 SQL로 처리 불가 → 대시보드에서 직접 수정
-- - Leaked Password Protection:
--   Authentication > Sign In / Up > Password Strength > Enable Leaked Password Protection
-- - inquiries "public insert" 정책: 공개 문의 폼 의도적 허용, 유지
-- -----------------------------------------------
