import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './assets/Home/Home';
import Navbars from './assets/Navbar/Navbar';
import BottomFotter from './assets/Navbar/BottomFotter';
import Footer from './assets/Home/Footer';

function About() {
  return <h2>About Page</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Navbars />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <BottomFotter />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
