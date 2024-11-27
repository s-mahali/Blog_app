import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import { userLogin, userLogout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.themeMode === "dark");

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(userLogin({ userData }));
        } else {
          dispatch(userLogout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return !loading ? (
    <div
      className={`min-h-screen flex  content-between 
          ${isDarkMode ? "bg-dark" : "bg-light"}
      `}
    >
      <div className="w-full block ">
        <Header />
        <main >
          
          <ToastContainer />
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
