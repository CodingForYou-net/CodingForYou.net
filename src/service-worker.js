import { files, shell, timestamp } from '@sapper/service-worker';

const cacheName = `cache-${timestamp}`;
const urlsToIgnore = [
  /\/service-worker-index\.html/,
  /\/robots\.txt/,
  /\/sitemap.xml/,
  /\/api\/.*/,
];

const urlsToCache = [...files, ...shell]
  .map((url) => `/${url}`)
  .filter((url) => !urlsToIgnore.find((regex) => url.match(regex)));

console.log(urlsToCache);

self.addEventListener('install', (e) =>
  e.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urlsToCache)))
);

self.addEventListener('fetch', (e) =>
  e.respondWith(
    caches.match(e.request).then((res) => {
      return (
        res ||
        fetch(e.request).then((res) => {
          if (
            !res ||
            res.status !== 200 ||
            res.type !== 'basic' ||
            urlsToIgnore.find((regex) => res.url.match(regex))
          )
            return res;
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
