// Service Worker pour CaisseMobile - Version améliorée
const CACHE_NAME = 'caissemobile-v2';

// Installation - pas de liste fixe, on cache dynamiquement
self.addEventListener('install', (event) => {
    console.log('📦 Service Worker v2 : Installation');
    self.skipWaiting();
});

// Activation - nettoyer les anciens caches
self.addEventListener('activate', (event) => {
    console.log('✅ Service Worker v2 : Activation');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Suppression ancien cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch - stratégie Network First avec Cache Fallback
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Ignorer les requêtes non-GET
    if (request.method !== 'GET') {
        return;
    }

    // Ignorer les requêtes vers d'autres domaines (sauf CDN)
    if (url.origin !== location.origin) {
        return;
    }

    event.respondWith(
        fetch(request)
            .then((response) => {
                // Si la réponse est valide, la mettre en cache
                if (response && response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // Si pas de réseau, chercher dans le cache
                return caches.match(request).then((cachedResponse) => {
                    if (cachedResponse) {
                        console.log('📦 Depuis cache:', request.url);
                        return cachedResponse;
                    }
                    // Si rien dans le cache, retourner une page d'erreur basique
                    if (request.destination === 'document') {
                        return new Response(
                            '<html><body><h1>Mode hors ligne</h1><p>Cette page n\'est pas disponible hors ligne.</p></body></html>',
                            { headers: { 'Content-Type': 'text/html' } }
                        );
                    }
                });
            })
    );
});
