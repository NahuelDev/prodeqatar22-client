import axios from "axios";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
}

const userURI = `${import.meta.env.VITE_SERVER_PRODE}/api/users`;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const { uid, displayName, email, photoURL } = res.user;
      
      const existsUser = await axios.get(`${userURI}/${uid}`);
      
      if (existsUser.data.exists) return; 
      else {
        const addUser = await axios.post(userURI, {
          uid,
          displayName,
          email,
          photoURL
        });

        if (addUser.data.error) throw new Error('Error on create the user');
      }

    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  const logout = () => {
    signOut(auth);
  };

export { signInWithGoogle, auth, logout }