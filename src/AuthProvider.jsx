import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase/firebase.config";


export const Authcontext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const registerWithEmailPassword = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };


  const loginWithEmailPassword = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  
  const updateProfile = async (profileData) => {
    if (auth.currentUser) {
      await firebaseUpdateProfile(auth.currentUser, profileData);
      
      setUser({ ...auth.currentUser });
    } else {
      throw new Error("No user is logged in");
    }
  };

  // TRACK USER LOGIN STATE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Auth data for context
  const authData = {
    user,
    loading,
    registerWithEmailPassword,
    loginWithEmailPassword,
    logout,
    updateProfile, 
  };

  return (
    <Authcontext.Provider value={authData}>
      {children}
    </Authcontext.Provider>
  );
};

export default AuthProvider;

// Custom hook to use auth
export const useAuth = () => useContext(Authcontext);
