import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { axiosPublic } from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";
import Rating from "react-rating";
import { useState } from "react";
import { IoMdStarOutline } from "react-icons/io";
import { IoMdStar } from "react-icons/io";



export default function ManageReview({ open, setOpen, deliveryManId}) {
    const axiosSecure = useAxiosSecure();
    const { currentUser } = useAuth();
    const [rating, setRating] = useState(0);

    const handleRatingChange = (value) => {
        setRating(value);
      };

    const handleSubmit = async (e) => {
        e.preventDefault()
          const form = e.target;

        const reviewInfo = {
          name: currentUser.displayName,
          email:currentUser.email,
          image: currentUser.photoURL,
          review_date: new Date().toLocaleDateString(),
          rating: rating,
          feedback_title: form.feedback_title.value,
          feedback_description: form.feedback_description.value,
          deliveryManId
      }

    axiosSecure.put(`/save-review`, reviewInfo)
          .then(res => {
            console.log(res)
            if(res.data.matchedCount || res.data.modifiedCount || res.data.upsertedCount){
              setOpen(false);
              toast.success('Thanks For A Review😋😊!', {duration: 3000})
            }
          }).catch(error => {
            toast.error('Something Went Wrong, Try Again', {duration: 3000})
          })
      
 }
   
  return (
  
    <section className="flex justify-end items-center gap-1 font-play">
      {/* custom modal  */}
       {open && <section className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50  bg-black/20 flex justify-center items-center">
       
       <form className="w-[400px] md:w-[500px] p-7 bg-white" onSubmit={handleSubmit}>
       <h2 className="text-center my-2 text-3xl text-gray-500 font-racing"> Leave A Review!</h2>
        <div className="flex justify-center items-center">
          <img className="md:w-44 w-32 object-cover h-32 md:h-44 rounded-full" src={currentUser.photoURL} />
        </div>

<div className="relative z-0 w-full mb-5 group">
    <input type="text"   className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={currentUser.displayName} placeholder=" "  />
    <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Name </label>
    
</div>
<div className="relative z-0 w-full mb-5 group">
    <input type="text"  id="floating_repeat_password" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={deliveryManId} placeholder=" " />
    <label  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Delivery Man Id </label>
    
</div>
<div className="flex flex-col ">
    <label> Feedback Title</label>
    <textarea name="feedback_title" className="outline-none border rounded my-2" rows={1} />
    <label> Feedback Description  </label>
    <textarea name="feedback_description" className="outline-none border rounded my-2" />
</div>
        <div className="my-2 text-3xl text-[#014BA0]">
        <Rating
            initialRating={rating}
            emptySymbol={<IoMdStarOutline/>}
            fullSymbol={<IoMdStar/>}
            onChange={handleRatingChange}
          />
        </div>



<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Submit</button>
<button onClick={() => setOpen(!open)} className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mt-2 md:ml-3  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Close </button>
</form>
       
       </section>
}
    </section>
  )
}
