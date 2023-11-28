
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckOutForm"
import { MdOutlinePayment } from "react-icons/md";

// get stripe promise with publishable key 
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY)

export default function Payment() {

  return (
    <section className="max-w-5xl mx-auto shadow-xl rounded-md border p-5 mt-12">
        <div className="bg-indigo-600 text-white/80 w-16 h-16 rounded-full -mt-14 mx-auto flex justify-center items-center p-2">
            <MdOutlinePayment size={35}  />
        </div>
        <h2 className= "uppercase text-gray-500  text-[21px] font-semibold text-center my-2"> secure payment info </h2>
        <div className="flex justify-center">
            <img className="w-72 " src="/360_F_486770467_9nd0TjY0owEdwkoUCvi85VfIJQTvQFKi.jpg" />
        </div>
    <Elements stripe={stripePromise}>
        <CheckoutForm/>
    </Elements>
    </section>
  )
}