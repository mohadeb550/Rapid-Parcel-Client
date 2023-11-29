
import { useState } from "react";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { BsFillBoxFill } from "react-icons/bs";
import { FaHome, FaThList, FaUser  } from "react-icons/fa";
import { SiSimpleanalytics } from "react-icons/si";
import { HiUsers } from "react-icons/hi2";
import { PiUsers } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { Toaster } from "react-hot-toast";
import useAllDeliveryMan from '../Hooks/useAllDeliveryMan'
import { FaUserLarge } from "react-icons/fa6";
import useMyReviews from "../Hooks/useMyReviews";
import useRole from "../Hooks/useRole";
import { useEffect } from "react";
import { useLocation } from "react-router-dom/dist";

export default function Dashboard() {

   const { user , isLoading} = useRole();
   const navigate = useNavigate();
   const location  = useLocation();
 

   useEffect(() => {
      if(user?.role === 'user' && location?.state?.from?.location?.pathname === '/' )navigate('/dashboard/my-parcels')
      if(user?.role === 'delivery-man' && location?.state?.from?.location?.pathname === '/')navigate('/dashboard/delivery-list')
      if(user?.role === 'admin' && location?.state?.from?.location?.pathname === '/')navigate('/dashboard/statistics')
   },[user, navigate]) 

    const { allDeliveryMan} = useAllDeliveryMan();
    const { allReviews } = useMyReviews();
 
    const [ isOpen, setIsOpen ] = useState(true);

  return (
    <>

<button onClick={() => setIsOpen(!isOpen)}  type="button" className={`inline-flex fixed top-0 left-0 items-center p-1 md:p-2 mt-4 ms-3 text-sm text-gray-200 rounded-md  m-1  z-20 ${!isOpen && 'text-gray-600'}`}>
   <span className="sr-only">Open sidebar</span>
   <svg className=" w-5 h-5 md:w-6 md:h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> 
   <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>


    <section className={`${isOpen && 'bg-black/60 xl:bg-transparent fixed top-0 left-0 right-0 z-10 xl:z-0 xl:static w-full h-full'}`}>

   {isOpen &&  <aside className={`fixed top-0 left-0 z-10 pt-10 md:pt-14 xl:pt-16 bg-[#014BA0]  w-64 h-screen transition-transform `} >
   <div className="h-full px-3 py-4 overflow-y-auto  dark:bg-gray-800">

    {isLoading && <Oval
      height={30}
      width={30}
      color="#98B3D1"
      wrapperStyle={{}}
      wrapperClass="absolute top-[6%] md:top-[4%] left-2/4"
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor="#5A82BB)"
      strokeWidth={2}
      strokeWidthSecondary={2}
    
    />}

    {/* user routes */}
      {
      user.role === 'user' && 
      <ul className="space-y-2 font-medium">
        
        <li>
           <NavLink to="/dashboard/book-parcel" className={({isActive})=> isActive? ' flex items-center p-2 t bg-gray-900 text-gray-300 rounded-lg dark:text-white  ': 'flex items-center p-2 text-gray-300 rounded-lg dark:text-white  ' }>
           <BsFillBoxFill size={22} className="text-gray-400" />
              <span className="flex-1 ms-3 whitespace-nowrap"> Book A Parcel</span>
             
           </NavLink>
        </li>
        <li>
           <NavLink to="/dashboard/my-parcels" className={({isActive})=> isActive? ' flex items-center p-2 t bg-gray-900 text-gray-300 rounded-lg dark:text-white  ': 'flex items-center p-2 text-gray-300 rounded-lg dark:text-white  ' }>
           <svg className="flex-shrink-0 w-5 h-5 text-gray-400 transition duration-75 dark:text-gray-400  dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                 <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">My Parcels</span>
              
           </NavLink>
        </li>
        
     </ul>
     }

    {/* delivery man routes */}
   {
    user.role === 'delivery-man' &&
    <ul className="space-y-2 font-medium">
         
         
    <li>
       <NavLink to="/dashboard/delivery-list" className={({isActive})=> isActive? ' flex items-center p-2 t bg-gray-900 text-gray-300 rounded-lg dark:text-white  ': 'flex items-center p-2 text-gray-300 rounded-lg dark:text-white  ' }>
       <TbTruckDelivery size={22} className="text-gray-400" />
          <span className="flex-1 ms-3 whitespace-nowrap"> My Delivery List</span>
        
       </NavLink>
    </li>

    <li>
       <NavLink to="/dashboard/my-reviews" className={({isActive})=> isActive? ' flex items-center p-2 t bg-gray-900 text-gray-300 rounded-lg dark:text-white  ': 'flex items-center p-2 text-gray-300 rounded-lg dark:text-white  ' }>
       <FaRegStar size={22} className="text-gray-400" />
          <span className="flex-1 ms-3 whitespace-nowrap"> My Reviews </span>
          <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"> {allReviews?.length} </span>
       </NavLink>
    </li>
   
    
 
 </ul>
   }

    {/* admin routes  */}
    {
        user.role === 'admin' &&
        <ul className="space-y-2 font-medium">
         
       
         <li>
            <NavLink to="/dashboard/statistics"   className={({isActive})=> isActive? ' flex items-center p-2 text-gray-300 bg-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700 group ': 'flex items-center p-2 text-gray-300 rounded-lg dark:text-white  dark:hover:bg-gray-700 group' }>
            <SiSimpleanalytics size={23} className="text-gray-400" />
               <span className="flex-1 ms-3 whitespace-nowrap"> Statistics </span>
               
            </NavLink>
         </li>
         <li>
            <NavLink to="/dashboard/all-parcels"   className={({isActive})=> isActive? ' flex items-center p-2 text-gray-300 bg-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700 group ': 'flex items-center p-2 text-gray-300 rounded-lg dark:text-white  dark:hover:bg-gray-700 group' }>
            <FaThList size={23} className="text-gray-400" />
               <span className="flex-1 ms-3 whitespace-nowrap"> All Parcels</span>
               
            </NavLink>
         </li>

         <li>
            <NavLink to="/dashboard/all-users"   className={({isActive})=> isActive? ' flex items-center p-2 text-gray-300 bg-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700 group ': 'flex items-center p-2 text-gray-300 rounded-lg dark:text-white  dark:hover:bg-gray-700 group' }>
            <HiUsers size={23} className="text-gray-400" />
               <span className="flex-1 ms-3 whitespace-nowrap"> All Users </span>
               
            </NavLink>
         </li>

         <li>
            <NavLink to="/dashboard/all-delivery-man"   className={({isActive})=> isActive? ' flex items-center p-2 t bg-gray-900 text-gray-300 rounded-lg dark:text-white  ': 'flex items-center p-2 text-gray-300 rounded-lg dark:text-white  ' }>
            <PiUsers size={23} className="text-gray-400" />
            
               <span className="flex-1 ms-3 whitespace-nowrap"> All Delivery Man</span>
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"> {allDeliveryMan.length} </span>
            </NavLink>
         </li>
       
      </ul>
    }

    
    <ul className="border-t border-white/50 py-4 mt-2">
    <li>
           <NavLink to="/dashboard/my-profile" className={({isActive})=> isActive? ' flex items-center p-2 t bg-gray-900 text-gray-300 rounded-lg dark:text-white  ': 'flex items-center p-2 text-gray-300 rounded-lg dark:text-white  ' }>
              <FaUserLarge size={20} className="text-gray-400" />
              <span className="flex-1 ms-3 whitespace-nowrap"> My Profile </span>
              
           </NavLink>
        </li>
    <li>
           <NavLink to="/" className={({isActive})=> isActive? ' flex items-center p-2 t bg-gray-900 text-gray-300 rounded-lg dark:text-white  ': 'flex items-center p-2 text-gray-300 rounded-lg dark:text-white' }>
              <FaHome size={23} className="text-gray-400" />
              <span className="flex-1 ms-3 whitespace-nowrap"> Home </span>
              
           </NavLink>
        </li>
    </ul>

   </div>
</aside>}

    </section>

    <section >
    <Toaster/>
   <div className="p-4 md:p-12 xl:p-16">
   <Outlet/>
   </div>
    </section>

    </>
  )
}
