import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  FaHome,
  FaUserAlt,
  FaInfoCircle,
  FaProjectDiagram,
  FaEnvelope,
} from "react-icons/fa";

const navItems = [
  { key: "home", label: "Home", icon: <FaHome size={20} /> },
  { key: "about", label: "About", icon: <FaInfoCircle size={20} /> },
  { key: "projects", label: "Projects", icon: <FaProjectDiagram size={20} /> },
  { key: "contact", label: "Contact", icon: <FaEnvelope size={20} /> },
  { key: "profile", label: "Profile", icon: <FaUserAlt size={20} /> },
];

export default function BottomFooter() {
  const [activeTab, setActiveTab] = useState("home");
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);

  const handleSelect = (key) => {
    setActiveTab(key);
    if (key === "profile") setShowProfileSidebar(true);
  };

  const handleClose = () => setShowProfileSidebar(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          width: 360,
          height: 72,
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
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

          return (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              aria-current={isActive ? "page" : undefined}
              aria-label={label}
              style={{
                position: "relative",
                bottom: "0px",
                width: 50,
                height: 50,
                borderRadius: 16,
                backgroundColor: isActive ? "#007AFF" : "#E0E7FF",
                border: "none",
                color: isActive ? "#fff" : "#1e3a8a",
                boxShadow: isActive
                  ? "0 8px 18px rgba(0, 122, 255, 0.5)"
                  : "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 600,
                transition: "all 0.3s ease",
              }}
            >
              {icon}
              <span style={{ fontSize: "10px", marginTop: 4 }}>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Profile Sidebar */}
      <Offcanvas
        show={showProfileSidebar}
        onHide={handleClose}
        placement="end"
        scroll={false}
        backdrop={true}
        style={{
          maxWidth: 320,
          width: "100%",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          borderTopLeftRadius: 24,
          borderBottomLeftRadius: 24,
          border: "1px solid rgba(0, 122, 255, 0.2)",
          boxShadow: "0 12px 40px rgba(0, 122, 255, 0.2)",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          color: "#1C1C1E",
          userSelect: "none",
          overflowY: "auto",
        }}
      >
        {/* Your profile content here */}
      </Offcanvas>
    </>
  );
}
