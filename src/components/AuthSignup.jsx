import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo, Inputindividual, Button } from "./index";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import {  useForm } from "react-hook-form";
import { LogIn } from 'lucide-react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AuthSignup() {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
   const { register, handleSubmit } = useForm();
  

   const signupSubmit = async (data) => {
   
      setError("");
        try{
        const newUser =   await authService.createAccount(data)
         if(newUser){
          const user =  await authService.getCurrentUser()
           toast.success("Signup Successfully");
          if(user){
            dispatch(userLogin({user}));
           navigate("/")
          }
         }
        }catch(error){
           console.log(error);
           setError(error.message);
           toast.error("Signup Failed");
        }
   }

  return (
    <div className="flex items-center justify-center w-full min-h-screen px-4 py-8 sm:px-6  lg:px-8 ">
     <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-6 sm:p-8 md:p-10 border border-black/10`}>
      <div className="mb-4 flex justify-center sm:mb-6  ">
      <span className="max-w-[100px]">
                        <Logo width="100%" />
                    </span>
      </div>

    <div className="text-center space-y-2 sm:space-y-3">
      <h2 className="text-xl sm:text-2xl font-bold leading-tight">Sign up to create account</h2>
      <p className="text-sm sm:text-md text-gray-600">
      Already have an account?&nbsp;
      <Link to= "/login"
      className="font-medium text-blue-600 transition-all duration-200 hover:underline">
       Login
      </Link>
      </p>
    </div>
      {error && <p className="text-red-500 mt-4 sm:mt-8 text-center text-sm sm:text-base ">{error}</p>}
      <form onSubmit={handleSubmit(signupSubmit)} className="mt-6 sm:mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-4">
         <Inputindividual 
           label = "Full Name"
           className='text-sm sm:text-base'
           placeholder = "Enter your full name"
           {...register("name", {
             required: true,
           })}
           
         />
          <Inputindividual 
           label = "Email"
           type = "email"
           className='text-sm sm:text-base'
           placeholder = "Enter your email"
           {...register("email", {
             required: true,
             validate: {
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            }
           })}
           />
             <Inputindividual
              label="Password"
              placeholder="Enter your password"
              className='text-sm sm:text-base'
              type="password"
              {...register("password", { required: true })}
            />
            <Button
            type="submit"
            variant="primary"
            className="w-full mt-2 text-sm sm:text-base py-2 sm:py-2.5"
            icon = {<LogIn className="w-4 h-4" />}
            >Sign Up</Button>
        </div>
      </form>
     </div>
    </div>
  )
}

export default AuthSignup