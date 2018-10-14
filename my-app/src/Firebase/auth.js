import { auth } from './firebase';

// Signup
export const doCreateUserWithEmailAndPassword = (email, password) => auth.createUserWithEmailAndPassword(email, password);

// Login
export const doLoginWithEmailAndPassword = (email, password) => auth.signInWithEmailAndPassword(email, password);

// Logout
export const doLogout = () => auth.signOut();

// Password reset
export const doPasswordReset = (email) => auth.sendPasswordResetEmail(email);

// Password change
export const doPasswordChange = (password) => auth.currentUser.updatePassword(password);