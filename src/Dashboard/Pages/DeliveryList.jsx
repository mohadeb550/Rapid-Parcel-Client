
import {  useQuery } from "@tanstack/react-query";
import { Link} from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";



export default function DeliveryList() {

  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();


  const { data: deliveryLIst = [] , isLoading, refetch} = useQuery({
    queryKey: ['my-delivery-list'],
    queryFn : async () => {

      const res = await axiosSecure.get(`/my-delivery-list/${currentUser.email}`);
      return res.data[0].my_parcels;
    }
  })


  const handleCancel = (id) => {
    const updatedParcel = {
      status:'cancelled', 
  }
    Swal.fire({
      title: "Are you sure?",
      text: "You Cancel The Delivery?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {

      axiosSecure.patch(`/update/${id}`, updatedParcel)
    .then(res => {
      if(res.data.modifiedCount){
        Swal.fire({
          title: "Cancelled!",
          text: "You cancelled your delivery!",
          icon: "success"
        });
        refetch();
      }
    }).catch(error => {
      toast.error('Something Went Wrong, Try Again', {duration: 3000})
    })
    }
  });
}

  const handleDeliver = (id) => {
    const updatedParcel = {
      status:'delivered', 
  }
    Swal.fire({
      title: "Are you sure?",
      text: "You Delivered The Parcel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {

      axiosSecure.patch(`/update/${id}`, updatedParcel)
    .then(res => {
      if(res.data.modifiedCount){
        Swal.fire({
          title: "Delivered!",
          text: "You Delivered The Parcel 😜!",
          icon: "success"
        });
        refetch();
      }
    }).catch(error => {
      toast.error('Something Went Wrong, Try Again', {duration: 3000})
    })
    }
  });
}



  return (
   <section className="max-w-[1300px] mx-auto px-4 my-2 md:my-6 lg:my-10 mb-10"> 

   
      <Helmet>
        <title>  Rapid Parcel / My Delivery List </title>
      </Helmet>

   <div className="flex justify-center items-center mb-6">
   <h2 className="text-2xl md:text-3xl font-extrabold text-[#014BA0] font-play"> Your Delivery List </h2>
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
               Booked User
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Receiver Name
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Booked User Phone
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
           Receiver Phone
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
           Receiver Address
              </th>
             
              <th scope="col" className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500"> Action </th>
              <th scope="col" className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500"> Cancel </th>
              <th scope="col" className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500"> Delivery </th>
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
          
          {deliveryLIst?.map(parcel =>  <tr key={parcel._id} className="border-b dark:border-neutral-500">
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
                {parcel.receiver_name}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
                {parcel.phone}
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
                className="whitespace-nowrap   text-sm md:text-lg border-r px-6 py-4 text-[#014BAf] dark:border-neutral-500">
                {parcel.receiver_phone}
              </td>
              <td
                className="whitespace-nowrap   text-sm md:text-lg border-r px-6 py-4 text-[#014BAf] dark:border-neutral-500">
                {parcel.delivery_address}
              </td>
              <td className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
             
             <Link to={`/dashboard/update-parcel/${parcel._id}`}>
             <button className={`bg-gray-200 p-1 px-2 md:py-2 md:px-4 text-gray-600 rounded font-semibold transition-all hover:bg-sky-700 hover:text-gray-200 text-[12px] md:text-base disabled:bg-gray-200 disabled:text-gray-400`}  > 
             View Location </button>
             </Link>
    
               </td>
              

              <td className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
              <button onClick={() => handleCancel(parcel._id)} className="bg-red-600 p-1 px-2 md:py-2 md:px-4 text-white rounded font-semibold transition-all hover:bg-red-700 text-[12px] md:text-base disabled:bg-gray-200 disabled:text-gray-400" disabled={parcel.status === 'cancelled' || parcel.status === 'delivered'} > 
             Cancel </button>
             
               </td>

              <td className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
            {
                parcel.status === 'delivered'? 'Delivered' :
                <button onClick={() => handleDeliver(parcel._id)} className="bg-green-600 p-1 px-2 md:py-2 md:px-4 text-white rounded font-semibold transition-all hover:bg-green-700 text-[12px] md:text-base disabled:bg-gray-200 disabled:text-gray-400 " disabled={parcel.status === 'cancelled'} > 
               Deliver </button>
                
            }
               </td>
            </tr>)}
         
          </tbody>
        </table>
        {!deliveryLIst?.length && <p className="text-xl text-center mt-44 text-gray-500"> No Delivery yet. </p>}
      </div>
    </div>
  </div>
</div>

   </section>
  )
}

