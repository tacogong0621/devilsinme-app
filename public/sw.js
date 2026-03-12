const CACHE = "devils-in-me-v4";

self.addEventListener("install", e => {
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  // Network-first for everything — let Vite handle caching via hashed filenames
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
