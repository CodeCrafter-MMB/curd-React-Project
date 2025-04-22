import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC85IwtznecVHQRR13xYQNxzRvpM3zAJ10",
  authDomain: "react-01-163cc.firebaseapp.com",
  projectId: "react-01-163cc",
  storageBucket: "react-01-163cc.firebasestorage.app",
  messagingSenderId: "669147801290",
  appId: "1:669147801290:web:3568cf222a0a8b19183633"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure Google Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Configure Facebook Provider
export const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');
facebookProvider.setCustomParameters({
  'display': 'popup'
});

export default app;