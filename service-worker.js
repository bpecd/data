self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('app').then((cache) => {
      return cache.addAll(['logo.gif','manik.jpg','vpdone.gif','screenshot2.png','lock2.gif','screenshot.png','suc3.gif','suc4.gif','logo.jpg','logo.png','lock.gif','index2.gif','fall.gif','gift.gif','suc2.gif','suc.gif','lsuc.gif','msuc.gif','edt.gif','udc.gif','done.gif','mail.gif','index.gif']);
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
