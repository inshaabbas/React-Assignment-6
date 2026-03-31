

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "./config";

// Create a new user with email + password, then set their display name
export const signUp = async (email, password, displayName) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  // Update the profile so we can show the user's name in the UI
  await updateProfile(credential.user, { displayName });
  return credential.user;
};

// Sign in an existing user with email + password
export const signIn = async (email, password) => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
};

// Sign in with Google (popup flow)
export const signInWithGoogle = async () => {
  const credential = await signInWithPopup(auth, googleProvider);
  return credential.user;
};

// Sign out the current user
export const logOut = () => signOut(auth);
