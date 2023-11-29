
import { Helmet } from "react-helmet";
import useAllUsers from "../../Hooks/useAllUsers";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { RotatingTriangles } from "react-loader-spinner";



export default function AllUsers() {

    const axiosSecure = useAxiosSecure()

    // pagination state 
    const [ totalUsers, setTotalUsers ] = useState(0);
    const [ userPerPage , setUserPerPage ] = useState(5);
    const [ totalPage , setTotalPage ] = useState(0);
    const [ currentPage , setCurrentPage ] = useState(0);
    const [ pageArray, setPageArray ] = useState([])

    const { allUsers=[], total , isLoading, refetch } = useAllUsers(currentPage * userPerPage, userPerPage);



    useEffect(()=>{
      refetch();
        setTotalUsers(total)
      if(totalUsers){
          setTotalPage(Math.ceil(totalUsers / userPerPage));

          let pgsArray = [];

          for(let i = 0; i < totalPage; i++){
              pgsArray.push(i)
          }
          setPageArray([...pgsArray])
      }   
  },[ allUsers, totalUsers, userPerPage, totalPage, currentPage, total, refetch])




    const handleRole = (email, role) => {

      const updateUserRole = { 'role': role}

        axiosSecure.patch(`/users/${email}`, updateUserRole )
        .then(res => {
          console.log(res.data)
      if(res.data.modifiedCount || res.data.matchedCount){

        refetch();
        let timerInterval;
        Swal.fire({
          title: "Role Updating...",
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        })
      }
    }).catch(error => {
      toast.error('Something Went Wrong, Try Again', {duration: 3000})
    })
    }

  return (
   <section className="max-w-[1300px] mx-auto px-4 my-2 md:my-6 lg:my-10 mb-10"> 
      <Helmet>
        <title>  Rapid Parcel / All Users </title>
      </Helmet>

   <div className="flex justify-center items-center mb-6">
   <h2 className="text-2xl md:text-3xl font-extrabold text-[#014BA0] font-play"> All Users </h2>
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
            Number of parcel booked
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Total Spent
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Role
              </th>
              <th
                scope="col"
                className="border-r px-6 py-0 md:py-2 lg:py-4 dark:border-neutral-500">
            Action
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
          
          {allUsers?.map(user =>  <tr key={user._id} className="border-b dark:border-neutral-500">
              <td
                className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 flex items-center justify-center">
                <img src={user.image} className="w-[52px] h-[52px] md:w-24 md:h-24 object-contain" />
              </td>
              <td
                className=" border-r font-medium text-sm md:text-lg  text-gray-600 text-start md:text-center px-6 py-4 dark:border-neutral-500">
                {user.name}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
                {user?.phone}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
                {user?.totalBooking}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
               {user?.my_parcels.reduce((previousValue, currentValue) => previousValue + currentValue?.cost , 0)}
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500 capitalize">
                 {user.role === 'user'?  <button className="bg-violet-700 p-1 px-2 md:py-2 md:px-4 text-white rounded font-semibold transition-all hover:bg-violet-800 text-[12px] md:text-base " onClick={() => handleRole(user.email, 'delivery-man')} > 
                 Make Delivery Man</button> : user.role }
              </td>
              <td
                className="whitespace-nowrap font-medium  text-sm md:text-lg border-r px-6 py-4 dark:border-neutral-500">
                {
                  user.role === 'admin'? '' :  <button className="bg-zinc-800 p-1 px-2 md:py-2 md:px-4 text-white rounded font-semibold transition-all hover:bg-zinc-700 text-[12px] md:text-base "  onClick={() => handleRole(user.email, 'admin')} > 
                  Make Admin </button>
                }
              </td>
            
            </tr>)}
         
          </tbody>
        </table>
        {!allUsers?.length && <p className="text-xl text-center mt-44 text-gray-500"> No Users  </p>}
      </div>
    </div>
  </div>
</div>

<div className="mt-7">

{totalUsers > 5 && <Pagination pageArray={pageArray} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
</div>

   </section>
  )
}

