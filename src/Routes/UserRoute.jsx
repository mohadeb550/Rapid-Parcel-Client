import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

export default function UserRoute({children}) {

    const { authLoading, currentUser } = useAuth();
    const { user, isLoading  }  = useRole();

    if(authLoading || isLoading){
        return <span> Loading </span>
    }

    if(currentUser && user.role === 'user'){
        return children;
    }
    

  return <Navigate  to='/'/> ;
  
}
