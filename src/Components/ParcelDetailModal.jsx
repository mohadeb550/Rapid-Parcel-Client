import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import CountUp from "react-countup";


export default function ParcelDetailModal ({ setIsOpen,  parcelId}) {

    const axiosSecure = useAxiosSecure();

    const { data: parcel = {} } = useQuery({
        queryKey: ['singleParcel'],
        queryFn : async () => {
    
          const res = await axiosSecure.get(`/parcel/${parcelId}`);
          return res.data;
        }
      })
    
      console.log(parcel)

  return (

    <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50  bg-black/30 flex justify-center items-center">
       
       <div className="w-[400px] md:w-[500px] p-7 bg-white rounded-2xl" >

    {/* detail section  */}
        <section>
        <div className="block rounded-md w-full font-play">
     <div className="p-6 pb-4 flex items-center justify-center dz-media">
     <img className="border-4 border-amber-400 w-28 h-28 md:w-44 md:h-44 object-contain rounded-full  p-1 shadow-2xl"  src={parcel.product_img} />
     </div>
    
    <div className="p-6 pt-0 ">
      <h5
        className="mb-4 text-2xl font-semibold leading-tight text-neutral-400 dark:text-neutral-50 text-center">
    {parcel.parcel_type}
      </h5>

       <h5
      className="mb-4 text-[20px] flex items-center justify-center gap-2 font-semibold leading-tight text-gray-500 italic dark:text-neutral-50 text-center font-prompt "> COST : 
   <span className="text-4xl text-amber-400 font-racing not-italic"> <CountUp end={parcel.cost} duration={2} /></span> 
    </h5>

    <div className="flex gap-3 items-center justify-center">
      <span className='text-orange-400 text-xl font-prompt'> Booking Date :  {parcel.booking_date}</span>
    </div>
    
    <div className="flex gap-3 items-center justify-center">
      <span className='text-orange-400 text-xl font-prompt'> Status :  {parcel.status}</span>
    </div>
    
  
     <div className="flex gap-3 flex-grow">
  
  
   
     </div>
    </div>
  </div>
        </section>


<button onClick={() => setIsOpen(false)} className="text-white bg-black/80 hover:bg-black/70 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm mt-2 md:ml-3  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Close </button>
</div>
       
       </section>

  )
}
