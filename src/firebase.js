import { initializeApp } from "firebase/app";
import { getFirestore  } from 'firebase/firestore';
import { getStorage  } from 'firebase/storage';




const firebaseConfig = {
    apiKey: "AIzaSyDEZkavvEoZSvyIN_MmT1mKDbvLpD7chD0",
    authDomain: "facebook-clone-edc6c.firebaseapp.com",
    projectId: "facebook-clone-edc6c",
    storageBucket: "facebook-clone-edc6c.appspot.com",
    messagingSenderId: "137908733602",
    appId: "1:137908733602:web:99fb71eb40c10ddaf679fb",
    measurementId: "G-634C7F5WXP"
  };
   const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore();
  const storage =getStorage(firebaseApp)
 export {db,firebaseApp,storage}


  