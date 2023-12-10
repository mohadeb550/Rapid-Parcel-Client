import Swal from "sweetalert2";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAllParcels from "../../Hooks/useAllParcels";
import useAllDeliveryMan from "../../Hooks/useAllDeliveryMan";



export default function ManageParcel({ open, setOpen, parcelId, receiverEmail, parcelName}) {
  console.log(receiverEmail)

    const axiosSecure = useAxiosSecure();
    const { allParcels , refetch} = useAllParcels();
    const { allDeliveryMan , isLoading } = useAllDeliveryMan();



  const handleSubmit = (e) => {
    e.preventDefault();

    const deliveryManId = e.target.delivery_man.value;
    const approx_date = e.target.approx_date.value;
    const updateParcel = { status: 'on-the-way' , delivery_man_id: deliveryManId, approx_date }

    axiosSecure.patch(`/update/${parcelId}`, updateParcel )
    .then(res => {
      if(res.data.modifiedCount || res.data.matchedCount){

        const notification = {
          receiverEmail,  
          title: `Your parcel "${parcelName}" is on-the-way`,
          parcelName,
          isRead: false,
          date: new Date(),
        }
        axiosSecure.post('/insert-notification', notification )
        .then(res =>{
          if(res.data._id){
            setOpen(false);
            refetch();

            Swal.fire({
              title: "Delivery Man Assigned!",
              text: "The Parcel Is On The Way!.",
              icon: "success"
            });
          }
        })
      }
    }).catch(error => {
      toast.error('Something Went Wrong, Try Again', {duration: 3000})
      console.log(error)
    })
  }



  return (
    <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50  bg-black/10 flex justify-center items-center">

      
       
       <form className="w-[400px] md:w-[500px] p-7 bg-white" onSubmit={handleSubmit}>

       <div className="flex flex-col justify-end my-6 gap-3 px-5 md:px-0">
        <label className="text-[#014BA0] font-semibold text-xl"> Select Delivery Man </label>
          <select className=" w-full outline p-2 outline-black/10 rounded-sm outline-1 " name="delivery_man">
          {allDeliveryMan?.map(man =>  <option key={man._id} value={man._id}> {man.name} </option>)}
              
        </select>
        <label className="text-left text-gray-700"> Approximate Delivery Date :  </label>
        <input type="date" className="border p-1" name="approx_date" required />
        </div>


<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 block md:inline"> Assign</button>
<button onClick={() => setOpen(!open)} className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-2 md:ml-3  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Close </button>
</form>
       
       </section>
  )
}
