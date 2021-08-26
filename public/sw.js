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

self.addEventListener('notificationclose', function(e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
  
    console.log('Closed notification: ' + primaryKey, ":", notification.data);
    
})

self.addEventListener('notificationclick', function(e) {
    var notification = e.notification;
    // var primaryKey = notification.data.primaryKey;
    var action = e.action;
  
    if (action === 'close') {
      notification.close();
    } else {
      clients.openWindow('http://localhost:3000');
      notification.close();
    }
})