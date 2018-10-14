
/*
 * Jian Lu
 * (c) 2018
 * 
 * The Authentication component provides a layer of added security by controlling
 * which methods our application is allowed to use from Firebase. We implement the
 * basic user authentication functionalities and export them to be available for all
 * other components. This is essentially a package of authentication functions.
 */

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