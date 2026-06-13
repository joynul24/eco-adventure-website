import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase.config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if we are using the dummy config
  const isDummyConfig = auth.app.options.apiKey === "AIzaSy_dummy_api_key";

  const createUser = (email, password) => {
    setLoading(true);
    if (isDummyConfig) {
      return new Promise((resolve) => {
        const fakeUser = { uid: "local-" + Date.now(), email, displayName: email.split('@')[0], photoURL: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" };
        localStorage.setItem('_mock_user', JSON.stringify(fakeUser));
        setUser(fakeUser);
        resolve({ user: fakeUser });
        setLoading(false);
      });
    }
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    if (isDummyConfig) {
      return new Promise((resolve, reject) => {
        const stored = localStorage.getItem('_mock_user');
        if (stored) {
           const parsed = JSON.parse(stored);
           setUser(parsed);
           resolve({ user: parsed });
        } else {
           const fakeUser = { uid: "local-" + Date.now(), email, displayName: email.split('@')[0], photoURL: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" };
           localStorage.setItem('_mock_user', JSON.stringify(fakeUser));
           setUser(fakeUser);
           resolve({ user: fakeUser });
        }
        setLoading(false);
      });
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    if (isDummyConfig) {
      return new Promise((resolve) => {
        const fakeUser = { uid: "local-google-" + Date.now(), email: "google.user@example.com", displayName: "Google User", photoURL: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" };
        localStorage.setItem('_mock_user', JSON.stringify(fakeUser));
        setUser(fakeUser);
        resolve({ user: fakeUser });
        setLoading(false);
      });
    }
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    setLoading(true);
    if (isDummyConfig) {
      return new Promise((resolve) => {
        localStorage.removeItem('_mock_user');
        setUser(null);
        setTimeout(() => {
           resolve();
           setLoading(false);
        }, 300);
      });
    }
    return signOut(auth);
  };

  const updateUserProfile = (profile) => {
    if (isDummyConfig) {
       return new Promise((resolve) => {
          const updatedUser = { ...user, ...profile };
          localStorage.setItem('_mock_user', JSON.stringify(updatedUser));
          setUser(updatedUser);
          resolve();
       });
    }
    return updateProfile(auth.currentUser, profile);
  };

  useEffect(() => {
    if (isDummyConfig) {
       const stored = localStorage.getItem('_mock_user');
       if (stored) {
          setUser(JSON.parse(stored));
       }
       setLoading(false);
       return () => {};
    }

    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    loginUser,
    googleSignIn,
    logOut,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
