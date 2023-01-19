importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

    //TODO AJUSTAR BIEN EL CUERPO Y CABECERA DE LAS NOTIFICACIONES

//? CURRENT TOKEN: edRQTjK4qYAFoX9syU1Hie:APA91bHnKRiIw77vY5Ee40sOb_HJvsQbJVQyEmPCBiwWhdqph-NwBWj0oui0ZTCpM3jnrONTj3cU-QYUhF98ZtpgXk2EW78HKVhzMM6lqzunddfw2hF7yb1QN5wxHkt-yjZ08QYTnEzf

firebase.initializeApp({
    apiKey: "AIzaSyCKOgPc1zLfHw2tAywEHHygxjjXFpxqF7o",
    authDomain: "wonto-firebase.firebaseapp.com",
    projectId: "wonto-firebase",
    storageBucket: "wonto-firebase.appspot.com",
    messagingSenderId: "378952912470",
    appId: "1:378952912470:web:15c8ff302678dee9f275f7",
    measurementId: "G-2CPWEHM78N"
  });


  //!Esto me genera dos notificaciones una que se imprime por Firebase console
  //! y otra que me está seteando en el código de abajo, transporto esto a app.js

  const messaging = firebase.messaging();
/*
  messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };


    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });

*/
