import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDvUMeOTybf4grfqH3clXZXLgF-krBc7PI",
    authDomain: "covid-484b1.firebaseapp.com",
    projectId: "covid-484b1",
    storageBucket: "covid-484b1.appspot.com",
    messagingSenderId: "875782741393",
    appId: "1:875782741393:web:4ae2947950371becf40e30"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);