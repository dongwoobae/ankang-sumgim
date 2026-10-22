# 지역 안내 페이지

`/area/gyeongju`, `/area/pohang`. 목록은 `lib/service-areas.ts`의 `SERVICE_AREAS` 하나이고,
페이지·푸터 링크·사이트맵이 모두 여기서 읽는다.

## 지역마다 실제로 다른 내용이 있을 때만 둔다

지역명만 바꾼 페이지는 네이버·구글 모두 저품질로 보고 사이트 평가를 깎을 수 있다.
지금 지역마다 다른 내용은 **관할 국민건강보험공단 지사(장기요양 등급 신청 창구)**다.
실제 방문하는 읍·면·동과 이용 현황은 센터 답을 받으면 더한다 —
[`TODO_list/wait/region-landing-pages.md`](../TODO_list/wait/region-landing-pages.md).

## 만들지 않는 지역

- **안강** — 홈이 "안강 노인복지센터" 검색 1순위다(2026-09-15). 전용 페이지는 같은 검색어를 두고 홈과 겹친다.
- **영천** — 목욕차가 가지 않는다([visit-bath.md](visit-bath.md)). 방문요양을 하는지는 확인하지 못했다 —
  [`TODO_list/wait/yeongcheon-listing.md`](../TODO_list/wait/yeongcheon-listing.md).

## 링크

헤더 메뉴 칸은 늘리지 않는다. 푸터의 "서비스 지역"과 방문목욕 페이지 본문이 링크한다.
링크는 서버 HTML에 실려야 크롤러가 찾는다(`e2e/seo-links.spec.ts`).

## 공단 지사 정보

nhis.or.kr 지사찾기의 각 지사 "찾아오시는 길"(주소·관할)과 "부서안내"(운영센터가 장기요양 인정 신청을 받는다)에서
2026-10-22에 확인했다. 지사 페이지에 대표번호가 없고 직원별 내선뿐이라 전화는 공단 대표전화를 싣는다.
지사 정보를 고칠 때는 `NHIS_CHECKED_AT`도 함께 고친다.
