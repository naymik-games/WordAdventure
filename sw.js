var cacheName = 'WordAdventure-v1.4';
var filesToCache = [
  '/',
  '/index.html',
  '/game.js',
  '/phaser.min.js',
  '/level_data.js',

  '/scripts/wordfind.js',

  '/scenes/endGame.js',
  '/scenes/preload.js',
  '/scenes/selectGame.js',
  '/scenes/startGame.js',


  '/classes/ScrabbleWordListAlt.js',
  '/classes/settings.js',

  '/assets/sprites/background.png',
  '/assets/sprites/blank.png',
  '/assets/sprites/coin.png',
  '/assets/sprites/icons.png',
  '/assets/sprites/letter-1.png',
  '/assets/sprites/letter-alt-no_border.png',
  '/assets/sprites/letter-alt-theme.png',
  '/assets/sprites/letter-alt.png',
  '/assets/sprites/menu.png',
  '/assets/sprites/particles.png',
  '/assets/sprites/particle.png',
  '/assets/sprites/play.png',
  '/assets/sprites/timer.png',
  '/assets/sprites/view.png',
  '/assets/sprites/lock.png',




  '/assets/fonts/lato.png',
  '/assets/fonts/lato.xml',





  //'https://cdn.jsdelivr.net/gh/photonstorm/phaser@3.10.1/dist/phaser.min.js'
];
self.addEventListener('install', function (event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function (err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('sw activate');
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('sw removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});