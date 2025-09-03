import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";

import LoginAdmin from "./LoginAdmin";
import ForgotPassword from "./ForgotPassword";
import LogoutButton from "./LogoutButton";

export default function EntryPoint({ onSuccess }) {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login"); // "login" or "forgot"
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        navigate("/AdminDashboard");  
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (user) {
    // Optional: You can show a loading spinner while redirecting
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-sm p-4 text-center" style={{ maxWidth: 400 }}>
          <h4 className="mb-4">Redirecting to admin panel...</h4>
          <LogoutButton onLogout={() => setUser(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5 pt-5">
      <div className="card shadow-sm p-4" style={{ maxWidth: 400, width: "100%" }}>
        {view === "login" && (
          <LoginAdmin
            onLoginSuccess={() => {
              setUser(auth.currentUser);
              if (onSuccess) onSuccess();
              navigate("/AdminDashboard");
            }}
            onForgotPassword={() => setView("forgot")}
          />
        )}

        {view === "forgot" && (
          <ForgotPassword onBack={() => setView("login")} />
        )}
      </div>
    </div>
  );
}
