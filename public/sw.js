self.addEventListener('install', event => {
    console.log('Service worker installing...');
    // Add a call to skipWaiting here
    self.skipWaiting()
});

self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
});

self.addEventListener('message', event => {
    console.log("message:", event)
})