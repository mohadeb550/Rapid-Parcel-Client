
import { useState } from "react";
import SearchResultBox from "./SearchResultBox";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from '../Hooks/useAuth'


export default function Banner() {
  const [ searchValue, setSearchValue] = useState('');
  const axiosSecure = useAxiosSecure()
  const { currentUser } = useAuth()
  

  const { data: searchedParcels =[], isLoading, refetch } = useQuery({
    queryKey: ['search-parcels', searchValue],
    queryFn: async () => {
     
      const data = await axiosSecure.get(`/get-search-parcels?email=${currentUser.email}&text=${searchValue}`);
      return data.data;
    }
  })

  
    return (
     <div  className="hero h-[480px] lg:h-[500px] mb-3 md:mb-8 font-play flex flex-col md:flex-row justify-around items-center bg-[#014BA0]  px-10 md:px-16 md:pb-12" >

<div className="flex-1 h-full w-full pt-6 md:pt-14">
        <img src="Untitled-15.jpg" className=" rounded-full h-[200px] md:h-full w-full object-cover" />
    </div>
    
    <div className=" text-center text-neutral-content flex-1">
      <div className="max-w-4xl space-y-2 lg:space-y-5">
        <h1 className=" text-4xl lg:text-7xl font-bold font-racing text-amber-400"> Always Ready For Delivery</h1>
        <p className="text-xs md:text-base italic text-white/80"> Welcome to Rapid Parcel - Your Swift and Reliable Parcel Delivery Partner!
Experience the ease of seamless shipping with Rapid Parcel.</p>
        
  <div className='max-w-md mx-auto relative'>
      <div className="relative flex items-center md:w-60 lg:w-full mx-auto h-[40px] lg:h-12 rounded-t-md focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
          </div>
  
          <input onChange={(e) => setSearchValue(e.target.value)}
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
          type="text"
          id="search"
          placeholder="Search Your Parcel For Status..." /> 
      </div>

      {/* search result box  */}
     {searchValue && <SearchResultBox searchedParcels={searchedParcels} />}
  </div>
      </div>
    </div>

  </div>
    )
  }
  