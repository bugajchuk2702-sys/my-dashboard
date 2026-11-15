const V='dash-v61';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./fonts/fira-sans-cyrillic-400-normal.woff2','./fonts/fira-sans-latin-400-normal.woff2','./fonts/fira-sans-cyrillic-600-normal.woff2','./fonts/fira-sans-latin-600-normal.woff2','./fonts/fira-sans-extra-condensed-cyrillic-800-italic.woff2','./fonts/fira-sans-extra-condensed-latin-800-italic.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.open(V).then(async c=>{
    const hit=await c.match(e.request,{ignoreSearch:true});
    const net=fetch(e.request).then(r=>{if(r&&r.ok&&new URL(e.request.url).origin===location.origin)c.put(e.request,r.clone());return r}).catch(()=>null);
    return hit||(await net)||(e.request.mode==='navigate'?c.match('./index.html'):Response.error());
  }));
});
