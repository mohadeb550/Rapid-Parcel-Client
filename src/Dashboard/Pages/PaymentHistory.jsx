

import { Helmet } from "react-helmet";
import Rating from "react-rating";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { RotatingTriangles } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import useAuth from '../../Hooks/useAuth'


export default function PaymentHistory() {
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth();

  const { data: payments =[], isLoading } = useQuery({
    queryKey: ['payment-history'],
    queryFn: async () => {
      const data = await axiosSecure.get(`/get-payment-history/${currentUser.email}`);
      return data.data;
    }
  })


  return (
   <section className="max-w-[1300px] mx-auto px-4 my-2 md:my-6 lg:my-10 mb-10"> 
      <Helmet>
        <title>  Rapid Parcel / Payment History </title>
      </Helmet>

   <div className="flex justify-center items-center mb-6">
   <h2 className="text-2xl md:text-3xl font-extrabold text-gray-500 font-play"> Your Payment History </h2>
   </div>



<div className="flex flex-col font-play">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table
          className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr className="bg-gray-500 h-8 text-white/95 text-[12px] md:text-base">
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
               Image
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
               Parcel
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Cost
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Payment Date
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Transaction Id
              </th>
              
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
          
          {payments?.map(history =>  <tr key={history._id} className="border-b dark:border-neutral-500">
              <td
                className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 flex items-center justify-center">
                <img src={history.parcelInfo.product_img} className="w-[52px] h-[52px] md:w-24 md:h-24 object-contain" />
              </td>
              <td
                className=" border-r font-medium text-sm md:text-lg  text-gray-600 text-start md:text-center px-6 py-4 dark:border-neutral-500">
                {history.parcelInfo.parcel_type}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
                {history.price}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
               {history.date}
              </td>
              <td
                className="whitespace-nowrap font-medium text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
               {history.transactionId}
              </td>
             
            
            </tr>)}
         
          </tbody>
        </table>
        {!payments?.length && <p className="text-xl text-center mt-44 text-gray-500"> No History  </p>}
      </div>
    </div>
  </div>
</div>

   </section>
  )
}

