const CACHE='dez-fuel-barcode-v3';
const ASSETS=['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('openfoodfacts.org') || e.request.url.includes('unpkg.com')) return;
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
