self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('app').then((cache) => {
      return cache.addAll(['index.js', 'index.html', 'index.css', 'verify.html', 'office.html', 'owners.html', 'home.html']);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
