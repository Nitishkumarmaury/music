import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST || []);

self.addEventListener('fetch', (event) => {
  // Custom caching logic for audio files
  if (event.request.url.endsWith('.mp3')) {
    event.respondWith(
      caches.open('audio-cache').then(cache =>
        cache.match(event.request).then(response =>
          response || fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
        )
      )
    );
  }
});
