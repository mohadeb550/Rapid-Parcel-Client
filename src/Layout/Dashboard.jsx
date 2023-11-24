import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { NavLink, Outlet, useActionData } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { Oval } from "react-loader-spinner";
import { BsFillBoxFill } from "react-icons/bs";
import { FaThList, FaUser  } from "react-icons/fa";
import { SiSimpleanalytics } from "react-icons/si";
import { HiUsers } from "react-icons/hi2";
import { PiUsers } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { Toaster } from "react-hot-toast";


export default function Dashboard() {

    const axiosSecure = useAxiosSecure();
    const { currentUser } = useAuth();

    const [ isOpen, setIsOpen ] = useState(true);
    const { data:user ={} , isLoading } = useQuery({
        queryKey: ['role'],
        queryFn: async () => {
           const res = await axiosSecure.get(`/user-role/${currentUser.email}`);
           return res.data;
        }
    })

  return (
    <>



<button onClick={() => setIsOpen(!isOpen)}  type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 m-1 absolute top-0 left-0 z-20 ">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>


    <section>

    <aside className={`fixed top-0 pt-10 md:pt-2 bg-gray-50 left-0  w-64 h-screen transition-transform ${isOpen && '-translate-x-full'} sm:translate-x-0`} >
   <div className="h-full px-3 py-4 overflow-y-auto  dark:bg-gray-800">

    {isLoading && <Oval
      height={30}
      width={30}
      color="#014BA0"
      wrapperStyle={{}}
      wrapperClass="absolute top-[6%] md:top-[8%] left-2/4"
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
           <NavLink to="/dashboard/book-parcel" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
           <BsFillBoxFill size={22} className="text-gray-600" />
              <span className="flex-1 ms-3 whitespace-nowrap"> Book A Parcel</span>
             
           </NavLink>
        </li>
        <li>
           <NavLink to="/dashboard/my-parcels" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
           <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                 <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">My Parcels</span>
              
           </NavLink>
        </li>
        <li>
           <NavLink to="/dashboard/my-profile" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <FaUser size={23} className="text-gray-600" />
              <span className="flex-1 ms-3 whitespace-nowrap">My Profile</span>
              
           </NavLink>
        </li>
     </ul>
     }

    {/* delivery man routes */}
   {
    user.role === 'delivery-man' &&
    <ul className="space-y-2 font-medium">
         
         
    <li>
       <NavLink to="/dashboard/my-delivery" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
       <TbTruckDelivery size={22} className="text-gray-600" />
          <span className="flex-1 ms-3 whitespace-nowrap"> My Delivery</span>
          <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
       </NavLink>
    </li>

    <li>
       <NavLink to="/dashboard/my-reviews" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
       <FaRegStar size={22} className="text-gray-600" />
          <span className="flex-1 ms-3 whitespace-nowrap"> My Reviews </span>
          <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
       </NavLink>
    </li>
    
 
 </ul>
   }

    {/* admin routes  */}
    {
        user.role === 'admin' &&
        <ul className="space-y-2 font-medium">
         
         
         <li>
            <NavLink to="/dashboard/statistics" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <SiSimpleanalytics size={23} className="text-gray-600" />
               <span className="flex-1 ms-3 whitespace-nowrap"> Statistics </span>
               
            </NavLink>
         </li>
         <li>
            <NavLink to="/dashboard/all-parcels" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <FaThList size={23} className="text-gray-600" />
               <span className="flex-1 ms-3 whitespace-nowrap"> All Parcels</span>
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
            </NavLink>
         </li>

         <li>
            <NavLink to="/dashboard/all-users" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <HiUsers size={23} className="text-gray-600" />
               <span className="flex-1 ms-3 whitespace-nowrap"> All Users </span>
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
            </NavLink>
         </li>

         <li>
            <NavLink to="/dashboard/all-delivery-man" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <PiUsers size={23} className="text-gray-600" />
               <span className="flex-1 ms-3 whitespace-nowrap"> All Delivery Man</span>
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
            </NavLink>
         </li>
         
      
      </ul>
    }

   </div>
</aside>

    </section>

    <section className="p-20">
    <Toaster/>
    <Outlet/>
    </section>

    </>
  )
}
