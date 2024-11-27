import React from "react";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { userLogout } from "../../store/authSlice";
import {useNavigate} from 'react-router-dom'
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        dispatch(userLogout());
        navigate("/");
        toast.success("Logout Successfully");
      })
      .catch((error) => console.log(error));
     
      
  };
  return (
    <button
      className=" bg-blue-700 inline-block px-6 py-2 duration-200 hover:bg-blue-400 rounded-full text-slate-200"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
