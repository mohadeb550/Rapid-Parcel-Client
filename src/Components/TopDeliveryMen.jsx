import CountUp from 'react-countup';
import Rating from 'react-rating';
import { BsStar, BsStarFill } from 'react-icons/bs'


export default function TopDeliveryMen() {


    return (
      <section className="my-24 mt-32 lg:my-44">
       <h1 className="text-[30px] md:text-3xl lg:text-[40px] text-[#014BA0] text-center font-racing mb-3 md:mb-6 " > Meet Our Top Delivery Team </h1>
       <p className="text-center mb-10 text-gray-500 max-w-5xl mx-auto px-4 font-play">
       At Rapid Parcel, our commitment to exceptional service goes hand in hand with the dedication of our top delivery professionals.</p>
  
       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-7  mb-8 md:mb-12 px-8 md:px-0">
  
       <div className="block rounded-md w-full border bg-[#014BA0] border-[#014BA0]/10 dark:bg-neutral-700 font-play">
     <div className="p-6 pb-4 flex items-center justify-center dz-media">
     <img className="border-b w-48 h-48 object-cover rounded-full bg-amber-400 p-1 shadow-2xl"  src='https://img.freepik.com/free-photo/delivery-concept-portrait-happy-african-american-delivery-man-pointing-hand-present-box-package-isolated-grey-studio-background-copy-space_1258-1263.jpg?size=626&ext=jpg&uid=R119857009&ga=GA1.1.1299887245.1688296512&semt=ais' />
     </div>
    
    <div className="p-6 pt-0 ">
      <h5
        className="mb-4 text-xl font-semibold leading-tight text-neutral-200 dark:text-neutral-50 text-center">
     Sustainable Packaging System
      </h5>

       <h5
      className="mb-4 text-2xl font-semibold leading-tight text-amber-400 dark:text-neutral-50 text-center">
   <span className="text-3xl text-amber-400 font-racing"> <CountUp end={370} duration={4} /></span> Parcel Delivered!
    </h5>

    <div className="flex gap-3 items-center justify-center">
    <Rating className="text-white/80 text-xl " initialRating={4.2} emptySymbol={<BsStar />} fullSymbol={<BsStarFill />} />
    </div>
    
  
     <div className="flex gap-3 flex-grow">
  
  
   
     </div>
    </div>
  </div>
  
      
  
  
          </section> 
      </section>
    )
  }
