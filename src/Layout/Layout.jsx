import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "../Components/Shared/Navbar";



export default function Layout() {
  

  return (
    <section className="max-w-[1400px] mx-auto relative">
   <Toaster/>
    <Navbar/>
    <Outlet/>
   
    </section>
  )
}
