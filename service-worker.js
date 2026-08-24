const CACHE_NAME = "synergy-v2";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./team.html",
  "./style.css",
  "./script.js",
  "./synergy-logo.png",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
