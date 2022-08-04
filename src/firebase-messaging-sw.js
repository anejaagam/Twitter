importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-messaging.js');
firebase.initializeApp({
  'messagingSenderId': '138304780837'

});
const messaging = firebase.messaging();