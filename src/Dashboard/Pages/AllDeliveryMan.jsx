

import { Helmet } from "react-helmet";
import useAllDeliveryMan from "../../Hooks/useAllDeliveryMan";
import Rating from "react-rating";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { RotatingTriangles } from "react-loader-spinner";



export default function AllDeliveryMan() {


    const { allDeliveryMan , isLoading } = useAllDeliveryMan();


  return (
   <section className="max-w-[1300px] mx-auto px-4 my-2 md:my-6 lg:my-10 mb-10"> 
      <Helmet>
        <title>  Rapid Parcel / All Delivery Man </title>
      </Helmet>

   <div className="flex justify-center items-center mb-6">
   <h2 className="text-2xl md:text-3xl font-extrabold text-[#014BA0] font-play"> All Delivery Man </h2>
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
               Image
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
               Name
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Phone Number
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Total Delivered
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Total Reviews
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Average Review
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
          
          {allDeliveryMan?.map(man =>  <tr key={man._id} className="border-b dark:border-neutral-500">
              <td
                className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 flex items-center justify-center">
                <img src={man.image} className="w-[52px] h-[52px] md:w-24 md:h-24 object-contain" />
              </td>
              <td
                className=" border-r font-medium text-sm md:text-lg  text-gray-600 text-start md:text-center px-6 py-4 dark:border-neutral-500">
                {man.name}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
                {man?.phone}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
               { man.total_delivered && <span className="p-2 px-6 bg-green-600 text-gray-100 rounded-full">  {man?.total_delivered}</span>}
              </td>
              <td
                className="whitespace-nowrap font-medium text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
               {man.totalReviews? <span className="p-2 px-6 bg-slate-200 rounded-full">  {man?.totalReviews}</span>: ''}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
                    {man.avg_review && <><div className="my-2 text-2xl text-orange-400">
        <Rating
            initialRating={man?.avg_review}
            emptySymbol={<IoMdStarOutline/>}
            fullSymbol={<IoMdStar/>}
          />
        </div>
              <span className="text-gray-500">  ( {man?.avg_review} )</span></>}
              </td>
            
            </tr>)}
         
          </tbody>
        </table>
        {!allDeliveryMan?.length && <p className="text-xl text-center mt-44 text-gray-500"> No Parcels  </p>}
      </div>
    </div>
  </div>
</div>

   </section>
  )
}

