
import { Helmet } from "react-helmet";
import useAllParcels from "../../Hooks/useAllParcels";
import { useEffect, useState } from "react";
import ManageParcel from "../../Components/Shared/MangeParcel";
import { MdOutlineDateRange } from "react-icons/md";

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import ManageDateModal from "../ManageDateModal";
import { RotatingTriangles } from "react-loader-spinner";



export default function AllParcels() {

  const [ parcelId ,setParcelId ] = useState('');
  const [ notificationReceiver, setNotificationReceiver ] = useState('');
  const [ parcelName, setParcelName ] = useState('');
  const [ isOpen ,setIsOpen ] = useState(false);
  const [ openDate, setOpenDate ] = useState(false);

    // date 
    const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 30),
        key: 'selection'
      }
    ]);

    const { allParcels , isLoading, refetch } = useAllParcels(state[0].startDate, state[0].endDate );

    useEffect(()=>{
      refetch()
    },[state, isOpen, openDate])


  return (
   <section className="max-w-[1300px] mx-auto px-4 my-2 md:my-6 lg:my-10 mb-10 font-prompt"> 

   
      <Helmet>
        <title>  Rapid Parcel / My Parcels </title>
      </Helmet>


   <div className="flex justify-center items-center mb-6">
   <h2 className="text-2xl md:text-3xl font-prompt font-semibold text-[#014BA0] "> All Parcels </h2>
   </div>

   <div className="flex justify-end items-center my-2 md:my-4">
      <button onClick={() => setOpenDate(true)} className="bg-black/5 text-gray-600 text-xs md:text-base rounded-sm hover:bg-black/10  p-2 font-semibold flex items-center gap-2" > <MdOutlineDateRange size={24}/> Filter By Requested Delivery Date </button>
    {openDate && <ManageDateModal openDate={openDate} setOpenDate={setOpenDate} state={state} setState={setState} />}

    </div>


<div className="flex flex-col font-play">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table
          className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr className="bg-[#014BA0] h-8 text-white/95 text-[12px] md:text-base">
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
               Parcel
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
               User
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            User Phone
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Booking Date
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Requested Delivery Date
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Cost
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
           Status
              </th>
              
              <th scope="col" className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500"> Action </th>
            </tr>
          </thead>
          <tbody className="relative">

          {isLoading && <RotatingTriangles
  visible={true}
  height="80"
  width="80"
  ariaLabel="rotating-triangels-loading"
  wrapperStyle={{}}
  wrapperClass="absolute top-[6%] md:top-[8%] left-2/4 mt-10"
/>}
          
          {allParcels?.map(parcel =>  <tr key={parcel._id} className="border-b dark:border-neutral-500">
              <td
                className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 flex items-center justify-center">
                <img src={parcel.product_img} className="w-[52px] h-[52px] md:w-24 md:h-24 object-contain" />
              </td>
              <td
                className=" border-r font-medium text-sm md:text-lg  text-gray-600 text-start md:text-center px-6 py-4 dark:border-neutral-500">
                {parcel.name}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
                {parcel.phone}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
                {parcel.booking_date}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
                {parcel.req_date}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
                {parcel.cost}
              </td>
              <td
                className="whitespace-nowrap font-semibold text-sm md:text-lg border-r px-6 py-4 text-[#014BAf] dark:border-neutral-500">
                {parcel.status}
              </td>
              
              <td className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
             
            
             <button onClick={() => {setParcelId(parcel._id); setNotificationReceiver(parcel.email); setParcelName(parcel.parcel_type); setIsOpen(!isOpen)}} className={`bg-amber-600 p-1 px-2 md:py-2 md:px-4 text-white rounded font-semibold transition-all hover:bg-amber-700 text-[12px] md:text-base disabled:bg-gray-200 disabled:text-gray-400`} > 
             Manage </button>
           {isOpen && <ManageParcel open={isOpen} setOpen={setIsOpen} parcelId={parcelId} receiverEmail={notificationReceiver} parcelName={parcelName} />}
    
               </td>
            
            </tr>)}
         
          </tbody>
        </table>
        {!allParcels?.length && <p className="text-xl text-center mt-44 text-gray-500"> No Parcels  </p>}
      </div>
    </div>
  </div>
</div>

   </section>
  )
}

