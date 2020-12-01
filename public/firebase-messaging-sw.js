/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyDbYYH0wdWmPFwxjp3KC9xR4xojyhX0m2s",
  authDomain: "subikish-678bf.firebaseapp.com",
  databaseURL: "https://subikish-678bf.firebaseio.com",
  projectId: "subikish-678bf",
  storageBucket: "subikish-678bf.appspot.com",
  messagingSenderId: "129719416859",
  appId: "1:129719416859:web:86f3c5f32a66e3c131e0be",
  measurementId: "G-63ZZY8PG3S"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = 'Subasree weds Sai Kishore';
  const notificationOptions = {
    body: 'Please click this notification to open live stream of the wedding',
    data: {
      url: payload.url
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    
    event.waitUntil(clients.matchAll({
      type: "window"
    }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    }));;
  });
});
