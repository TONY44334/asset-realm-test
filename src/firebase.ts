// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_2VmF3pNVhOYB5hk02DKzE2gqJybtKDk",
  authDomain: "assetrealm-a0b26.firebaseapp.com",
  projectId: "assetrealm-a0b26",
  storageBucket: "assetrealm-a0b26.firebasestorage.app",
  messagingSenderId: "833093701776",
  appId: "1:833093701776:web:7bd396e8d152dd000e0815"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();


// Save user data (cart items) to Firestore
export const saveUserData = async (userId: string, cartItems: any[]) => {
  try {
    // Reference to the user's document in Firestore
    const userRef = doc(db, "users", userId);
    
    // Save cart items to Firestore (you can add more fields if needed)
    await setDoc(userRef, {
      cartItems: cartItems,
    }, { merge: true }); // Merge ensures it doesn’t overwrite other data if it exists

    console.log("User data saved to Firestore");
  } catch (error) {
    console.error("Error saving user data: ", error);
  }
};

// Fetch user data (including cart items) from Firestore
export const fetchUserData = async (userId: string) => {
  try {
    // Reference to the user's document in Firestore
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
    return null;
  }
};
