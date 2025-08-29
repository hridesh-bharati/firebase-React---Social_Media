import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../ThemeContext.jsx';
import { FaMoon, FaSun, FaSearch, FaCog } from 'react-icons/fa';
import Fullscreen from './Fullscreen.jsx';
import './Navbar.css';

const MyNavbars = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const onResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768) setShowMobileSearch(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className={`navbar-container ${darkMode ? 'dark' : 'light'}`}>
      {/* Left: Logo/Profile */}
      <div
        className="profile-circle"
        role="button"
        tabIndex={0}
        title="Profile"
        onClick={() => alert('Profile clicked')}
        onKeyDown={(e) => e.key === 'Enter' && alert('Profile clicked')}
      />

      {/* Center: Search */}
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
              onClick={() => setShowMobileSearch(false)}
            >
              ×
            </button>
          )}
        </div>
      )}

      {/* Right: Buttons */}
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
  );
};

export default MyNavbars;
