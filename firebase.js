import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDX4CPU3VQ6w_LM47zDNZPMtXQfsC4-o1A",
  authDomain: "synergy-hub-baf7b.firebaseapp.com",
  projectId: "synergy-hub-baf7b",
  storageBucket: "synergy-hub-baf7b.firebasestorage.app",
  messagingSenderId: "1080506356598",
  appId: "1:1080506356598:web:6584542a6dc6eed292e057",
  measurementId: "G-5L2DD5ET09"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);