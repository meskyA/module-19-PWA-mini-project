// TODO: Create a service worker that caches static assets:
// Catching js and css requires workbox-strategies to be installed
// to actually respond to request with a cached response, we need to use a strategy called StaleWhileRevalidate
// this stratery will first check the cache for a response, and if it finds one, it will return it.

const { StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = requre('workbox-routing');
const { CacheableResponsePlugin } = require ('workbox-cacheable-response');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// the precacheAndRoute() method takes an array ot URLs to precache. The self._WB_MANIFEST is an array that contains the list of URLs to precache.

precacheAndRoute(self.__WB_MANIFEST);

// set up assets cache
registerRoute(
    // here we define the callback function that will filter the requests we want to cache (in this case, JS, and CSS files)
    ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
    new StaleWhileRevalidate({
        // name of the cache storage.
        cacheName: 'asset-cache',
        plugins: [
            // this plugin will cache responses with these headers to a maximum-age of 30 days.
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    })
);
