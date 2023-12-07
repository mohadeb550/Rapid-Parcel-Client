import { useState } from "react"
import { useForm } from "react-hook-form";
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";


const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageUploadApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

export default function AddParcel() {
    
    const axiosPublic = useAxiosPublic();
    const { currentUser } = useAuth()
    const [ total , setTotal ] = useState(0);
    const { register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const [ loading , setLoading ] = useState(false);


    const onSubmit = async (data) =>{
      setLoading(true)

        const imageData = { image: data.product_img[0] };

      const res = await axiosPublic.post(imageUploadApi, imageData, {
        headers: {
          'content-type' : 'multipart/form-data'
        }
      })
      const productImage =  res.data.data.display_url;
        

        const parcel = {
            name: currentUser.displayName,
            email:currentUser.email,
            phone: data.phone,
            parcel_type : data.parcel_type,
            weight: data.weight,
            product_img : productImage,
            receiver_name: data.receiver_name,
            receiver_phone: data.receiver_phone,
            delivery_address: data.delivery_address,
            req_date: data.req_date,
            booking_date: new Date().toLocaleDateString(),
            address_lat: data.address_lat,
            address_long: data.address_long,
            cost: total,
            payment: 'due',
            status: 'pending'
        }

        axiosPublic.post('/booking', parcel)
        .then(res => {
          console.log(res)
            if(res.data._id){
                toast.success('Booking Successful !',{duration:3000});
                setLoading(false)
              navigate('/dashboard/my-parcels');
            }
        }).catch(error =>{
            toast.error('Something Went Wrong. Please Try Again', {duration:3000})
        })
    }



    const calculateTotalCost = (e) => {
        
        const weight = parseInt(e.target.value);   
    
        if(isNaN(weight)){setTotal(0)}
        if(1 === weight){setTotal(50)}
        if(2 === weight){setTotal(100)}
        if(2 < weight){setTotal(150)}
      
    }

  return (
    <section className="max-w-4xl mx-auto xl:border rounded-md xl:shadow-lg xl:border-blue-600/10 py-5 md:py-10">

<div className="text-center lg:text-left mb-8">
        <h1 className="text-3xl lg:text-[40px] text-[#014BA0]  px-24 py-3 font-bold text-center font-play"> Book A Parcel</h1>
      </div>

<form className="max-w-3xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
  <div className="relative z-0 w-full mb-5 group">
      <input type="name"  id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  value={currentUser.displayName} />
      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name </label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="email"  id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={currentUser.email} />
      <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register('phone', {required: true})}/>
      <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
      <span className="text-red-600 font-semibold text-sm p-1"> {errors.phone?.type === 'required' && 'Phone is required'}  </span>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="text"  id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register('parcel_type', {required: true})} />
      <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Parcel Type</label>
       <span className="text-red-600 font-semibold text-sm p-1"> {errors.parcel_type?.type === 'required' && 'Parcel Type is required'}</span>
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="number"  id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register('weight', {required: true})}   onChange={calculateTotalCost} />
      <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Parcel Weight (KG)</label>
       <span className="text-red-600 font-semibold text-sm p-1">{errors.weight?.type === 'required' && 'Weight is required'} </span>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input type="text" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register('receiver_name', {required: true})} />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Receiver Name</label>
        <span className="text-red-600 font-semibold text-sm p-1">{errors.receiver_name?.type === 'required' && 'Receiver Name is required'} </span>
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register('receiver_phone', {required: true})} />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Receiver Phone Number</label>
        <span className="text-red-600 font-semibold text-sm p-1">{errors.receiver_phone?.type === 'required' && 'Receiver Phone is required'} </span>
    </div>
  </div>
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register('delivery_address', {required: true})} />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Delivery Address</label>
        <span className="text-red-600 font-semibold text-sm p-1">{errors.delivery_address?.type === 'required' && 'Delivery Address is required'} </span>
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="date" id="floating_company" className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register('req_date')} />
        <label  className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Requested Delivery Date </label>
    </div>
  </div>
  
  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register('address_lat', {required: true})} />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Delivery Address Latitude</label>
        <span className="text-red-600 font-semibold text-sm p-1">{errors.address_lat?.type === 'required' && 'Delivery Address Latitude is required'} </span>
    </div>
    <div className="relative z-0 w-full mb-5 group">
        <input type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "{...register('address_long', {required: true})} />
        <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Delivery Address Longitude </label>
        <span className="text-red-600 font-semibold text-sm p-1">{errors.address_long?.type === 'required' && 'Delivery Address Longitude is required'} </span>
    </div>
  </div>

  <div className="mb-3">
    <label className="text-sm text-gray-600"> Product Image</label>
      <input
    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-400 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
    type="file"
    id="formFileMultiple"
    multiple {...register('product_img',{required: true})} />
    <span className="text-red-600 font-semibold text-sm p-1">{errors.product_img?.type === 'required' && 'Product image is required'} </span></div>

  <div className="relative z-0 w-full mb-5 group">

      <input type="text" id="floating_phone" className="block py-2.5 px-0 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  value={`${total} TAKA`} />
      <label  className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6" > Total Cost</label>
  </div>


  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> {loading? <Oval
  height={28}
  width={28}
  color="#FEFEFD"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#1C427D"
  strokeWidth={4}
  strokeWidthSecondary={3}

/> : 'Book '} </button>
</form>

    </section>
  )
}
