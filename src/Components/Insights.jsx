

import { useQuery } from "@tanstack/react-query";
import CountUp from 'react-countup';
import useAxiosPublic from '../Hooks/useAxiosPublic'



export default function Insights() {
  const axiosPublic = useAxiosPublic();

    const { data: insights = {} } = useQuery({
        queryKey:['insights'],
        queryFn: async () => {
         const data = await axiosPublic.get('/insights');
          return data.data;
        }
      })

      const { totalBookedParcels, totalDeliveredParcels, totalUsers} = insights;

  return (
    <section className="my-20 lg:my-40">
     <h1 className="text-[25px] md:text-3xl lg:text-[35px] italic text-[#014BA0] text-center font-prompt font-bold mb-8 md:mb-12 " > Rapid Parcel <span className="text-amber-500">Insights</span> </h1>

     <section className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-7  mb-8 md:mb-12 px-8 md:px-0">

     <div className="block rounded-md w-full bg-white shadow-xl dark:bg-neutral-700 font-play">
   <div className="p-6 pb-4 flex items-center justify-center dz-media">
   <img className="border-b w-48 h-48 object-contain "  src='/pngwing.com (21).png' />
   </div>
  
  <div className="p-6 pt-0">
    <h5
      className="mb-4 text-2xl font-semibold font-prompt leading-tight text-amber-500 dark:text-neutral-50 text-center">
   <span className="text-3xl text-[#014BA0] font-racing"> <CountUp end={totalBookedParcels} duration={4} /></span> Parcel Booked!
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
      className="mb-4 text-2xl font-semibold  font-prompt leading-tight text-amber-500 dark:text-neutral-50 text-center">
  <span className="text-3xl text-[#014BA0] font-racing"><CountUp end={totalDeliveredParcels} duration={4} /></span> Parcel Delivered!
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
      className="mb-4 text-2xl font-semibold font-prompt  leading-tight text-amber-500 dark:text-neutral-50 text-center">
    Our <span className="text-3xl text-[#014BA0] font-racing"> <CountUp end={totalUsers} duration={4} /></span> Users!
    </h5>
  
    


   <div className="flex gap-3 flex-grow">


  
 
   </div>
  </div>
</div>


        </section> 
    </section>
  )
}