const CACHE_NAME = "synergy-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./team.html",
  "./style.css",
  "./script.js",
  "./synergy-logo.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
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