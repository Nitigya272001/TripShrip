import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCqd2dBMsRUgH6S6lglN9yRRTghmDjXyro",
  authDomain: "minor-project-91de6.firebaseapp.com",
  projectId: "minor-project-91de6",
  storageBucket: "minor-project-91de6.appspot.com",
  messagingSenderId: "1026493100134",
  appId: "1:1026493100134:web:9fc23b351b24f6a44b7da7",
  measurementId: "G-38PNEKGZWL"
};

const Fire = firebase.initializeApp(firebaseConfig);
const db = getFirestore(Fire);

export {db};
export default Fire;