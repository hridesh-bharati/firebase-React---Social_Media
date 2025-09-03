// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBmnp_8dW9hJ23ZSUFnadB4NHw-89MfN_k",
  authDomain: "portfolio-dfe5c.firebaseapp.com",
  projectId: "portfolio-dfe5c",
  messagingSenderId: "1001469015630",
  appId: "1:1001469015630:web:79fe0cfb9ffe9f0a60b51f",
  databaseURL: "https://portfolio-dfe5c-default-rtdb.firebaseio.com",
  storageBucket: "portfolio-dfe5c.firebasestorage.app",
  measurementId: "G-4ZXSHCYXRF"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
