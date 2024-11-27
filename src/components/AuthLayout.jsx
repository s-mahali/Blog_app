import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authStatus !== authentication) {
      navigate(authentication ? "/login" : "/");
    }

    setLoader(false);
  }, [authentication, authStatus, navigate]);
  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthLayout;
