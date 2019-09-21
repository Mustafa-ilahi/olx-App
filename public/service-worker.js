importScripts("https://www.gstatic.com/firebasejs/5.2.0/firebase-app.js")

// 'use strict';

console.log('... Service Worker File Running ...');

// Listner for Push Notification
self.addEventListener('push', function (event) {
    console.log('Received a push message', event);

    var notification = event.data.json().notification
    console.log(notification)
    var title = notification.title || 'Yay a message.';
    var body = notification.body || 'We have received a push message.';
    var icon = './images/fb-image200x200.png';
    // var tag = 'simple-push-demo-notification-tag';

    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: icon,
            // tag: tag
        })
    );

});








var cacheName = 'olx-hackathon-v1';
var filesToCache = [
    '/',
    '/index.html',
    '/login.html',
    '/signup.html',
    '/submitad.html',
    '/chat.html',
    '/chatBox.html',
    '/favadd.html',
    '/css/style.css',
    '/css/chat.css',
    '/css/chatbox.css',
    '/images/download.jpg',
    '/images/fb-image200x200.png',
    '/images/OLX.jpg',
    '/images/olx.png',
    '/images/windows-7-fav-icon.png',
    '/js/app.js',
    '/js/chatbox.js',
  
];

s
self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName && key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    console.log('[Service Worker] Fetch', e.request.url);
    e.respondWith(
        // caches.open(dataCacheName).then(function (cache) {
        //     return fetch(e.request).then(function (response) {
        //         cache.put(e.request.url, response.clone());
        //         return response  || fetch(e.request);;
        //     });
        // })
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});



