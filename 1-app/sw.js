// Tidy-ish HTML migration: stop caching the OLD GitHub Pages application.
// The new lightweight HTML site does not register an offline worker yet.
self.addEventListener('install', () => { self.skipWaiting(); });
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith('mission-control')) await caches.delete(key);
    }
    await self.registration.unregister();
  })());
});
