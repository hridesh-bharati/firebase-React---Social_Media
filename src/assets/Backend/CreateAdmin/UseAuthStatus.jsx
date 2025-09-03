// src/hooks/UseAuthStatus.js
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

const UseAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const loggedIn = !!user;
      console.log("Auth state changed:", loggedIn, user); // debug log
      setIsAuthenticated(loggedIn);
      setCheckingStatus(false);
    });

    return () => unsubscribe();
  }, []);

  return { isAuthenticated, checkingStatus };
};

export default UseAuthStatus;
