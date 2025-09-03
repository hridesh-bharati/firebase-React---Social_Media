import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../../../firebaseConfig";
import { toast } from "react-toastify";

export default function LoginAdmin({ onLoginSuccess, onForgotPassword }) {
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailInput,
        password
      );

      if (userCredential.user.email !== adminEmail) {
        setError("Unauthorized user.");
        await signOut(auth);
        return;
      }

      await set(ref(db, `loginAttempts/${Date.now()}`), {
        email: emailInput,
        status: "success",
        timestamp: new Date().toISOString(),
      });

      toast.success("Login successful!");

      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      await set(ref(db, `loginAttempts/${Date.now()}`), {
        email: emailInput,
        status: "failed",
        error: err.message,
        timestamp: new Date().toISOString(),
      });

      setError(err.message);
      toast.error("Login failed: " + err.message);
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: 400, margin: "auto" }}>
      <h3>Admin Login</h3>

      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          autoComplete="off"
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="off"
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>

      <button
        type="button"
        onClick={onForgotPassword}
        className="btn btn-link mt-3"
        style={{ fontSize: "0.9rem" }}
      >
        Forgot Password?
      </button>
    </form>
  );
}
