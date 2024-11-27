import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo, Inputindividual, Button } from "./index";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { LogIn } from 'lucide-react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AuthLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const submit = async (data) => {
   
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(userLogin({ userData }));
          navigate("/");
          toast.success("Login Successfully");
        }
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      toast.error("Login Failed");
    }
  };
  return (
    <div className="flex items-center justify-center w-full px-4 py-8  sm:px-6 lg:px-8 shadow-md">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl  sm:p-8 md:p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className=" max-w-[100px] ">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center sm:text-2xl  text-xl font-bold leading-tight">
          Log in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-green-500 transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && (
          <p className="mt-2 text-center text-base text-red-600">{error}</p>
        )}
        <form onSubmit={handleSubmit(submit)} className="mt-6 sm:mt-8 flex flex-col gap-4">
          <div className="space-y-5 px-2 py-2">
            <Inputindividual
              label="Email"
              placeholder="Enter your mail"
              className='text-sm sm:text-base'
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Inputindividual
              label="Password"
              placeholder="Enter your password"
              className='text-sm sm:text-base'
              type="password"
              {...register("password", { required: true })}
            />
            <Button type="submit"  className="w-full mt-2 text-sm sm:text-base py-2 sm:py-2.5"
             icon = {<LogIn className="w-4 h-4 " />}
             variant="primary"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthLogin;

