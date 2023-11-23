import {  GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import auth from "../config/firebase.config";
import { Oval } from "react-loader-spinner";




export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();


export default function AuthProvider({children}) {

 
    const [ authLoading , setAuthLoading ] = useState(true);
    const [ currentUser ,setCurrentUser ] = useState(null);


     // sign up with email & password 
     const createUser = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password);
    }

    // login with google
    const loginWithGoogle = () => {
      return signInWithPopup(auth, googleProvider);
    }


    // login with email & password
    const loginUser = (email, password ) => {
      return signInWithEmailAndPassword(auth, email, password);
    }

    // logout user 
    const logOut = () => {
     return signOut(auth);
    }

    // firebase observer
    useEffect(()=>{
     
      const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
      
        setCurrentUser(currentUser);
        setAuthLoading(false);
      })
      return ()=>{
        unsubscribe();
      }
    },[])



    const authInfo = { createUser , loginWithGoogle ,loginUser, logOut ,currentUser  }

    if(authLoading ){return  <Oval
      height={50}
      width={50}
      color="rgb(101,163,13)"
      wrapperStyle={{}}
      wrapperClass="absolute top-[6%] md:top-[8%] left-2/4"
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor="rgb(140,183,77)"
      strokeWidth={2}
      strokeWidthSecondary={2}
    
    /> }


  return (
    <AuthContext.Provider value={authInfo}>
    {children}
    </AuthContext.Provider>
  )
}
