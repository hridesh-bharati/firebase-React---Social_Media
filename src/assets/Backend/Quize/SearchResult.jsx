import React, { useState } from "react";
import { auth, db } from "../../../firebaseConfig"; // Import auth and Firestore
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SearchForm = () => {
  const [studentName, setStudentName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Authenticate user with email and password
    try {
      // Find the user by studentName from Firestore (assuming you saved the name as part of their user details)
      const userQuery = await db.collection("users").where("studentName", "==", studentName).get();
      
      if (userQuery.empty) {
        toast.error("No user found with that name.");
        setLoading(false);
        return;
      }

      // Get user data (you might want to handle this differently if multiple users have the same name)
      const userDoc = userQuery.docs[0];
      const userData = userDoc.data();
      
      // Sign in the user
      await signInWithEmailAndPassword(auth, userData.email, password);

      // Fetch results from Firestore
      const resultRef = doc(db, "quizResults", userDoc.id); // Assuming you're using the user ID to store results
      const resultSnap = await getDoc(resultRef);

      if (resultSnap.exists()) {
        // Pass the results to the results page
        navigate("/QuizResults", {
          state: resultSnap.data(),
        });
      } else {
        toast.error("No quiz results found for this user.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error during search: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-5 mt-5">
      <div className="text-center mb-4">
        <h3 className="text-primary">Search Your Quiz Results</h3>
      </div>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <input
            type="text"
            name="studentName"
            placeholder="Enter your name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
            className="form-control rounded-pill"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control rounded-pill"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100 py-2 mb-2 rounded-pill"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Results"}
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
