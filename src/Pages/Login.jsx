
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast  from "react-hot-toast";
import { FcGoogle } from 'react-icons/fc'
import useAuth from "../Hooks/useAuth";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import SocialLogin from "../Components/Shared/SocialLogin";



export default function Login() {


  const { loginUser , loginWithGoogle , currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();


  const { mutateAsync: generateJwt } = useMutation({
    mutationKey: ['generateJwt'],
    mutationFn: async (payload) => {
      return axios.post(`https://savorspot-cafe-server.vercel.app/jwt`, payload, { withCredentials: true})
    }
  })
  
  
  const { mutateAsync: saveUser } = useMutation({
    mutationKey: ['save-user'],
    mutationFn: async (updatedUser) => {
      return axios.put(`https://savorspot-cafe-server.vercel.app/save-user/`, updatedUser)
    }
  })



    const handleLogin = (e) => {
        e.preventDefault();

        const form  = new FormData(e.target);
        const email = form.get('email')
        const password = form.get('password')

        loginUser(email, password)
        .then(result => {

            toast.success('Login Successful !',{duration:3000});

            generateJwt({email})
            .then(data => {
              if(data.data.success){
                navigate(location.state? location.state : '/');
              }
            })

        })
        .catch(error =>  toast.error(error.message))
    }

    const googleLogin = () => {
      loginWithGoogle()
      .then(result => {
          toast.success('Login Successful!')
      
          generateJwt({email: result.user.email})
          .then(data => {
            console.log(data.data)
            if(data.data.success){
              navigate(location.state? location.state : '/');
            }
          })

          saveUser({name: result.user.displayName, email : result.user.email, photoURL : result.user.photoURL })
          .then(data => {

            if(data.data.modifiedCount > 0 || data.data.upsertedCount > 0 || data.data.matchedCount > 0){
              console.log('userInfo saved successfully')
            }
          })
    
      })
      .catch(error => {
          toast.error(error.message)
      })
  }



  return(
    <div className="hero h-[600px] pb-32 md:pb-0 md:h-[700px] px-4 bg-base-200 bg-[url('/6674908_3386851.jpg')]">

    <Helmet>
        <title> SavorSpotCafe / Login </title>
      </Helmet>
    <div className="hero-content flex-col w-full">

      <div className="text-center lg:text-left">
        <h1 className="text-3xl lg:text-[32px] text-white/90  px-24 py-3 font-bold text-center font-play">Login now!</h1>
      </div>

      <div className="rounded-md flex-shrink-0 w-full max-w-2xl shadow-2xl bg-black/40">
        <div className="p-10">


        <form onSubmit={handleLogin} className="text-white">

          <div className="form-control">
            <label className="label">
              <span className="">Email</span>
            </label>
            <input type="email" placeholder="Email" className="input input-bordered bg-transparent  border-white/30" name="email" />
          </div>


          <div className="form-control">
            <label className="label">
              <span className="">Password</span>
            </label>
            <input type="text" placeholder="Password" className="input input-bordered bg-transparent border-white/30" name="password" />
          

            <div className="mt-3">
                <h4 className="text-sm font-semibold text-amber-400"> Don't Have An Account? <Link to='/sign-up'> <span className="-600  hover:underline"> Sign Up </span></Link> </h4>
            </div>

           <SocialLogin/>

          </div>
          <div className="form-control mt-6">
            <button className="bg-blue-600 py-2 px-3 text-gray-100 rounded font-semibold transition-all hover:bg-blue-700 text-sm md:text-base" type="submit"> Login </button>
          </div>
        </form>


        </div>
      </div>
    </div>
  </div>
  )
}
