import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCR4Ze5y0y8-J26zsWvZGVYXEysbtbV8Tc',
  authDomain: 'music-329e2.firebaseapp.com',
  projectId: 'music-329e2',
  storageBucket: 'music-329e2.appspot.com',
  messagingSenderId: '291560331020',
  appId: '1:291560331020:web:d8adebeaf3eb3a37ef1b29',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection('users');

export {
  auth,
  db,
  usersCollection,
};