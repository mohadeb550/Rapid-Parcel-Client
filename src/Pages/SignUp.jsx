
import { Link, useNavigate } from "react-router-dom";
import auth from "../config/firebase.config.js";

import toast  from "react-hot-toast";
import { FcGoogle } from 'react-icons/fc'
import { Helmet } from "react-helmet-async";
import useAuth from "../Hooks/useAuth.js";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic.jsx";
import SocialLogin from "../Components/Shared/SocialLogin.jsx";





export default function SignUp() {
  const { register, handleSubmit, formState: {errors}} = useForm();


    const { createUser , updateUserProfile } = useAuth();
    const navigate = useNavigate();


    const onSubmit = (data) => {
      createUser(data.email, data.password)
        .then(result => {
        
           updateUserProfile(result.displayName, result.photo_URL)
           .then(result => {
           
            // save user info in database
          
          })

          
        })
        .catch(error =>  {
            console.log(error)
            toast.error('Something went wrong!')
        })
    }



  return (
    <div className="hero h-[700px] md:h-[800px] px-4 bg-[url('/15151445_5559852.jpg')]">

      <Helmet>
        <title> BistroBoss / Sign-up </title>
      </Helmet>
    <div className="hero-content flex-col w-full gap-0">

    <div className="text-center lg:text-left pt-5 rounded-l-lg">
        <h1 className="text-[27px] lg:text-[32px] text-white/90 font-bold text-center mb-4 font-play"> Create New Account !</h1>
      </div>

      <div className="rounded flex-shrink-0 w-full max-w-2xl  bg-black/40">
        <div className= " p-6 lg:p-10">


        <form onSubmit={handleSubmit(onSubmit)} className="text-white">
            
          <div className="form-control">
            <label className="label">
              <span className="">Name</span>
            </label>
            <input type="text" placeholder="Name" className="input input-bordered  bg-transparent  border-white/30" {...register('name',{required: true, minLength: 6, maxLength: 10})} />
            <span className="text-red-400 font-semibold text-sm p-1"> {errors.name?.type === 'required' && 'Name is required'} {errors.name?.type === 'minLength' && 'Name Must Have 6 Characters'} {errors.name?.type === 'maxLength' && 'Name Maximum 8 Characters'}  </span>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="">Photo URL</span>
            </label>
            <input type="text" placeholder="Name" className="input input-bordered  bg-transparent  border-white/30" {...register('photo',{required: true})} />
            <span className="text-red-400 font-semibold text-sm p-1"> {errors.photo?.type === 'required' && 'Photo URL is required'}  </span>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="">Email</span>
            </label>
            <input type="email" placeholder="Email" className="input input-bordered  bg-transparent  border-white/30" {...register('email', {required: true, pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />

            <span className="text-red-400 font-semibold text-sm p-1">{errors.email?.type === 'required' && 'Email is required'} {errors.email?.type === 'pattern' && 'Please input a valid email'}</span>
          </div>


          <div className="form-control">
            <label className="label">
              <span className="">Password</span>
            </label>
            <input type="text" placeholder="Password" className="input input-bordered  bg-transparent  border-white/30" {...register('password', {required: true, pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,8}$/ })} />

            <span className="text-red-400 font-semibold text-sm p-1"> {errors.password?.type === 'required' && 'Password is required'} {errors.password?.type === 'pattern' && 'Min 1 uppercase letter, 1 lowercase letter, 1 special character, 1 number, min 6 characters, max 8 characters.'} </span>
           
            <div>
                <h4 className="text-sm font-semibold text-amber-400"> Already Have An Account? <Link to='/login'> <span className="text-white/80 hover:underline"> Login</span></Link> </h4>
            </div>

           
          <SocialLogin/>
          </div>
          <div className="form-control mt-6">
            <button className="bg-white/90 py-2 px-3 text-[#014BA0] rounded font-bold transition-all hover:bg-white/80 text-sm md:text-base" type="submit"> Sign Up </button>
          </div>
        </form>


        </div>
      </div>
    </div>
  </div>
  )
}
