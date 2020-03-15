import { files, routes, shell, timestamp } from '@sapper/service-worker';

const cacheName = `cache-${timestamp}`;
const urlsToCache = [...files, ...shell]
  .map((url) => `/${url}`)
  .filter((url) => url !== '/service-worker-index.html');

self.addEventListener('install', function(event) {
  console.log(urlsToCache);
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// self.addEventListener('install', (e) =>
//   e.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urlsToCache)))
// );

// self.addEventListener('fetch', (e) =>
//   e.respondWith(caches.match(e.request).then((res) => res && fetch(e.request)))
// );
