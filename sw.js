const cacheName = "FruitEater";
const assets = [
    'index.html',
    'js/main.js',
    'js/lib/uikit.min.js',
    'js/lib/uikit-icons.min.js',
    'css/main.css',
    'css/lib/nes.css',
    'css/lib/uikit.min.css',
    'img/favicon.ico',
    'android-chrome-192x192.png',
    'android-chrome-256x256.png',
    'apple-touch-icon.png',
    'browserconfig.xml',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon.ico',
    'mstile-150x150.png',
    'pac-man.jpg',
    'pacman.png',
    'safari-pinned-tab.svg'
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
