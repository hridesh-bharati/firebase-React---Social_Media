import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { toast } from "react-toastify";

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
      setEmail("");
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleReset} style={{ maxWidth: 400, margin: "auto" }}>
      <h3>Forgot Password</h3>
      <p className="text-muted" style={{ fontSize: "0.9rem" }}>
        Enter your registered email to receive a reset link.
      </p>

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

      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      <button
        type="button"
        className="btn btn-link mt-3"
        onClick={onBack}
        style={{ fontSize: "0.9rem" }}
      >
        Back to Login
      </button>
    </form>
  );
}
