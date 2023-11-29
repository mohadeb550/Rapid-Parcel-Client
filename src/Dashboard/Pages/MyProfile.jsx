import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth"
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { RiEditBoxLine } from "react-icons/ri";
import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageUploadApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`

export default function MyProfile() {
    const axiosSecure = useAxiosSecure();
    const { currentUser, updateUserProfile } = useAuth();
    const [ open ,setOpen ] = useState(false);
    const axiosPublic = useAxiosPublic();


    const { data: userInfo = {} ,refetch} = useQuery({
        queryKey: ['single-user'],
        queryFn : async () => {
    
          const res = await axiosSecure.get(`/users/${currentUser.email}`);
          return res.data;
        }
      })


      const handleSubmit = async (e) => {

        let newImage = currentUser?.photoURL;

        e.preventDefault()
          const form = e.target;
          const rawImage = form.image.files[0];
          const imageData = { image: rawImage}

        if(rawImage){
          const res = await axiosPublic.post(imageUploadApi, imageData , {
            headers: {
              'content-type' : 'multipart/form-data'
            }
          });
           newImage =  res.data.data.display_url;
        }

        // update user info in firebase 
        const result = await updateUserProfile(form.name.value, newImage)
        
        
        const updatedInfo = {
          name: form.name.value,
          address : form.address.value,
          image: newImage
      }

    axiosSecure.patch(`/users/${currentUser.email}`, updatedInfo)
          .then(res => {
      
            if(res.data.modifiedCount || res.data.matchedCount){
              setOpen(false);
              toast.success('Profile Updated Successfully', {duration: 3000})
             refetch();
            }
          }).catch(error => {
            toast.error('Something Went Wrong, Try Again', {duration: 3000})
          })
      
 }
    



    
  return (
    <div className="p-4 xl:p-16 max-w-7xl mx-auto">

    <section className="flex justify-end items-center gap-1 font-play">
    <RiEditBoxLine className="text-blue-600" size={20}/>
    <button className="hover:underline" onClick={() => setOpen(!open)} > Update Your Profile </button>
      {/* custom modal  */}
       {open && <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50  bg-black/50 flex justify-center items-center">
       
       <form className="w-[400px] md:w-[500px] p-7 bg-white" onSubmit={handleSubmit}>

        <div className="flex justify-center items-center">
          <img className="md:w-44 w-32 object-cover h-32 md:h-44" src={userInfo.image} />
        </div>

<div className="relative z-0 w-full mb-5 group">
    <input type="text"  id="floating_repeat_password" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" defaultValue={userInfo.name} placeholder=" " name='name' />
    <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Name </label>
    
</div>
<div className="relative z-0 w-full mb-5 group">
    <input type="text"  id="floating_repeat_password" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={userInfo.email} placeholder=" " name='email' />
    <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Email </label>
    
</div>
<div className="relative z-0 w-full mb-5 group">
    <input type="text"  id="floating_repeat_password" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" defaultValue={userInfo?.address} placeholder=" " name='address' />
    <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Your Address </label>
    
</div>


<div className="mb-3">
    <label className="text-lg text-gray-600"> Change Photo </label>
      <input name="image"
    className="relative m-0 block mt-1 w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-400 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
    type="file"
    id="formFileMultiple"
    multiple />
    </div>



<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Update Changes</button>
<button onClick={() => setOpen(!open)} className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-2 md:ml-3  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Close </button>
</form>
       
       </section>
}
    </section>

    <div className="p-8 bg-white shadow mt-24">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="grid grid-cols-3 text-center order-last md:order-first mt-6 md:mt-0">
          <div>
            <p className="font-bold text-gray-700 text-xl">22</p>
            <p className="text-gray-400">Friends</p>
          </div>
          <div>
               <p className="font-bold text-gray-700 text-xl">10</p>
            <p className="text-gray-400">Photos</p>
          </div>
              <div>
               <p className="font-bold text-gray-700 text-xl">89</p>
            <p className="text-gray-400">Comments</p>
          </div>
        </div>
        <div className="relative">
          <div className=" w-32 h-32 xl:w-48 xl:h-48 border-2 p-1   mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img src={userInfo.image} className="w-full h-full rounded-full object-cover" />
          </div>
        </div>
    
        <div className="space-x-8 flex justify-between mt-10 md:mt-0 md:justify-center">
    <button
      className="text-white text-sm xl:text-base py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
    >
      Connect
    </button>
        <button
      className="text-white text-sm xl:text-base py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
    >
      Message
    </button>
        </div>
      </div>
    
      <div className="mt-20 text-center border-b pb-12">
        <h1 className="text-4xl font-medium text-gray-700"> {userInfo.name} </h1>
        <p className="font-light text-gray-600 mt-3"> {userInfo.address? userInfo.address : 'Your Address Here'}  </p>
    
        <p className="mt-2 text-gray-500"> User Id : {userInfo._id}</p>
        <p className="mt-8 text-gray-500"> Email - {userInfo.email}</p>
        <p className="mt-1 text-gray-500 capitalize"> Role - {userInfo.role}</p>
      </div>
    
      <div className="mt-12 flex flex-col justify-center">
        <p className="text-gray-600 text-center font-light lg:px-16">An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.</p>
        <button
      className="text-indigo-500 py-2 px-4  font-medium mt-4"
    >
      Show more
    </button>
      </div>
    
    </div>
    </div>
  )
}
