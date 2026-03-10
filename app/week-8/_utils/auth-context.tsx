"use client";
 
import { useContext, createContext, useState, useEffect, ReactNode } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  User,
} from "firebase/auth";
import { auth } from "./firebase"; // Ensure firebase.tsx exists in this same folder
 
// 1. Define the "Shape" of our authentication data
interface AuthContextType {
  user: User | null;
  gitHubSignIn: () => Promise<void>;
  firebaseSignOut: () => Promise<void>;
}

// 2. Create the Context (the broadcast system)
const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
// 3. Create the Provider (The wrapper that shares the data)
// Make sure the word 'export' is here!
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
 
  const gitHubSignIn = async () => {
    const provider = new GithubAuthProvider();
    await signInWithPopup(auth, provider);
  };
 
  const firebaseSignOut = async () => {
    return signOut(auth);
  };
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
 
  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
 
// 4. Create the Hook (The easy way for other files to get the data)
// Make sure the word 'export' is here too!
export const useUserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within an AuthContextProvider");
  }
  return context;
};