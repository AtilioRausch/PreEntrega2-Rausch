// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4wt8yghm8IgVrL53aj9y1XqQ_08BjE9k",
  authDomain: "coderhouse-ecommerce-8f4ec.firebaseapp.com",
  projectId: "coderhouse-ecommerce-8f4ec",
  storageBucket: "coderhouse-ecommerce-8f4ec.appspot.com",
  messagingSenderId: "55710341518",
  appId: "1:55710341518:web:45c3278365e122dfa86cdf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)