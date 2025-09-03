

import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent to:", email);  // <-- add this
      setMessage("Password reset email sent! Please check your inbox.");
    } catch (err) {
      console.error("Reset email error:", err);
      setError(err.message);
    }

  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h3>Forgot Password</h3>
      <form onSubmit={handleReset}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Send Reset Email
        </button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={onBack} className="btn btn-link mt-3">
        Back to Login
      </button>
    </div>
  );
}
