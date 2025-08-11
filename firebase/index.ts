// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDJOqJq-tgMpo0rterDNik4nbpVZLKXJGg',
  authDomain: 'savvy-badge-450111-q0.firebaseapp.com',
  projectId: 'savvy-badge-450111-q0',
  storageBucket: 'savvy-badge-450111-q0.firebasestorage.app',
  messagingSenderId: '177796483272',
  appId: '1:177796483272:web:e5c2ab1f1d5d7db1a3bdfd',
  measurementId: 'G-XKW7W4W26T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
