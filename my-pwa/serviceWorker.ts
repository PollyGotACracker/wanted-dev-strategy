// self 를 ServiceWorkerGlobalScope 로 단언
export const serviceWorkerSelf = window.self;

serviceWorkerSelf.addEventListener("install", () => {
  console.log("Service Worker installing.");
});
