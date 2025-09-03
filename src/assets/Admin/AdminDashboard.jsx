import React, { useState } from "react";
import { toast } from "react-toastify";
import UseAuthStatus from "../Backend/CreateAdmin/UseAuthStatus";

import MessageList from "../Backend/Contact/MessageList";
import Whatido from "../Backend/WhatIDo/Whatido";
import WelcomeAdmin from "./Welcome";
import VisitorCounter from "./VisitorCounter";
import GetProfile from "../Backend/AdminProfile/GetProfile";
import UploadProfile from "../Backend/AdminProfile/UploadProfile";
import LogoutButton from "../Backend/CreateAdmin/LogoutButton";
import GetAllImages from "../Backend/Gallary/GetAllImages";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { isAuthenticated, checkingStatus } = UseAuthStatus();

  const tabs = [
    { id: "home", label: "Home", Component: WelcomeAdmin },
    { id: "UploadProfile", label: "Upload Profile", Component: UploadProfile },
    { id: "profile", label: "Get Profile", Component: GetProfile },
    { id: "MessageList", label: "Messages", Component: MessageList },
    { id: "experience", label: "Experience", Component: Whatido },
    { id: "visitorCounter", label: "Visitor Counter", Component: VisitorCounter },
    { id: "GetAllImages", label: "Gallaries", Component: GetAllImages },
    {
      id: "LogoutButton",
      label: "Logout",
      Component: () => (
        <LogoutButton onLogout={() => toast.success("Logged out successfully!")} />
      ),
    },
  ];

  if (checkingStatus) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Checking authentication...</span>
        </div>
        <p className="mt-3">Loading Admin Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-5">
      <div className="d-flex">
        {isSidebarOpen && (
          <nav
            className="nav flex-column bg-dark p-3"
            style={{ minWidth: 200, borderRadius: 8 }}
            aria-label="Admin dashboard tabs"
          >
            <button
              className="btn btn-sm btn-outline-light mt-3"
              onClick={() => setIsSidebarOpen(false)}
            >
              Hide Sidebar
            </button>
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                className={`nav-link text-white ${activeTab === id ? "active" : ""}`}
                onClick={() => setActiveTab(id)}
                type="button"
                role="tab"
                aria-selected={activeTab === id}
                aria-controls={`tab-panel-${id}`}
                id={`tab-${id}`}
              >
                {label}
              </button>
            ))}
            
          </nav>
        )}

        <section
          className="tab-content flex-grow-1 p-4 bg-light rounded position-relative"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          id={`tab-panel-${activeTab}`}
          style={{ minHeight: 300 }}
        >
          {!isSidebarOpen && (
            <button
              className="btn btn-sm btn-outline-secondary mb-3"
              onClick={() => setIsSidebarOpen(true)}
            >
              Show Sidebar
            </button>
          )}

          {tabs.map(({ id, Component }) => (id === activeTab ? <Component key={id} /> : null))}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
