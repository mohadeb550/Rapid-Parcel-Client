import CountUp from 'react-countup';
import Rating from 'react-rating';
import { BsStar, BsStarFill } from 'react-icons/bs'
import useAllDeliveryMan from '../Hooks/useAllDeliveryMan';


export default function TopDeliveryMen() {

  const { allDeliveryMan , isLoading } = useAllDeliveryMan();

    return (
      <section className="my-24 mt-32 lg:my-44">
       <h1 className="text-[25px] md:text-3xl lg:text-[35px] font-bold italic text-[#014BA0] text-center font-prompt mb-3 md:mb-6 " > Meet Our Top Delivery Team </h1>
       <p className="text-center mb-10 text-gray-500 max-w-5xl mx-auto px-4 font-play">
       At Rapid Parcel, our commitment to exceptional service goes hand in hand with the dedication of our top delivery professionals.</p>

  
       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-7  mb-8 md:mb-12 px-8 md:px-0">
  {/* card */}

      {allDeliveryMan?.map(topMan =>  <div key={topMan._id} className="block rounded-md w-full border bg-[#014BA0] border-[#014BA0]/10 dark:bg-neutral-700 font-play">
     <div className="p-6 pb-4 flex items-center justify-center dz-media">
     <img className="border-b w-28 h-28 md:w-44 md:h-44 object-cover rounded-full bg-amber-400 p-1 shadow-2xl"  src={topMan.image} />
     </div>
    
    <div className="p-6 pt-0 ">
      <h5
        className="mb-4 text-xl font-semibold leading-tight text-neutral-200 dark:text-neutral-50 text-center">
    {topMan.name}
      </h5>

       <h5
      className="mb-4 text-[20px] flex items-center justify-center gap-2 font-semibold leading-tight text-gray-300 italic dark:text-neutral-50 text-center font-prompt ">
   <span className="text-4xl text-amber-400 font-racing not-italic"> <CountUp end={topMan?.total_delivered} duration={6} /></span> Parcel Delivered!
    </h5>

    <div className="flex gap-3 items-center justify-center">
      <span className='text-orange-400 text-xl font-prompt'> {topMan?.avg_review}</span>
    <Rating className="text-orange-400" initialRating={topMan.avg_review} emptySymbol={<BsStar />} fullSymbol={<BsStarFill />} />
    </div>
    
  
     <div className="flex gap-3 flex-grow">
  
  
   
     </div>
    </div>
  </div>)}
          </section> 
      </section>
    )
  }
