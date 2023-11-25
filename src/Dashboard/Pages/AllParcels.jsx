
import { Link} from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAllParcels from "../../Hooks/useAllParcels";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useState } from "react";
import ManageParcel from "../../Components/Shared/MangeParcel";



export default function AllParcels() {

  const axiosSecure = useAxiosSecure()
  const [ isOpen ,setIsOpen ] = useState(false);

    const { allParcels , refetch, isLoading } = useAllParcels();




  return (
   <section className="max-w-[1300px] mx-auto px-4 my-2 md:my-6 lg:my-10 mb-10"> 

   
      <Helmet>
        <title>  Rapid Parcel / My Parcels </title>
      </Helmet>

   <div className="flex justify-center items-center mb-6">
   <h2 className="text-2xl md:text-3xl font-extrabold text-[#014BA0] font-play"> All Parcels </h2>
   </div>

   <div className="flex justify-end my-6 gap-3 px-5 md:px-0">
          <select  className=" w-full max-w-xs outline p-2 outline-black/10 rounded-sm outline-1 ">
              <option disabled selected> Filter by Status</option>
               <option value=''> Random </option>
               <option value='pending'> Pending</option>
               <option value='on-the-way'> On the way</option>
               <option value='delivered'> Delivered</option>
               <option value='returned'> Returned</option>
               <option value='cancelled'> Cancelled</option>
        </select>
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

          {isLoading && <Oval
      height={50}
      width={50}
      color="rgb(101,163,13)"
      wrapperStyle={{}}
      wrapperClass="absolute top-[6%] md:top-[8%] left-2/4 mt-10"
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor="rgb(140,183,77)"
      strokeWidth={2}
      strokeWidthSecondary={2}
    
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
             
            
             <button onClick={() => setIsOpen(!isOpen)} className={`bg-amber-600 p-1 px-2 md:py-2 md:px-4 text-white rounded font-semibold transition-all hover:bg-amber-700 text-[12px] md:text-base disabled:bg-gray-200 disabled:text-gray-400`} > 
             Manage </button>
           {isOpen && <ManageParcel open={isOpen} setOpen={setIsOpen} parcelId={parcel._id} />}
    
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

