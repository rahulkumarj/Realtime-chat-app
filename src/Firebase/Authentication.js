import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const UserSignUp = async (email,password)=>{
   const signUpuser = await createUserWithEmailAndPassword(auth, email, password); 
   return signUpuser; 
}


export const UserLogin =async (email,password)=>{
   const loginuser = await signInWithEmailAndPassword(auth, email, password);
   return loginuser;
}

export const LogOutUser = async () =>{
   signOut(auth)
}