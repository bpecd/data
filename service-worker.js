const cacheName = 'app-cache-v1';
const assetsToCache = [
  '',
  'index.html',
  'index.css',
  'index.js',
  'logo.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(assetsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
