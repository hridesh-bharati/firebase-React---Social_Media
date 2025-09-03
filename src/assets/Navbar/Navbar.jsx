// src/components/MyNavbars.jsx
import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../ThemeContext.jsx";
import { FaMoon, FaSun, FaSearch } from "react-icons/fa";
import Fullscreen from "./Fullscreen.jsx";
import githubApi from "../Admin/Database.jsx";
import { Offcanvas } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import EntryPoint from "../Backend/CreateAdmin/EntryPoint";
import "./Navbar.css";

const MyNavbars = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [showProfileSidebar, setShowProfileSidebar] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await githubApi.getUserInfo();
        setUserInfo(data);
      } catch (err) {
        console.error("Error fetching user info", err);
      }
    };
    fetchUserInfo();

    const onResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768) setShowMobileSearch(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleCloseSearch = () => {
    setShowMobileSearch(false);
    document.activeElement?.blur();
  };

  const handleProfileClick = () => {
    if (user) {
      navigate("/AdminDashboard");
    } else {
      setShowProfileSidebar(true);
    }
  };

  const handleLoginSuccess = () => {
    toast.success("Login successful!");
    setShowProfileSidebar(false);
    navigate("/AdminDashboard");
  };

  return (
    <>
      <header
        className={`navbar-container ${darkMode ? "dark" : "light"}`}
        role="banner"
      >
        {/* Profile Picture */}
        {userInfo && (
          <div
            className="profile-circle overflow-hidden"
            role="button"
            tabIndex={0}
            title="Profile"
            onClick={handleProfileClick}
            onKeyDown={(e) => e.key === "Enter" && handleProfileClick()}
          >
            <img
              src={userInfo.avatar_url}
              alt="Profile"
              className="profile-image img-fluid"
            />
          </div>
        )}

        {isDesktop && <h2 className="text-white">HRIDESH</h2>}

        {(isDesktop || showMobileSearch) && (
          <div className="search-wrapper">
            <input
              type="search"
              className="search-input"
              placeholder="Search internships, jobs, courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={showMobileSearch}
              aria-label="Search"
            />
            {showMobileSearch && !isDesktop && (
              <button
                className="search-close"
                aria-label="Close search"
                onClick={handleCloseSearch}
              >
                ×
              </button>
            )}
          </div>
        )}

        <div className="nav-buttons">
          {!isDesktop && !showMobileSearch && (
            <button
              className="icon-btn"
              aria-label="Open Search"
              onClick={() => setShowMobileSearch(true)}
              type="button"
            >
              <FaSearch />
            </button>
          )}
          <Fullscreen darkMode={darkMode} />
          <button
            className="icon-btn"
            aria-label="Toggle Dark Mode"
            onClick={toggleDarkMode}
            type="button"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      {/* Profile Offcanvas Login Panel */}
      <Offcanvas
        show={showProfileSidebar}
        onHide={() => setShowProfileSidebar(false)}
        placement="start"
        backdrop={true}
        scroll={false}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ padding: "20px" }}>
          <EntryPoint onSuccess={handleLoginSuccess} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MyNavbars;
