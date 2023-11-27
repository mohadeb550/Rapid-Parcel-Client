import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

export default function DeliveryManRoute({children}) {

    const { authLoading, currentUser } = useAuth();
    const { user, isLoading  }  = useRole();

    if(authLoading || isLoading){
        return <span> Loading </span>
    }

    if(currentUser && user.role === 'delivery-man'){
        return children;
    }
    

  return <Navigate to='/'/> ;
  
}
