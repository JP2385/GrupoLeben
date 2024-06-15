self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/styles.css',
                '/js/scripts.js',
                '/json/manifest.json',
                '/images/icons/icon-192x192.png',
                '/images/icons/icon-512x512.png'
                // Add other resources you want to cache
            ]).catch(function(error) {
                console.error('Failed to cache', error);
            });
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
