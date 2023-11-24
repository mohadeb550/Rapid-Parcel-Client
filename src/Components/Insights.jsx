

import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export default function Insights() {

    // const { data: specialMenus, isLoading } = useQuery({
    //     queryKey:['specialMenu'],
    //     queryFn: async () => {
    //      const data = await axios.get(`https://savorspot-cafe-server.vercel.app/special-menu`);
    //       return data.data;
    //     }
    //   })


  return (
    <section className="my-14 mt-8 lg:my-20">
     <h1 className="text-[30px] md:text-3xl lg:text-[40px] text-[#014BA0] text-center font-racing mb-8 " > Rapid Parcel Insights </h1>

     <section className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-7  mb-8 md:mb-12 px-8 md:px-0">

     <div className="block rounded-md w-full bg-white shadow-xl dark:bg-neutral-700 font-play">
   <div className="p-6 pb-4 flex items-center justify-center dz-media">
   <img className="border-b w-48 h-48 object-contain "  src='/pngwing.com (21).png' />
   </div>
  
  <div className="p-6 pt-0">
    <h5
      className="mb-4 text-2xl font-semibold leading-tight text-amber-500 dark:text-neutral-50 text-center">
   <span className="text-3xl text-[#014BA0] font-racing"> 720</span> Parcel Booked!
    </h5>
  


   <div className="flex gap-3 flex-grow">


 
   </div>
  </div>
</div>

     <div className="block rounded-md w-full bg-white shadow-xl dark:bg-neutral-700 font-play">
   <div className="p-6 pb-4 flex items-center justify-center dz-media">
   <img className="border-b w-48 h-48 object-contain "  src='/pngwing.com (19).png' />
   </div>
  
  <div className="p-6 pt-0">
    <h5
      className="mb-4 text-2xl font-semibold leading-tight text-amber-500 dark:text-neutral-50 text-center">
  <span className="text-3xl text-[#014BA0] font-racing">1340</span> Parcel Delivered!
    </h5>
  
  

   <div className="flex gap-3 flex-grow">

    
  
 
   </div>
  </div>
</div>

     <div className="block rounded-md w-full bg-white shadow-xl dark:bg-neutral-700 font-play">
   <div className="p-6 pb-4 flex items-center justify-center dz-media">
   <img className="border-b w-48 h-48 object-contain "  src='/pngwing.com (20).png' />
   </div>
  
  <div className="p-6 pt-0">
    <h5
      className="mb-4 text-2xl font-semibold leading-tight text-amber-500 dark:text-neutral-50 text-center">
    Our <span className="text-3xl text-[#014BA0] font-racing"> 3200</span> Users!
    </h5>
  
    


   <div className="flex gap-3 flex-grow">


  
 
   </div>
  </div>
</div>


        </section> 
    </section>
  )
}