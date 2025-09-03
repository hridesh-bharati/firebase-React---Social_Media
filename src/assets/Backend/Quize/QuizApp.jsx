// QuizApp.js
import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firebaseConfig"; // Import Firestore db and auth
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; // Firestore methods

const QuizApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/register");
      } else {
        setIsAuthenticated(true);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!isAuthenticated) {
    return <div className="p-5 m-5">Loading...</div>;
  }

  const questions = [
    {
      id: 1,
      question: "What does CPU stand for?",
      options: [
        "Central Process Unit",
        "Central Processing Unit",
        "Computer Personal Unit",
        "Central Program Unit",
      ],
      answer: "Central Processing Unit",
    },
    {
      id: 2,
      question: "Which programming language is known as the 'mother of all programming languages'?",
      options: ["Java", "C", "Fortran", "Assembly"],
      answer: "C",
    },
    {
      id: 3,
      question: "What is the main function of the operating system?",
      options: [
        "Manage hardware and software resources",
        "Display graphical interfaces",
        "Perform mathematical calculations",
        "Connect to the internet",
      ],
      answer: "Manage hardware and software resources",
    },
    {
      id: 4,
      question: "Which of the following is NOT an input device?",
      options: ["Keyboard", "Mouse", "Monitor", "Microphone"],
      answer: "Monitor",
    },
    {
      id: 5,
      question: "What is the full form of URL?",
      options: [
        "Uniform Resource Locator",
        "Universal Resource Locator",
        "Uniform Retrieval Locator",
        "Universal Retrieval Locator",
      ],
      answer: "Uniform Resource Locator",
    },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/register");
    } catch (error) {
      toast.error("Error during logout: " + error.message);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Please login to submit the quiz.");
      return;
    }

    const calculatedScore = questions.reduce(
      (acc, q) => acc + (selectedAnswers[q.id] === q.answer ? 1 : 0),
      0
    );

    setScore(calculatedScore);

    const studentName = localStorage.getItem("studentName");
    const generationId = localStorage.getItem("generationId");

    if (studentName && generationId) {
      // Save data to Firestore
      try {
        const docRef = await addDoc(collection(db, "quizResults"), {
          studentName,
          generationId,
          score: calculatedScore,
          date: new Date(),
        });
        toast.success("Results saved successfully!");
        navigate("/QuizResults", {
          state: { studentName, generationId, score: calculatedScore },
        });
      } catch (error) {
        toast.error("Error saving results: " + error.message);
      }
    }
  };

  return (
    <div className="p-5 m-lg-5  mb-2 bg-white shadow">
      <div className="p-2 my-2 bg-primary d-flex aligh-items-center justify-content-between">
        <h2 className="text-white">🧠Quiz Text</h2>
        <button onClick={handleLogout} className="btn btn-danger btn-sm mt-3">
          Logout
        </button>
      </div>
      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: 20 }}>
          <p>
            <strong>{q.question}</strong>
          </p>
          {q.options.map((option) => (
            <label key={option} style={{ display: "block" }} className="border px-3 py-2 m-2 shadow-sm">
              <input
                type="radio"
                name={`q-${q.id}`}
                value={option}
                checked={selectedAnswers[q.id] === option}
                onChange={() => handleAnswerChange(q.id, option)}
              />
              {" "}{option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="btn btn-primary mb-5">
        Submit Quiz
      </button>

    </div>
  );
};

export default QuizApp;
