// Service worker mínimo: necesario para que Android/Chrome consideren
// esta página como una PWA instalable de verdad (requisito técnico).
const CACHE_NAME = 'poliglota-v9';
const FILES_TO_CACHE = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Deja pasar las llamadas a la API de traducción sin tocarlas.
  if (event.request.url.includes('mymemory.translated.net')) return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
