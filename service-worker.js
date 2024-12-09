self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('app').then((cache) => {
      return cache.addAll(['manik.jpg','logo.jpg','logo.png','lock.gif','index2.gif','index.gif','fall.gif','gift.gif','suc2.gif','suc.gif','lsuc.gif','msuc.gif','edt.gif','udc.gif','done.gif']);
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