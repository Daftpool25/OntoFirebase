//Before 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//After Firebase Cloud Messaging
import { getMessaging, getToken } from "firebase/messaging";
//After Firestore Database
import { getFirestore } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//!CONSTANTES

const firebaseConfig = {
  apiKey: "AIzaSyCKOgPc1zLfHw2tAywEHHygxjjXFpxqF7o",
  authDomain: "wonto-firebase.firebaseapp.com",
  projectId: "wonto-firebase",
  storageBucket: "wonto-firebase.appspot.com",
  messagingSenderId: "378952912470",
  appId: "1:378952912470:web:15c8ff302678dee9f275f7",
  measurementId: "G-2CPWEHM78N"
};


// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging();
const vapidKey= "BDDteJcET9aeAJNKswG-DVgh0g2fUp_YPlDMNU1e7BtF-vXNqo38pFaKjUAEkj50JgmY99Epy4ABMY82vrmVzF8";

//Initialize FireStore
export const db = getFirestore(app);



  //!FIREBASE MESSAGING
  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  getToken(messaging, { vapidKey}).
      then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          console.log("Current Token is "+currentToken);

        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
