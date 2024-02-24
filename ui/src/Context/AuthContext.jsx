import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

const UseAuth = () => useContext(AuthContext);

export const UseAuthProvider = ({ children, protectedPaths }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  //useLocation gets the current location.

  useEffect(() => {
    // Check if the current path is in the list of protected paths
    const authCalls = async (loc) => {
      if (protectedPaths.includes(loc)) {
        axios.post("/api/auth", null)
          .then((res) => {
            setLoggedIn(true);
            setAdmin(res.data);
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              navigate("/login");
            }
            console.log(error);
          });
      }
    }

    authCalls(location.pathname);

    return () => {

    }
    
  }, [location.pathname, navigate, protectedPaths]);

  return (
    <AuthContext.Provider value={{ loggedIn, isAdmin, setLoggedIn }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;