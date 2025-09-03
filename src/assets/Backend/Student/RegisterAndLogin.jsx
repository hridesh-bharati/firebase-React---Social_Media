import React, { useState } from "react";
import { auth } from "../../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterAndLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "", studentName: "", generationId: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Google sign-in function
  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Welcome, ${user.displayName || 'User'}! 🎉`);

      localStorage.setItem("studentName", user.displayName);
      localStorage.setItem("generationId", "Google-User"); // Default for Google users

      navigate("/QuizApp");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error(`Something went wrong with Google Sign-In: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Regular email/password sign-up
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, studentName, generationId } = formData;

    if (!email || !password || !studentName || !generationId) {
      toast.warn("Please fill in all the required fields.");
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.info("Account created successfully!");
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(`Welcome, ${studentName}! 🎉`);

      localStorage.setItem("studentName", studentName);
      localStorage.setItem("generationId", generationId);

      navigate("/QuizApp");
    } catch (error) {
      let errorMsg = "Something went wrong. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMsg = "This email is already registered.";
      } else if (error.code === "auth/weak-password") {
        errorMsg = "Password should be at least 6 characters.";
      } else if (error.code === "auth/invalid-email") {
        errorMsg = "Please enter a valid email address.";
      }

      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center pt-5 mt-5">
        <div className="col-12 col-md-6 col-lg-4 p-4 bg-white rounded">
          <div className="text-center mb-4">
            <h3 className="text-primary fw-bolder">Create New Account</h3>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <input
                type="text"
                name="studentName"
                placeholder="Full Name"
                value={formData.studentName}
                onChange={handleChange}
                required
                className="form-control rounded-pill"
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                name="generationId"
                placeholder="Registration ID"
                value={formData.generationId}
                onChange={handleChange}
                required
                className="form-control rounded-pill"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-control rounded-pill"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-control rounded-pill"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 py-2 mb-2 rounded-pill"
              disabled={loading}
            >
              {loading ? "Processing..." : "Register & Login"}
            </button>

            <div className="text-center mt-3">
              <span>or</span>
              <button
                type="button"
                className="btn mt-2 w-100 rounded-pill"
                onClick={handleGoogleSignUp}
                disabled={loading}
                style={{ backgroundColor: "#b8140fff", color: "#fff" }}
              >
                <i className="bi bi-google"></i> Sign up with Google
              </button>

              <button
                type="button"
                className="btn btn-outline-dark mt-2 w-100 rounded-pill"
                style={{ backgroundColor: "#24292F", color: "#fff" }}
              >
                <i className="bi bi-github"></i> Sign up with GitHub
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterAndLogin;

