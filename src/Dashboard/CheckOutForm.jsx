import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";


export default function CheckoutForm() {

    const { currentUser } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { cost, id, parcel_name } = useParams();
    const [ loading , setLoading ] = useState(false);

    const [ clientSecret, setClientSecret ] = useState({});
    const stripe = useStripe()
    const elements = useElements();
    const navigate = useNavigate()

    useEffect(()=>{
       if(cost){
        axiosSecure.post('/create-payment-intent', { totalPrice : cost, currency:'usd' })
        .then(res => setClientSecret(res.data) )
       }
    },[])



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        if(!stripe || !elements){
          setLoading(false)
            return;
        }
        
        // get input field value from CardElement , this is internal mechanism
        const card = elements.getElement(CardElement);

        if(card === null){
          setLoading(false)
            return;
        }

        const { paymentMethod, error } = await stripe.createPaymentMethod({ type: 'card', card })

        if(error){
          setLoading(false)
            console.log(error)
        }else{ console.log( 'payment method', paymentMethod)}

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment( clientSecret, {

           payment_method : {
                card : card,
                billing_details: {
                    name: currentUser?.displayName,
                    email: currentUser.email
                }
           }
        })

        if(confirmError){
            console.log(confirmError)
            setLoading(false)
        }
        
        if(paymentIntent?.status === 'succeeded'){

              // now save the payment in database 
              const payment = {
                email: currentUser.email,
                price: parseInt(cost),
                transactionId : paymentIntent.id,
                date : new Date(),
              }
  
             const res = await axiosSecure.post('/payments', payment);
            if(res.data._id){

       const updatedParcel = {  payment :'paid'}

              axiosSecure.patch(`/update/${id}`, updatedParcel)
              .then(res => {
                if(res.data.modifiedCount){

                  const notification = {
                    receiverEmail : currentUser.email,  
                    title: `Your payment for "${parcel_name}" has successfully`,
                    parcelName : parcel_name,
                    isRead: false,
                    date: new Date(),
                  }
                 
                  axiosSecure.post('/insert-notification', notification )
                  .then(res =>{

                    if(res.data._id){
                      setLoading(false)
                      navigate('/dashboard/payment-successful');
                    }
                  })
                }
              }).catch(error => {
                toast.error('Something Went Wrong, Try Again', {duration: 3000})
              })
             
            }
        }
    }

  return ( 
    <section>

        <form onSubmit={handleSubmit}>
        <h2 className="uppercase text-gray-400 md:text-[17px] font-semibold text-center my-6 "> Total : {cost} Taka </h2>
            <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}/>
            <button className=" bg-indigo-600 my-6 py-2 text-sm md:text-base font-semibold uppercase px-20 rounded-md text-white/80" disabled={!stripe || !elements}> {loading? <Oval
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

/> : 'Pay Now'}</button>
        </form>
        
    </section>
  )
}
