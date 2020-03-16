import { files, shell, timestamp } from '@sapper/service-worker';

const cacheName = `cache-${timestamp}`;
const urlsToCache = [...files, ...shell]
  .map((url) => `/${url}`)
  .filter((url) => url !== '/service-worker-index.html');

self.addEventListener('install', (e) =>
  e.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urlsToCache)))
);

self.addEventListener('fetch', (e) =>
  e.respondWith(
    caches.match(e.request).then((res) => {
      return (
        res ||
        fetch(e.request).then((res) => {
          if (!res || res.status !== 200 || res.type !== 'basic') return res;
          const resToCache = res.clone();
          caches.open(cacheName).then((cache) => {
            cache.put(e.request, resToCache);
          });
          return res;
        })
      );
    })
  )
);

self.addEventListener('activate', (e) =>
  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(cacheNames.map((cn) => cn !== cacheName && caches.delete(cn)))
      )
  )
);
