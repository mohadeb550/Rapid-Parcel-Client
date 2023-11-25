
import {  useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import { Link} from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import UpdateParcel from "./UpdateParcel";



export default function MyParcels() {

  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] , isLoading} = useQuery({
    queryKey: ['my-parcels'],
    queryFn : async () => {

      const res = await axiosSecure.get(`/my-parcels?email=${currentUser.email}`);
      return res.data;
    }
  })



  return (
   <section className="max-w-[1300px] mx-auto px-4 my-2 md:my-6 lg:my-10 mb-10"> 

   
      <Helmet>
        <title>  Rapid Parcel / My Parcels </title>
      </Helmet>

   <div className="flex justify-center items-center mb-6">
   <h2 className="text-2xl md:text-3xl font-extrabold text-[#014BA0] font-play"> Your Booked Parcels </h2>
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
               Product Image
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
               Parcel Type
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Requested Delivery Date
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Approximate Delivery Date
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Booking Date
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Delivery Man ID
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Booking Status
              </th>
              <th scope="col" className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500"> Action </th>
              <th scope="col" className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500"> Action </th>
              <th scope="col" className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500"> Payment </th>
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
          
          {parcels?.map(parcel =>  <tr key={parcel._id} className="border-b dark:border-neutral-500">
              <td
                className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 flex items-center justify-center">
                <img src={parcel.product_img} className="w-[52px] h-[52px] md:w-24 md:h-24 object-contain" />
              </td>
              <td
                className=" border-r font-medium text-sm md:text-lg  text-gray-600 text-start md:text-center px-6 py-4 dark:border-neutral-500">
                {parcel.parcel_type}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
                {parcel.req_date}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
                {parcel?.approx_date}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
                {parcel.booking_date}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
                {parcel?.delivery_man_id}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
                {parcel.status}
              </td>
              <td className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
             
             <Link to={`/dashboard/update-parcel/${parcel._id}`}>
             <button className={`bg-sky-600 p-1 px-2 md:py-2 md:px-4 text-white rounded font-semibold transition-all hover:bg-sky-700 text-[12px] md:text-base disabled:bg-gray-200 disabled:text-gray-400`} disabled={parcel.status !== 'pending'}  > 
             Update </button>
             </Link>
    
               </td>
              

              <td className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">

             {parcel.status === 'delivered' ?  <Link to={`/update-food/`}>
              <button className="bg-purple-700 p-1 px-2 md:py-2 md:px-4 text-white rounded font-semibold transition-all hover:bg-purple-800 text-[12px] md:text-base " > 
             Give Review </button>
             </Link> : 
             
             <Link to={`/update-food/`}>
              <button className="bg-red-600 p-1 px-2 md:py-2 md:px-4 text-white rounded font-semibold transition-all hover:bg-red-700 text-[12px] md:text-base disabled:bg-gray-200 disabled:text-gray-400" disabled={parcel.status !== 'pending'}> 
             Cancel </button>
             </Link>
             }
               </td>

              <td className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
            {
                parcel.payment === 'due'? 
                <Link to={`/update-food/`}>
                <button className="bg-green-600 p-1 px-2 md:py-2 md:px-4 text-white rounded font-semibold transition-all hover:bg-green-700 text-[12px] md:text-base " > 
               Pay </button>
               </Link> : 'Paid'
            }
               </td>
            </tr>)}
         
          </tbody>
        </table>
        {!parcels?.length && <p className="text-xl text-center mt-44 text-gray-500"> No Booking  </p>}
      </div>
    </div>
  </div>
</div>

   </section>
  )
}

