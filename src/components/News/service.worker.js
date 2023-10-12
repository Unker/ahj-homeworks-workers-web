import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', (event) => {
  console.log('Установлен');
  
  event.waitUntil(
    caches.open('my-best-cache')
      .then((cache) => {
        cache.addAll([
          './',
          './index.html',
          './css/style.css',
          './css/placeholderNews.css',
          './js/placeholderNews.js',
        ])
      })
  )
});

self.addEventListener('activate', (event) => {
  console.log('Активирован');
});
