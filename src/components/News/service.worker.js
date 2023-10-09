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
          './components/News/NewsUI.css',
        ])
      })
  )
});

self.addEventListener('activate', (event) => {
  console.log('Активирован');
});
