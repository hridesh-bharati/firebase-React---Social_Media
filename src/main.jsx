import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from './ThemeContext.jsx';  // <-- import this

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(reg => console.log('Service Worker registered with scope:', reg.scope))
    .catch(err => console.error('SW registration failed:', err));
}

const root = createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
