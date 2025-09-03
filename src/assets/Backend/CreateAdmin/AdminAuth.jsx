import React, { useState } from "react";
import LoginAdmin from "./LoginAdmin";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AdminAuth() {
  const [storedPassword, setStoredPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    alert("Login successful!");
    setIsLoggedIn(true);
  };

  const handleChangePassword = (newPassword) => {
    setStoredPassword(newPassword);
    alert("Password updated successfully!");
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      {!isLoggedIn ? (
        <LoginAdmin
          correctPassword={storedPassword}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <>
          <h2>Change Password</h2>
          <ChangePasswordForm onChangePassword={handleChangePassword} />
        </>
      )}
    </div>
  );
}
