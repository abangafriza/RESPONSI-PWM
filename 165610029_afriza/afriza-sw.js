// variabel konstanta untuk nama cache storage
const cacheName = 'cache-afriza-v1';
// resource yang akan di simpan dalam cache
const precacheResources = [
  '.',
  'index.html',
  'manifest.json',
  'styles/main.css',
  'images/gambar1.jpg',
  'images/gambar2.jpg',
  'images/gambar3.jpg',
  'examples/mybio.json',
  'examples/myfoto.jpg',
  'examples/mybiograph.txt'

];

// event untuk menginstall afriza-sw.js
// menggunakan javascript promise untuk pre-cache 
self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

// servis worker dalam keadaan idle
self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});


// event untuk melakukan fetch resource yang akan di cache
self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});
