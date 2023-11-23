import { createBrowserRouter} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import NotFound from "../Pages/ErrorPage/NotFound";
import UnAuthorized from "../Pages/ErrorPage/UnAuthorized";



 const router = createBrowserRouter([

    {path: "/", element: <Layout/> , errorElement: <NotFound/>,  children:[

        {path:'/', element : <Home/>},
      
    ]},
    {path:'/unauthorized', element : <UnAuthorized/>}
  
  ]);
  

export default router;