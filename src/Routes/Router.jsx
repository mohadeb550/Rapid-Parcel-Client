import { createBrowserRouter} from "react-router-dom";
import Layout from "../Layout/Layout";
import UnAuthorized from "../Pages/Error/UnAuthorized";
import Home from "../Pages/Home";
import NotFound from "../Pages/Error/NotFound";



 const router = createBrowserRouter([

    {path: "/", element: <Layout/> , errorElement: <NotFound/>,  children:[

        {path:'/', element : <Home/>},
      
    ]},
    {path:'/unauthorized', element : <UnAuthorized/>}
  
  ]);
  

export default router;