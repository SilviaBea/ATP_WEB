import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC_sgEdnSH_ofgzhfxHCahwnTrCld2XMuk",
  authDomain: "crud-project-web-2710a.firebaseapp.com",
  projectId: "crud-project-web-2710a",
  storageBucket: "crud-project-web-2710a.appspot.com",
  messagingSenderId: "65241498787",
  appId: "1:65241498787:web:806885946542afa54aeb16"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
