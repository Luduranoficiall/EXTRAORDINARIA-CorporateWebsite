/**
 * EXTRAORDINÁRIA.AI - Service Worker PWA
 * Cache inteligente e funcionamento offline
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `extraordinaria-${CACHE_VERSION}`;

// Arquivos para cache imediato
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/manifest.json',
  '/offline.html'
];

// Cache dinâmico
const DYNAMIC_CACHE = `extraordinaria-dynamic-${CACHE_VERSION}`;

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Cacheando arquivos estáticos');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Ativação
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker: Ativado');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE) {
            console.log('🗑️ Service Worker: Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptar requisições
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Se tem no cache, retorna
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Se não, busca na rede
        return fetch(event.request)
          .then((networkResponse) => {
            // Cachear dinamicamente recursos válidos
            if (event.request.method === 'GET' && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            
            return networkResponse;
          })
          .catch(() => {
            // Se falhar, retorna página offline
            if (event.request.destination === 'document') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Push Notifications (futuro)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'EXTRAORDINÁRIA.AI';
  const options = {
    body: data.body || 'Nova atualização disponível',
    icon: '/icon-192.png',
    badge: '/icon-96.png',
    vibrate: [200, 100, 200],
    data: data.url || '/'
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Click em notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data)
  );
});
