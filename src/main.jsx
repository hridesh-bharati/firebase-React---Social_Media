import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from './ThemeContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';  // Import AOS CSS
import './App.css';
import './index.css';
import './Darkmode.css';

import AOS from 'aos';

function Root() {
  React.useEffect(() => {
    AOS.init();
  }, []);

  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
