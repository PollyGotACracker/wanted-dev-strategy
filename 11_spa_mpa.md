# SPA / MPA

## SPA 와 MPA 비교

| MPA                         | SPA                            |
| --------------------------- | ------------------------------ |
| 각 페이지별 HTML 파일       | 페이지 전환 없이 동적 업데이트 |
| Server-side Routing         | Client-side Routing            |
| 각 페이지 로드 시 서버 부하 | 초기 로딩 시간 길 수 있음      |
| SEO 친화적                  | SEO 최적화 필요                |

## SPA

- Single Page Application
- Client-side Routing:
  - 브라우저에서 URL 변경에 따른 뷰 전환 처리
  - 페이지를 새로 로드하지 않고도 사용자와 실시간 상호작용(빠른 페이지 전환)
  - history API, React Router, Vue Router 등
- View Rendering:
  - 사용자 인터페이스의 동적 업데이트
  - 컴포넌트 기반 아키텍처(모듈화, 높은 재사용성)
- 상태 관리:
  - 중앙집중식 관리
  - 데이터 흐름의 일관성 유지
- 데이터 통신:
  - 서버와의 비동기 통신(Ajax)
  - 필요한 데이터만 로드하여 효율적인 데이터 관리

### SPA 작동 원리

1. 초기 전체 페이지를 로드(HTML, CSS, JS 파일 포함)
2. 사용자 상호작용에 따라 필요한 데이터를 서버에 요청
3. 받은 데이터로 페이지 일부를 동적으로 빠르게 업데이트

### SPA 한계에 따른 대응 전략

- 초기 로딩 시간: code splitting, lazy loading
- SEO 최적화: SSR, pre-rendering[^1]
- 브라우저 호환성: pollyfill[^2], Babel 등 트랜스파일러

---

- [^1] pre-rendering: SSR 에서, 서버가 정적 HTML 파일을 미리 생성(렌더링)한 후 JS 파일 다운로드(인터렉션)
- [^2] pollyfill: 구형 브라우저에도 사용할 수 있도록 이전 자바스크립트 기능으로 똑같이 구현한 코드 조각 또는 플러그인

### SPA 의 상태 관리

- 애플리케이션의 여러 컴포넌트 간 상태의 일관성 유지
- UI 일관성 유지
- 복잡한 데이터 흐름 관리

### SPA 의 lifecycle 관리

- 성능 최적화와 사용자 경험 향상에 중요  
  (불필요한 데이터 로딩을 피하고, 사용자 상호작용에 빠르게 반응하는 등)

#### Lifecycle 단계

1. 초기화(Initialization)
2. 뷰 렌더링(View Rendering)
3. 이벤트 처리(Event Handling)
4. 데이터 업데이트(Data Update): 사용자가 입력한 정보를 바탕으로 서버에서 데이터를 가져오거나, 상태를 업데이트
5. 종료(Termination): 메모리 해제, 리스너 해제, 진행 중인 요청 취소

### SPA 구현 사례

- Gmail: SPA 를 초기에 채택하여 페이지 새로고침 없이 실시간으로 이메일 확인 및 작성 가능
- Facebook: 사용자 피드와 상호작용 실시간 업데이트
- Airbnb: 사용자 인터페이스, 숙박시설 및 여행상품 검색 및 예약 프로세스 개선
- Netflix: 탐색 시 콘텐츠 로딩 시간 단축 및 성능 최적화

## MPA

- Multi Page Application
- 전통적인 웹 애플리케이션 구조
- 각 페이지마다 별도의 HTML 파일 작성
- 페이지 이동 시 전체 페이지를 새로 로드
