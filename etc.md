# ETC

## [Zustand / Jotai](https://jotai.org/docs/basics/comparison)

> `useState`+`useContext`를 대체해야 하는 경우: Jotai
> 간단한 모듈 상태를 원할 경우: Zustand
> 코드 분할이 중요한 경우: Jotai
> Redux devtools 선호: Zustand
> `Suspense`를 활용하는 경우: Jotai

### Zustand

- Redux 와 같은 flux 패턴, 더욱 간편
- 미들웨어 import 시 Redux devtools 로 디버깅 가능
- Recoil 과 달리 type 지원
- Next.js 에서 서버 스토어 사용

### Jotai

- Recoil 과 유사
- Next.js 에서 사용하기 좋음

## 라이브러리 / 프레임워크

- 라이브러리:
  - 애플리케이션을 만드는데 유용한 하나의 툴, 특정 문제를 해결하기 위한 솔루션을 제공(React)
  - 틀이 없기 때문에 React를 사용하는 개발자마다 코드 스타일이 다 다르다.
- 프레임워크:
  - 애플리케이션을 만들기 위한 큰 단위의 솔루션을 제공(Vue, Next.js)

## 라이브러리 및 프레임워크 선택

- NPM trend 에서 비슷한 용도의 dependency 끼리 비교
- 특정 기능이나 성능에 초점
