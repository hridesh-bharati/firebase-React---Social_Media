// src/components/BottomFooter.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaFileImage,
  FaEnvelope,
  FaCamera,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";
import { auth } from "../../firebaseConfig";

const navItems = [
  { key: "/", label: "Home", icon: <FaHome size={20} /> },
  { key: "/GetAllimages", label: "Images", icon: <FaFileImage size={20} /> },
  { key: "/UploadImages", label: "Upload", icon: <FaCamera size={20} /> },
  { key: "/ContactForm", label: "Contact", icon: <FaEnvelope size={20} /> },
  { key: "/QuizApp", label: "Quiz", icon: <FaClipboardList size={20} /> },
  { key: "/QuizResults", label: "Results", icon: <FaCheckCircle size={20} /> },
];

const buttonStyle = (isActive) => ({
  position: "relative",
  bottom: "0px",
  width: 50,
  height: 50,
  borderRadius: 16,
  backgroundColor: isActive ? "#007AFF" : "#E0E7FF",
  border: "none",
  color: isActive ? "#fff" : "#1e3a8a",
  boxShadow: isActive ? "0 8px 18px rgba(0, 122, 255, 0.5)" : "none",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 12,
  fontWeight: 600,
  transition: "all 0.3s ease",
});

export default function BottomFooter() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handleSelect = (key) => {
    setActiveTab(key);
  };

  return (
    <nav
      style={{
        position: "fixed",
        bottom:5,
        left: "50%",
        transform: "translateX(-50%)",
        width: 360,
        height: 72,
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        borderRadius: 36,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        zIndex: 1100,
      }}
    >
      {navItems.map(({ key, label, icon }) => {
        const isActive = activeTab === key;
        if (key === "/QuizApp" && !isAuthenticated) {
          // Redirect to register if not logged in
          return (
            <Link
              to="/QuizApp"
              key={key}
              aria-label={label}
              style={{ textDecoration: "none" }}
            >
              <button
                onClick={() => handleSelect(key)}
                aria-current={isActive ? "page" : undefined}
                style={buttonStyle(isActive)}
              >
                {icon}
                <span style={{ fontSize: "10px", marginTop: 4 }}>{label}</span>
              </button>
            </Link>
          );
        }
        return (
          <Link
            to={key}
            key={key}
            aria-label={label}
            style={{ textDecoration: "none" }}
          >
            <button
              onClick={() => handleSelect(key)}
              aria-current={isActive ? "page" : undefined}
              style={buttonStyle(isActive)}
            >
              {icon}
              <span style={{ fontSize: "10px", marginTop: 4 }}>{label}</span>
            </button>
          </Link>
        );
      })}
    </nav>
  );
}
