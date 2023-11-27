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
import AllUsers from "../Dashboard/Pages/AllUsers";
import DeliveryList from "../Dashboard/Pages/DeliveryList";
import Statistics from "../Dashboard/Pages/Statistics";
import MyReviews from "../Dashboard/Pages/MyReviews";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import DeliveryManRoute from "./DeliveryManRoute";





 const router = createBrowserRouter([

    {path: "/", element: <Layout/> , errorElement: <NotFound/>,  children:[

        {path:'/', element : <Home/>},
        {path:'/login', element : <Login/>},
        {path:'/sign-up', element : <SignUp/>},
      
    ]},
    {path:'/unauthorized', element : <UnAuthorized/>},

    {path: '/dashboard', element: <PrivateRoute> <Dashboard/> </PrivateRoute> , children: [

      {path: '/dashboard/book-parcel', element: <UserRoute> <AddParcel/> </UserRoute> },
      {path: '/dashboard/my-parcels', element : <UserRoute>  <MyParcels/> </UserRoute>},
      {path: '/dashboard/update-parcel/:id', element: <UserRoute>  <UpdateParcel/> </UserRoute> },
      {path: '/dashboard/my-profile', element: <MyProfile/>},
      {path: '/dashboard/all-parcels', element: <AdminRoute> <AllParcels/> </AdminRoute> },
      {path: '/dashboard/all-delivery-man', element: <AdminRoute> <AllDeliveryMan/> </AdminRoute> },
      {path: '/dashboard/all-users', element: <AdminRoute> <AllUsers/> </AdminRoute> },
      {path: '/dashboard/delivery-list', element: <DeliveryManRoute> <DeliveryList/> </DeliveryManRoute> },
      {path: '/dashboard/statistics', element: <AdminRoute>  <Statistics/> </AdminRoute> },
      {path: '/dashboard/my-reviews', element: <DeliveryManRoute> <MyReviews/> </DeliveryManRoute> },
    ]}
  
  ]);
  

export default router;