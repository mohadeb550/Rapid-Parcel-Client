
import { Navigate, useLocation } from "react-router-dom";
import toast  from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


export default function PrivateRoute({children}) {

  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
 
  if(!currentUser){
    toast.error('Please Login!')
    return <Navigate state={ { from: location}} to='/login'/>;
  }

  return (
    <>
    {children}
    </>
  )
}


