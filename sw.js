// Service Worker para cache básico no GitHub Pages
const CACHE_NAME = "cuide-se-hoje-v1";
const urlsToCache = [
  "/",                // Página inicial
  "/index.html",
  "/style.css",
  "/script.js",
  "/Logo.webp",
  "/favicon.ico"
];

// Instalar o Service Worker e adicionar os arquivos ao cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativar e remover caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      );
    })
  );
});

// Buscar no cache primeiro, e atualizar quando online
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).then(networkResponse => {
          // Atualiza o cache com novos arquivos
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
          return networkResponse;
        })
      );
    })
  );
});
