-- ============================================================
-- 베이스라인 스키마 스냅샷 (2026-07-07)
--
-- 운영 DB public 스키마의 "이미 적용된 상태"를 pg_catalog 기반으로
-- 덤프한 것. 운영 DB에는 재실행하지 말 것.
--
-- 이 파일이 유일한 베이스라인이다. 이전 마이그레이션
-- (20260514 security_fixes)은 결과가 이 스냅샷에 반영돼 있어
-- 삭제했다 (rls_auto_enable REVOKE는 아래에 직접 포함).
-- 신규 DB는 이 파일 하나로 재현하고, 이후 변경만 새 마이그레이션으로
-- 추가한다.
--
-- 포함하지 않는 것:
--   - storage 버킷/정책 (파일 저장은 현재 Cloudflare R2 사용)
--   - Auth 설정 (Leaked Password Protection 등 대시보드 설정)
--   - Supabase 플랫폼 관리 확장(pg_cron, pg_stat_statements,
--     supabase_vault) 및 플랫폼 이벤트 트리거
-- ============================================================

-- ── extensions ──────────────────────────────────────────────

create extension if not exists pgcrypto with schema extensions;
create extension if not exists "uuid-ossp" with schema extensions;

-- ── sequences ───────────────────────────────────────────────

create sequence if not exists public.awards_id_seq;
create sequence if not exists public.error_logs_id_seq;
create sequence if not exists public.inquiries_id_seq;
create sequence if not exists public.inquiry_replies_id_seq;
create sequence if not exists public.notices_id_seq;
create sequence if not exists public.photo_categories_id_seq;
create sequence if not exists public.photos_id_seq;

-- ── tables ──────────────────────────────────────────────────

create table public.awards (
  id integer default nextval('awards_id_seq'::regclass) not null,
  title text not null,
  org text not null,
  description text,
  awarded_at date not null,
  image_url text,
  display_order integer default 1,
  created_at timestamp with time zone default now()
);

create table public.error_logs (
  id bigint default nextval('error_logs_id_seq'::regclass) not null,
  created_at timestamp with time zone default now() not null,
  source text not null,
  message text not null
);

create table public.hero_photos (
  id uuid default gen_random_uuid() not null,
  url text not null,
  display_order integer default 1 not null,
  created_at timestamp with time zone default now()
);

create table public.inquiries (
  id integer default nextval('inquiries_id_seq'::regclass) not null,
  name text not null,
  phone text not null,
  email text,
  title text not null,
  content text not null,
  is_answered boolean default false,
  created_at timestamp with time zone default now()
);

create table public.inquiry_rate_limits (
  ip text not null,
  attempts integer default 1 not null,
  window_start timestamp with time zone default now() not null,
  blocked_until timestamp with time zone
);

create table public.inquiry_replies (
  id integer default nextval('inquiry_replies_id_seq'::regclass) not null,
  inquiry_id integer,
  content text not null,
  created_at timestamp with time zone default now()
);

create table public.ltc_grade_limits (
  id uuid default gen_random_uuid() not null,
  grade text not null,
  monthly_limit integer not null,
  updated_at timestamp with time zone default now() not null
);

create table public.ltc_service_rates (
  id uuid default gen_random_uuid() not null,
  service_type text not null,
  duration_minutes integer not null,
  price integer not null,
  updated_at timestamp with time zone default now() not null
);

create table public.notices (
  id integer default nextval('notices_id_seq'::regclass) not null,
  title text not null,
  content text not null,
  is_pinned boolean default false,
  created_at timestamp with time zone default now()
);

create table public.photo_categories (
  id integer default nextval('photo_categories_id_seq'::regclass) not null,
  name text not null,
  display_order integer default 0,
  created_at timestamp with time zone default now()
);

create table public.photos (
  id integer default nextval('photos_id_seq'::regclass) not null,
  category_id integer,
  url text not null,
  caption text,
  display_order integer default 0,
  created_at timestamp with time zone default now(),
  original_url text,
  is_face_blurred boolean default true
);

-- 시퀀스를 소유 컬럼에 귀속 (serial과 동일한 수명 관리)
alter sequence public.awards_id_seq owned by public.awards.id;
alter sequence public.error_logs_id_seq owned by public.error_logs.id;
alter sequence public.inquiries_id_seq owned by public.inquiries.id;
alter sequence public.inquiry_replies_id_seq owned by public.inquiry_replies.id;
alter sequence public.notices_id_seq owned by public.notices.id;
alter sequence public.photo_categories_id_seq owned by public.photo_categories.id;
alter sequence public.photos_id_seq owned by public.photos.id;

-- ── constraints ─────────────────────────────────────────────

alter table public.awards add constraint awards_pkey PRIMARY KEY (id);
alter table public.error_logs add constraint error_logs_pkey PRIMARY KEY (id);
alter table public.hero_photos add constraint hero_photos_pkey PRIMARY KEY (id);
alter table public.inquiries add constraint inquiries_pkey PRIMARY KEY (id);
alter table public.inquiry_rate_limits add constraint inquiry_rate_limits_pkey PRIMARY KEY (ip);
alter table public.inquiry_replies add constraint inquiry_replies_pkey PRIMARY KEY (id);
alter table public.ltc_grade_limits add constraint ltc_grade_limits_pkey PRIMARY KEY (id);
alter table public.ltc_service_rates add constraint ltc_service_rates_pkey PRIMARY KEY (id);
alter table public.notices add constraint notices_pkey PRIMARY KEY (id);
alter table public.photo_categories add constraint photo_categories_pkey PRIMARY KEY (id);
alter table public.photos add constraint photos_pkey PRIMARY KEY (id);

alter table public.ltc_grade_limits add constraint ltc_grade_limits_grade_key UNIQUE (grade);
alter table public.ltc_service_rates add constraint ltc_service_rates_service_type_duration_minutes_key UNIQUE (service_type, duration_minutes);

alter table public.inquiry_replies add constraint inquiry_replies_inquiry_id_fkey FOREIGN KEY (inquiry_id) REFERENCES inquiries(id) ON DELETE CASCADE;
alter table public.photos add constraint photos_category_id_fkey FOREIGN KEY (category_id) REFERENCES photo_categories(id) ON DELETE CASCADE;

-- ── indexes ─────────────────────────────────────────────────

CREATE UNIQUE INDEX inquiry_rate_limits_ip_key ON public.inquiry_rate_limits USING btree (ip);

-- ── functions ───────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.check_rate_limit(p_ip text, p_max_attempts integer, p_window_ms bigint)
 RETURNS TABLE(allowed boolean, retry_after timestamp with time zone)
 LANGUAGE plpgsql
AS $function$
declare
  rec inquiry_rate_limits%rowtype;
  now_ts timestamptz := now();
  blocked timestamptz;
begin
  -- 원자성: 행 잠금 (없으면 삽입 후 통과)
  select * into rec from inquiry_rate_limits where ip = p_ip for update;

  if not found then
    insert into inquiry_rate_limits(ip, attempts, window_start)
    values (p_ip, 1, now_ts)
    on conflict (ip) do update set attempts = inquiry_rate_limits.attempts + 1;
    return query select true, null::timestamptz;
    return;
  end if;

  -- 차단 중
  if rec.blocked_until is not null and rec.blocked_until > now_ts then
    return query select false, rec.blocked_until;
    return;
  end if;

  -- 윈도우 만료 → 리셋
  if extract(epoch from (now_ts - rec.window_start)) * 1000 >= p_window_ms then
    update inquiry_rate_limits
      set attempts = 1, window_start = now_ts, blocked_until = null
      where ip = p_ip;
    return query select true, null::timestamptz;
    return;
  end if;

  -- 증가 + 한도 판정
  if rec.attempts + 1 > p_max_attempts then
    blocked := now_ts + (p_window_ms || ' milliseconds')::interval;
    update inquiry_rate_limits
      set attempts = rec.attempts + 1, blocked_until = blocked
      where ip = p_ip;
    return query select false, blocked;
    return;
  end if;

  update inquiry_rate_limits set attempts = rec.attempts + 1 where ip = p_ip;
  return query select true, null::timestamptz;
end;
$function$;

CREATE OR REPLACE FUNCTION public.rls_auto_enable()
 RETURNS event_trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'pg_catalog'
AS $function$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$function$;

-- public 테이블 생성 시 RLS 자동 활성화 (대시보드 SQL Editor에서
-- postgres 롤로 실행해야 할 수 있음)
create event trigger ensure_rls
  on ddl_command_end
  execute function public.rls_auto_enable();

-- SECURITY DEFINER 함수가 PostgREST RPC로 노출되지 않도록 차단
-- (구 security_fixes 마이그레이션에서 흡수 — 권한 상태는 덤프에 안 잡힘)
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated;

-- ── rls & policies ──────────────────────────────────────────
-- admin 쓰기 작업은 전부 service_role(RLS 우회)로 수행하므로
-- 정책은 공개 읽기(+문의 폼 insert)만 존재한다.

alter table public.awards enable row level security;
alter table public.error_logs enable row level security;
alter table public.hero_photos enable row level security;
alter table public.inquiries enable row level security;
alter table public.inquiry_rate_limits enable row level security;
alter table public.inquiry_replies enable row level security;
alter table public.ltc_grade_limits enable row level security;
alter table public.ltc_service_rates enable row level security;
alter table public.notices enable row level security;
alter table public.photo_categories enable row level security;
alter table public.photos enable row level security;

create policy "public insert" on public.inquiries as permissive for INSERT to public with check (true);
create policy "public read" on public.inquiries as permissive for SELECT to public using (true);
create policy "public read" on public.inquiry_replies as permissive for SELECT to public using (true);
create policy "public read" on public.notices as permissive for SELECT to public using (true);
create policy "public read" on public.photo_categories as permissive for SELECT to public using (true);
create policy "public read" on public.photos as permissive for SELECT to public using (true);
create policy hero_photos_select on public.hero_photos as permissive for SELECT to anon using (true);
create policy awards_select on public.awards as permissive for SELECT to anon using (true);
create policy public_read on public.ltc_grade_limits as permissive for SELECT to public using (true);
create policy public_read on public.ltc_service_rates as permissive for SELECT to public using (true);
