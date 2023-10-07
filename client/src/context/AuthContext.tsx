// AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { UserCredential as FirebaseUserCredential } from "firebase/auth";

type SignInWithEmail = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export type AuthContextType = {
  currentUser: User | null;
  signInWithGoogle: () => void;
  userValue: string;
  createUser: ({
    email,
    password,
  }: SignInWithEmail) => Promise<FirebaseUserCredential>;
  signIn: ({
    email,
    password,
  }: SignInWithEmail) => Promise<FirebaseUserCredential>;
  logOut: () => Promise<void>
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userValue, setUserValue] = useState("");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((data) => {
      setUserValue(data.user.email || "");
    });
  };

  const createUser = ({ email, password }: SignInWithEmail) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = ({ email, password }: SignInWithEmail) => {
    return signInWithEmailAndPassword(auth, email, password);
  };


  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    createUser,
    signIn,
    userValue,
    signInWithGoogle,
    logOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
