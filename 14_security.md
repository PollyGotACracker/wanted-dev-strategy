# Security

## XSS

- XSS(Cross-Site Scripting): 공격자가 웹사이트에 악의적인 스크립트를 삽입하여 사용자의 브라우저에서 스크립트 실행
- 사용자의 세션 소큰, 쿠키, 개인정보 등 탈취
- 댓글이나 메시지 기능에서 사용자 입력 필터링 필요: HTML 태그 escaping 등
- [콘텐츠 보안 정책(CSP)](https://developer.mozilla.org/ko/docs/Web/HTTP/CSP)을 설정하여 신뢰할 수 있는 스크립트 소스 실행

## CSRF

- CSRF(Cross-Site Request Forgery): 공격자가 사용자의 브라우저를 이용하여 사용자가 의도하지 않은 요청을 서버에 보내도록 하는 공격
- 사용자가 로그인한 상태에서 공격자가 만든 웹사이트에 접속하여 사용자 몰래 중요 작업을 수행하도록 함
- 요청에 대한 토큰을 사용하여 서버가 클라이언트의 요청이 유효한지 검증  
  (`res.setHeader("X-CSRF-Token", csrfToken)`)
- 서버에서 폼을 생성할 때 고유한 CSRF 토큰을 생성한 후, 폼 제출 시 함께 전송
- 또는 클라이언트가 서버로부터 CSRF 토큰을 받고, 요청 시 헤더에 해당 토큰을 포함

## CSP

- CSP(Content Security Policy): 웹사이트에서 실행될 수 있는 콘텐츠의 출처를 제한하는 보안 정책
- `Content-Security-Policy` 헤더를 통해 어떤 종류의 자원이 실행되거나 로드될 수 있는지 명시
- XSS 공격 보호

### 방법

1. HTTP 헤더 설정: 웹 서버에서 설정

```
Content-Security-Policy: default-src 'self' example.com *.example.com
```

2. meta 태그 설정: HTTP 헤더를 사용할 수 없는 경우

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src https://*; child-src 'none';"
/>
<!-- 스크립트 소스를 신뢰할 수 있는 도메인으로 제한 -->
<meta
  http-equiv="Content-Security-Policy"
  content="script-src 'self' https://trusted.com;"
/>
```

### 옵션

- default-src: 모든 요청에 대한 기본 정책을 설정
- script-src: JavaScript 파일의 출처를 제한
- img-src: 이미지 파일의 출처를 제한
- connect-src: AJAX, WebSocket, EventSource 연결의 출처를 제한.
- style-src: 스타일시트의 출처를 제한

### 값

- 'none': 모든 출처를 차단
- 'self': 현재 도메인을 허용
- 'unsafe-inline': 인라인 스크립트나 스타일을 허용
- 'unsafe-eval': `eval()`과 같은 코드 생성 메서드를 허용
- 도메인 이름: 특정 도메인을 허용

## JWT

- JWT(JSON Web Token): 클라이언트와 서버 간 인증에 필요한 정보를 안전하게 전송
- 사용자 로그인 후 서버가 생성하며, 클라이언트는 요청을 보낼 때 토큰을 포함하여 인증 유지
- Header(헤더), Payload(페이로드), Signature(서명) 세 부분으로 구성

```js
import jwt from "jsonwebtoken";

const user = { id: "polly" };
const secret = "256-bit-secret";
const token = jwt.sign(user, secret, { expiresIn: "1h" });
```

## HTTPS

- HTTPS(HyperText Transfer Protocol Secure): HTTP 에 데이터 암호화를 추가한 웹 통신 프로토콜
- SSL(Secure Sockets Layer) 또는 TLS(Transport Layer Security) 프로토콜을 사용하여 데이터 암호화
- 데이터 보호: 사용자 데이터를 암호화하여 중간자 공격[^1]으로부터 보호
- 신뢰성: SSL/TLS 인증서로 웹사이트의 신뢰성 보장
- SEO 개선: HTTPS 가 SEO 에 더욱 유리

---

- [^1] 중간자 공격(MITM): 네트워크 통신을 조작하여 통신 내용을 도청하거나 조작하는 공격 기법. 중간자 공격은 통신을 연결하는 두 사람 사이에 중간자가 침입하여, 두 사람은 상대방에게 연결했다고 생각하지만 실제로는 두 사람은 중간자에게 연결되어 있으며 중간자가 한쪽에서 전달된 정보를 도청 및 조작한 후 다른 쪽으로 전달한다.
