# Electron 2

## Electron 의 주요 기능

- 네이티브 메뉴:
  - 플랫폼별 일관적이며 직관적인 메뉴 구성
- 트레이 아이콘:
  - 상주 애플리케이션의 가시성 확보
  - 시스템 트레이 기능으로 사용자가 쉽게 접근
- 시스템 알림 기능:
  - 중요한 업데이트와 정보를 적시에 전달
  - 사용자와 실시간 상호작용 유도
- 데스크톱 환경과의 상호작용:
  - 운영체제 기능을 활용하여 사용자 경험 향상
  - 시스템 이벤트와 애플리케이션의 유기적인 통합
- 각 OS 의 고유 기능 활용: macOS 의 touch bar, Windows 의 live tile
- 웹 기술로 구성한 UI:
  - 유연한 UI 디자인 및 사용자 경험 제공
- 웹 컨텐츠 통합:
  - 웹 애플리케이션과의 통합 원활
  - 데스크톱 애플리케이션 내에서 웹 기능 사용
- 파일 시스템 접근:
  - fs 모듈을 통해 로컬 파일과 상호작용
  - 사용자 데이터 관리 및 애플리케이션 설정 커스터마이징
- 네트워크 요청:
  - 웹 API 통신 및 클라우드 서비스 연동
- Node.js 모듈 통합:
  - Node.js 의 API 를 활용하여 백엔드 로직 및 웹 기능 결합

## Electron 의 장점

- 여러 운영체제에서 동일한 사용자 경험 제공
- 각 운영체제의 고유 기능을 활용한 플랫폼 특화 기능
- 단일 코드베이스로 개발 작업 단순화
- 패키징 및 배포 프로세스 표준화
- 웹 기술을 활용한 풍부하고 인터랙티브한 사용자 인터페이스
- Node.js 모듈 및 패키지 접근 가능
- Node.js 를 활용한 애플리케이션 성능 최적화
- 데이터 처리 및 외부 API, 클라우드 서비스와의 연동 용이
- 강력한 디버깅 도구와 hot reload 지원
- Electron 커뮤니티를 통한 문제 해결 및 정보 공유

## Electron 의 단점

- 리소스 관리 및 렌더링 최적화 필요:
  - 각 렌더러 프로세스에 대한 추가 메모리 필요
  - 다중 프로세스 관리로 인한 지연 발생 우려
  - Chromium 엔진을 내장하고 있어 네이티브 앱보다 리소스를 더 차지할 수 있음
  - Node.js 작업이 메인 프로세스를 차지할 경우 성능 저하  
    (비동기 처리 및 별도 프로세스 분리)
- 플랫폼 호환성 문제:
  - 운영체제별 이슈나 버그 모니터링 필요
  - 가상머신, 애뮬레이터 테스트 환경 구성 어려움
  - 다양한 플랫폼과 앱스토어에 맞는 패키징 및 배포 필요
  - UI 나 사용자 경험 일관성 유지의 어려움
- 보안 취약성 증가:
  - 웹 콘텐츠 통합으로 인한 보안 취약성 증가(XSS, SQL injection)
  - 악의적인 사용자 시스템 접근의 위험
- Node.js 모듈 통합 문제:
  - 일부 모듈은 네이티브 바인딩이 필요하거나 추가 설정이나 컴파일 필요할 수 있음
  - 너무 많은 모듈을 통합할 경우 초기 로딩 시간이 길어질 수 있음

## 기타 정보

- [autoUploader](https://www.electronjs.org/docs/latest/api/auto-updater)
- [Electron Builder](https://www.electron.build/):
  - Electron 애플리케이션 패키징 및 배포 도구
  - 플랫폼별 패키징 및 배포
  - 앱 자동 업데이트 기능 지원
