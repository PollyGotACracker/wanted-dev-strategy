# SPA Optimization

## Code Splitting

- 애플리케이션 번들을 여러 chunk 로 나누어 필요할 때만 로드
- 초기 로딩 시간 단축

```jsx
import { Suspense, lazy } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default App;
```

## Lazy-loading

- 사용자에게 노출되기 전까지 이미지, 컴포넌트 등 자원의 로드를 지연
- 불필요한 자원 로드 방지, 초기 성능 개선

```jsx
// 이미지 로딩이 완료될 때까지 대체 이미지 표시
import { useState, useEffect } from "react";
import spinnerImage from "./spinner_image_path";

const LazyImage = ({ lazySrc, alt }) => {
  const [src, setSrc] = useState(spinnerImage);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setSrc(lazySrc);
    img.src = lazySrc;
  }, [lazySrc]);

  return <img src={src} alt={alt} />;
};

export default LazyImage;
```

```jsx
// 사용자 스크롤 위치에 따른 이미지 로드
import { useState, useEffect, useRef } from "react";
import spinnerImage from "./spinner_image_path";

const LazyImage = ({ lazySrc, alt }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      });
    });
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return <img src={loaded ? lazySrc : spinnerImage} alt={alt} ref={imgRef} />;
};

export default LazyImage;
```

## JavaScript 최적화

- SPA 는 클라이언트 측에서 렌더링되어 JavaScript 의존성이 높기 때문에 최적화가 매우 중요
- 로딩 시간 감소, 브라우저 렌더링 향상, 부드러운 인터랙션 제공
- Minification: 번들링 시 불필요한 공백, 주석, 개발자 편의를 위한 형식 제거
- Tree Shaking: 번들링 시 실제 사용되지 않는 변수, 함수 등 코드 제거
- Asynchronous Loading(비동기 로딩): 필요한 시점에 JS 파일 로드  
  큰 크기의 스크립트 파일이나 라이브러리를 다룰 때

```html
<script type="text/javascript">
  function loadScript(url) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.head.appendChild(script);
  }

  // 특정 조건이 충족될 때 스크립트 로드
  // (사용자 상호작용에 따라 추가 기능 로드 등)
  loadScript("/path/script.js");
</script>
```

## CSS 최적화

- 로딩 시간 단축 및 렌더링 성능 향상
- CSS-in-JS 라이브러리를 사용할 경우 빌드 시 자동으로 CSS 코드 압축 및 최소화

### React 의 CSS Module

- 컴포넌트명\_css 클래스명\_\_랜덤 문자열 형태의 class 가 요소에 적용됨
- 컴포넌트별 스타일 캡슐화, 전역 스타일 충돌 방지, CSS 분할 및 code splitting

```css
/* Button.module.css */
.button {
  background-color: #7cb9e8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
}
```

```jsx
// Button.jsx
import styles from "./Buton.module.css";

function Button({ label }) {
  return <button className={styles.button}>{label}</button>;
}

export default Button;
```

### Critical CSS 와 SSR

- React 에서 SSR 과 결합하여 구현
- 초기 페이지 로드에 필요한 핵심 CSS 만을 로드
- [styled-component 예시](https://styled-components.com/docs/advanced#server-side-rendering)
- [emotion 예시](https://changeset-release--emotion.netlify.app/docs/ssr)

```jsx
import App from "./App";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";

const sheet = new ServerStyleSheet();
try {
  const html = renderToString(sheet.collectStyles(<App />));
  const styleTags = sheet.getStyleTags(); // or sheet.getStyleElement();
} catch (error) {
  // handle error
  console.error(error);
} finally {
  sheet.seal();
}
```

```jsx
import App from "./App";
import { renderToString } from "react-dom/server";
import { extractCritical } from "emotion-server";

const { css, html } = extractCritical(renderToString(<App />));
```

## 브라우저 캐싱

- 웹사이트 리소스를 사용자 로컬에 저장하여 재방문 시 빠르게 로드
- 로딩 속도 향상 및 네트워크 트래픽 감소
- 특히 SPA 에서 초기 로딩 시간 감소에 크게 작용

### `Cache-Control` 헤더

- 서버가 리소스 캐싱 시간을 브라우저에게 알리는 방법
- 리소스가 신선하다고 간주되는 시간(초)

```
Cache-Control: max-age=3600, must-revalidate
```

### [`eTag` 헤더](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag)

- 서버가 각 리소스에 대해 고유 식별자를 제공하는 방법
- 캐시된 리소스의 신선도를 검증하는 역할
- 클라이언트는 리소스를 캐싱함과 동시에 `eTag` 값을 저장
- 클라이언트가 같은 리소스를 다시 필요로 할 때,  
  저장된 `eTag` 값을 `If-None-Match` 헤더에 포함하여 서버에 요청
- 서버는 eTag 값을 확인하여 리소스 변경 여부를 확인,  
  변경되지 않았다면 캐시된 데이터 사용(304 Not Modified)

```
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
ETag: W/"0815"
```

### Service Worker

- 웹 애플리케이션의 캐싱 전략을 세밀하게 제어할 수 있도록 하는 JavaScript Worker
- 오프라인 경험, 백그라운드 데이터 동기화 등 고급 캐싱 시나리오

```js
// service_worker.js
// 네트워크가 불안정한 환경에서 캐싱된 리소스 사용
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
```

## 네트워크 최적화

### HTTP 요청 최소화

- 요청이 많아질수록 웹페이지 로딩 시간 증가
- Webpack 등 모듈 번들러를 이용해 여러 개의 JS 또는 CSS 파일을 하나로 통합

### CDN 사용

- CDN(Content Delivery Network): 전 세계에 분산된 서버 네트워크를 사용하여 사용자에게 컨텐츠를 빠르게 제공하는 기술
- 사용자와 가까운 서버에서 컨텐츠 제공
- 웹페이지 로딩 속도 향상

### 이미지와 비디오 최적화

- 적절한 이미지 포맷 선택, 이미지 및 비디오 압축, lazy-loading 적용 등
