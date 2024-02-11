# Next.js

- Vercel 및 오픈 소스 커뮤니티에서 개발
- React 기반 프레임워크로 SSR 지원

## 장점 및 특징

- SEO: `Head` 컴포넌트를 사용해 검색 엔진에 효과적으로 메타데이터 정보 전달
- 성능 최적화: 자동 코드 분할과 빠른 페이지 로딩
- 사용자 경험 개선: 초기 로딩 시간 감소, 반응형 웹 사이트 구축 용이
- 개발 효율성 향상: 간단한 설정 및 구성, 개발자 친화적 환경
- 통합 솔루션 제공: built-in CSS, API route
- 파일 기반 라우팅, 동적 라우팅 지원

## 단점

- 고유 라우팅 시스템, 데이터 fetching 방법 이해 필요
- SSR, SSG 고급 기능 설정의 복잡성
- webpack, babel 구성에 대한 이해 필요
- 프로젝트 규모 및 구성에 따른 빌드 시간 증가
- 호스팅 환경에 따라 다른 배포 설정의 복잡성
- 다른 프레임워크에 비해 제한적인 플러그인 옵션
- 제한적인 고급 설정 옵션

## 파일 기반 라우팅(Pages Router)

- 자동 경로 생성:  
  페이지 파일이 URL 경로로 자동 변환  
  pages/about.js => /about
- 동적 라우팅 지원:  
  대괄호를 사용하여 동적 경로 생성  
  pages/posts/[slug].js => /posts/:slug
- nested 라우팅:  
  폴더 구조를 사용한 복잡한 라우팅 구현 가능  
  pages/blog/[year]/[month].js => /blog/:year/:month
- 라우팅 커스터마이징:  
  next.config.js 에서 고급 설정 가능(리다이렉트, URL 재작성 등)

```js
// pages/posts/[slug].js
import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter();
  const { slug } = router.query;

  return <div>{slug}</div>;
}
```

## API 라우트 및 서버리스 함수

- API 라우트 구현:  
  pages/api 폴더 내에서 API endpoint 생성
  간단한 RESTful API 구현 가능
- 서버리스 함수:  
  각 API 라우트는 서버리스 함수로 자동 변환  
  배포 및 확장 용이
- 복잡한 백엔드 로직 구현:  
  데이터베이스 연결, 사용자 인증 처리 등
- GraphQL API 지원:  
  GraphQL 서버 구축 및 통합 가능

```js
// pages/api/index.js
export default function router(req, res) {
  res.status(200).json({ message: "Hello World!" });
}
```

## 성능 최적화

- 자동 코드 분할:  
  페이지별로 필요한 코드만 로딩
- 이미지 최적화:  
  `next/image` 를 사용하여 효율적인 이미지 로딩 및 크기 조정
- 빌드 최적화:  
  빠른 리빌드 시간과 번들 크기 최소화
- 성능 분석 도구 통합:  
  빌드 시 성능 문제 식별 및 최적화

## 국제화(i18n) 지원

- 다국어 지원:  
  자동 언어 감지 및 라우팅
  다양한 언어로의 번역 용이
- 지역별 라우팅 설정:  
  지역에 따른 동적 페이지 생성
  사용자 지역 맞춤 콘텐츠 제공
- 다양한 지역 설정:  
  다중 언어 및 지역에 대한 지원
  사용자 경험 향상을 위한 맞춤 콘텐츠

```js
// next.config.js
module.exports = {
  i18n: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
    domains: [
      { domain: "example.com", defaultLocale: "en" },
      { domain: "example.fr", defaultLocale: "fr" },
      { domain: "example.es", defaultLocale: "es" },
    ],
  },
};
```

```js
import { useRouter } from "next/router";

export default function Page() {
  const { locale } = useRouter();
  return <div>{locale === "fr" ? "Bonjour" : "Hello"}</div>;
}
```

## 환경 설정

- 환경변수 설정:  
  .env 파일을 통한 환경 변수 관리  
  보안 및 구성 관리 용이
- 사용자 정의 설정:  
  next.config.js 파일에서 커스터마이징(webpack 설정, 플러그인 추가 등)

```js
// next.config.js
module.exports = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    API_SECRET: process.env.API_SECRET,
  },
};
```

## CSS Modules 과 CSS-in-JS

- CSS Modules 지원:  
  컴포넌트별로 스타일을 적용하여 스타일 격리 및 관리
- CSS-in-JS:  
  동적 스타일링 및 테마 구현
  Styled-components, Emotion 등 라이브러리 지원

## 데이터 fetching 전략

- 데이터 종속성 관리: 여러 데이터 소스 결합 및 관리
- 성능 최적화: 캐싱과 재생성 전략 활용

### [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props)

- 빌드 시 데이터 fetching 과 페이지 생성
- 블로그 포스트 목록, 제품 목록 등

### [`getServerSideProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props)

- 각 요청에 대한 실시간 데이터 fetching
- 사용자 세션, 실시간 가격 정보 등

### [SWR](https://swr.vercel.app/ko)

- 자동 데이터 재요청 및 캐싱
- 사용자 프로필, 댓글 목록

### [React Query](https://tanstack.com/query/latest/docs/framework/react/overview)

- 복잡한 서버 상태 관리
- 페이지네이션, 데이터 동기화

## 상태 관리 전략

### Context API

- 애플리케이션 전역 상태 공유
- 테마, 사용자 선호도 설정 등

### Recoil

- 미세한 상태 관리 및 구성 요소 간 공유
- 복잡한 상태 의존성 관리에 유리

### Redux

- 중앙 집중식, 대규모 상태 관리
- 예측 가능한 상태 업데이트
- 미들웨어를 통한 logging, 비동기 처리
