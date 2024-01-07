import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Oval } from "react-loader-spinner";

export default function ContactUs() {

    const [ isLoading , setIsLoading ] = useState(false);


    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true)

    emailjs.sendForm('service_i9rfsjq', 'template_7c10k5a', form.current, 'obvgqwmlKnS271e1n')
      .then((result) => {
        toast.success('Contact Information Send Successfully')
        setIsLoading(false)
      }, (error) => {
          console.log(error.text);
      });
  };



    return (
     <section className=" bg-[url('/29887025_sl_032421_41660_19.jpg')] h-[770px] lg:h-[750px] bg-cover mt-28 lg:mt-44">

<Toaster />

      <h2 className="text-[31px] md:text-[41px] text-[#014BA0] font-bold italic text-center p-8 pb-0 mr-16"> Contact Us </h2>
      <p className="text-sm text-gray-500 font-play  text-center p-1 mr-16"> Fill the form easily and send me your info</p>
  
      <div className="bg-black/70 w-[83%] md:w-[65%] mx-auto mt-12 p-6 lg:p-10 pb-4">
  
          <form ref={form} onSubmit={sendEmail}>

          <div className="grid lg:grid-cols-1 gap-2">
              <input type="text" className="p-3 outline-none" placeholder="Your Name" name='user_name' />
              <input type="text" className="p-3 outline-none" placeholder="Email Address"  name='user_email'/>
              <input type="text" className="p-3 outline-none " placeholder="Phone Number" name='phone'/>
              <textarea className="p-3 outline-none " rows={4} placeholder="Message" name='message' />
                  
          </div>
        
         <div className="flex justify-center items-center">
         <button type="submit" className="p-3 outline-none border font-play border-amber-400 text-amber-400 my-6 px-10 hover:bg-amber-500/20"> {isLoading? <Oval
  height={26}
  color="#FBBF24"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#D1D5DE"
  strokeWidth={4}
  strokeWidthSecondary={3}

/> : 'Submit'} </button>
         </div>
         </form>
      </div>
     </section>
    )
  }
