
import { Oval } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import useAllDeliveryMan from "../../Hooks/useAllDeliveryMan";



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
            Total Delivery
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Average Review
              </th>
              
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
                {man?.total_delivered}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
                {man?.avg_review}
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

