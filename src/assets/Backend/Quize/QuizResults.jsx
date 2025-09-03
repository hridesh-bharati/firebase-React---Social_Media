import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCertificate } from "react-icons/fa";

const QuizResults = () => {
  const location = useLocation();
  const { studentName, generationId, score } = location.state || {};

  const navigate = useNavigate();

  if (!studentName || !generationId || score === undefined) {
    navigate("/"); // Redirect if no data found
  }

  return (
    <div className="container p-5 mt-5">
      <div className="certificate-wrapper">
        <div className="certificate-container text-center">
          <div className="certificate-header">
            <FaCertificate size={50} color="gold" />
            <h2 className="certificate-title">🎓 Quiz Completion Certificate</h2>
          </div>
          <div className="certificate-body">
            <p className="student-name">This is to certify that</p>
            <h3 className="student-name">{studentName}</h3>
            <p className="generation-id">Generation ID: {generationId}</p>

            <div className="result-box">
              <h4>Your Score</h4>
              <div className="result">
                <h1>{score} / 5</h1>
              </div>
            </div>
            <p className="certificate-footer">Date: {new Date().toLocaleDateString()}</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
