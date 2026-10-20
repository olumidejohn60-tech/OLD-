// Offline cache. Bump V when you update the game so players get the new version.
var V='pf27-v2',CORE=['./index.html','manifest.json','icon-192.png','icon-512.png','three.min.js'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return Promise.all(CORE.map(function(u){return c.add(u).catch(function(){})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(function(r){if(r&&(r.ok||r.type==='opaque')){var cp=r.clone();caches.open(V).then(function(c){c.put(e.request,cp)})}return r}).catch(function(){return caches.match(e.request).then(function(h){return h||caches.match('./index.html')})}))});
