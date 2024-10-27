import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const auth = getAuth();
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unSubscribe;
  }, []);

  //sign up function
  const signup = async (email, password, username) => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);

    //update profile
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    const user = auth.currentUser;
    setCurrentUser({
      ...user,
    });
  };

  //login funcion
  const login = async (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout funcion
  const logout = async () => {
    const auth = getAuth();
    return signOut(auth);
  };

  const value = {
    currentUser,
    signup,
    logout,
    login,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
