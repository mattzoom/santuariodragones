// Santuario de Dragones - Service Worker
const CACHE_NAME = 'santuario-dragones-v8.4.1';

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/en/',
  '/en/index.html',
  '/styles.min.css?v=8.4.0',
  '/js/bundle.min.js?v=8.4.0',
  '/js/i18n.js?v=8.4.0',
  '/js/data/dragons_en.js',
  '/favicon.svg',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png',
  '/assets/icons/icon-maskable-512.png',
  '/assets/ui/hero_emblem.webp',
  '/assets/ui/tournament_defeat.webp',
  '/assets/ui/trophy_champion.webp',
  '/arena.html',
  '/en/arena.html',
  '/coliseo.html',
  '/en/coliseo.html',
  '/favoritos.html',
  '/en/favoritos.html',
  '/magia-draconiana.html',
  '/en/magia-draconiana.html',
  '/altar-draconiano.html',
  '/en/altar-draconiano.html',
  '/altar-varita.html',
  '/en/altar-varita.html',
  '/altar-pentaculo.html',
  '/en/altar-pentaculo.html',
  '/altar-espejo.html',
  '/en/altar-espejo.html',
  '/altar-dragonscript.html',
  '/en/altar-dragonscript.html',
  '/academia-draconiana.html',
  '/en/academia-draconiana.html',
  '/academia-anillo-1.html',
  '/en/academia-anillo-1.html',
  '/academia-anillo-2.html',
  '/en/academia-anillo-2.html',
  '/academia-anillo-3.html',
  '/en/academia-anillo-3.html',
  '/academia-anillo-4.html',
  '/en/academia-anillo-4.html',
  '/academia-anillo-5.html',
  '/en/academia-anillo-5.html',
  '/forja-de-sigilos.html',
  '/en/forja-de-sigilos.html',
  '/test-draconiano.html',
  '/en/test-draconiano.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('[SW] Aviso de precache inicial:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  // Navegacion HTML: Network-first con fallback a cache
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          return (await caches.match('/index.html')) || (await caches.match('/'));
        })
    );
    return;
  }

  // Assets estaticos: Cache-first con actualizacion Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {});

      return cachedResponse || fetchPromise;
    })
  );
});