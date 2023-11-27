import { useLocation } from "react-router-dom"

export default function Banner() {

    const location = useLocation();

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
        
  <div className='max-w-md mx-auto'>
      <div className="relative flex items-center w-60 lg:w-full mx-auto h-[34px] md:h-10 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
          </div>
  
          <input 
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
          type="text"
          id="search"
          placeholder="Search .." /> 
      </div>
  </div>
      </div>
    </div>

  </div>
    )
  }
  