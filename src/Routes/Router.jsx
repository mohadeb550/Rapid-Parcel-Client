import { createBrowserRouter} from "react-router-dom";
import Layout from "../Layout/Layout";
import UnAuthorized from "../Pages/Error/UnAuthorized";
import Home from "../Pages/Home";
import NotFound from "../Pages/Error/NotFound";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Dashboard from "../Layout/Dashboard";
import AddParcel from "../Dashboard/Pages/AddParcel";
import MyParcels from "../Dashboard/MyParcels";
import UpdateParcel from "../Dashboard/UpdateParcel";
import MyProfile from "../Dashboard/Pages/MyProfile";
import AllParcels from "../Dashboard/Pages/AllParcels";
import AllDeliveryMan from "../Dashboard/Pages/AllDeliveryMan";





 const router = createBrowserRouter([

    {path: "/", element: <Layout/> , errorElement: <NotFound/>,  children:[

        {path:'/', element : <Home/>},
        {path:'/login', element : <Login/>},
        {path:'/sign-up', element : <SignUp/>},
      
    ]},
    {path:'/unauthorized', element : <UnAuthorized/>},

    {path: '/dashboard', element: <Dashboard/> , children: [

      {path: '/dashboard/book-parcel', element: <AddParcel/>},
      {path: '/dashboard/my-parcels', element: <MyParcels/>},
      {path: '/dashboard/update-parcel/:id', element: <UpdateParcel/>},
      {path: '/dashboard/my-profile', element: <MyProfile/>},
      {path: '/dashboard/all-parcels', element: <AllParcels/>},
      {path: '/dashboard/all-delivery-man', element: <AllDeliveryMan/>},
    ]}
  
  ]);
  

export default router;