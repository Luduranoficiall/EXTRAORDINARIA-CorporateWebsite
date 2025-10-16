// Service Worker para EXTRAORDINÁRIA.AI PWA
// Versão: 2.0 - Mobile Ready

const CACHE_NAME = 'extraordinaria-v2.0';
const urlsToCache = [
  '/',
  '/dashboard',
  '/manifest.json',
  '/static/css/style.css',
  '/static/js/main.js'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativação
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch - Cache First Strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - retorna da cache
        if (response) {
          return response;
        }

        // Clone request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Verifica se resposta válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Push Notifications (futuro)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/static/icon-192.png',
    badge: '/static/badge.png',
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification('EXTRAORDINÁRIA.AI', options)
  );
});
