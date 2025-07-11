import * as firebaseConfig from "../../firebaseConfig.json";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log("auth:", auth);



export const registerUser = async (email, password) => {
    console.log("registerUser called with:", email, password);
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Firebase register error:", error);
        throw new Error(error.message);
    }
}

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const signOutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw new Error(error.message);
    }
}   

