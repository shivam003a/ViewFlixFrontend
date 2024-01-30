import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB99kF6aUTcrI8SXTDvTw2xWtMvqDlfN5w",
  authDomain: "viewflix-3a89f.firebaseapp.com",
  projectId: "viewflix-3a89f",
  storageBucket: "viewflix-3a89f.appspot.com",
  messagingSenderId: "795772134077",
  appId: "1:795772134077:web:3e544a452853c99f094dd4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app