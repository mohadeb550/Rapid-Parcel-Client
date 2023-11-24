import { createBrowserRouter} from "react-router-dom";
import Layout from "../Layout/Layout";
import UnAuthorized from "../Pages/Error/UnAuthorized";
import Home from "../Pages/Home";
import NotFound from "../Pages/Error/NotFound";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";



 const router = createBrowserRouter([

    {path: "/", element: <Layout/> , errorElement: <NotFound/>,  children:[

        {path:'/', element : <Home/>},
        {path:'/login', element : <Login/>},
        {path:'/sign-up', element : <SignUp/>},
      
    ]},
    {path:'/unauthorized', element : <UnAuthorized/>}
  
  ]);
  

export default router;