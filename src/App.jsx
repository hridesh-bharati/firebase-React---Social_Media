import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from './assets/Home/Home';
import Navbars from './assets/Navbar/Navbar';
import BottomFotter from './assets/Navbar/BottomFotter';
import Whatido from './assets/Backend/WhatIDo/Whatido';
import DelWhatido from './assets/Backend/WhatIDo/DelWhatido';
import AdminDashboard from './assets/Admin/AdminDashboard';
import Profile from './assets/Admin/Profile';
import ContactForm from './assets/Backend/Contact/ContactForm';
import MessageList from './assets/Backend/Contact/MessageList';
import UploadProfile from './assets/Backend/AdminProfile/UploadProfile';
import GetProfile from './assets/Backend/AdminProfile/GetProfile';
import UploadImages from './assets/Backend/Gallary/UploadImages';
import GetAllimages from './assets/Backend/Gallary/GetAllImages';
import QuizApp from './assets/Backend/Quize/QuizApp';
import QuizResults from './assets/Backend/Quize/QuizResults';
import RegisterPage from './assets/Backend/Student/RegisterAndLogin';
import Footer from './assets/Home/Footer';


function About() {
  return <h2>About Page</h2>;
}

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="mt-5"
        style={{ zIndex: '9999' }}
        theme="colored"
      />
      <BrowserRouter>
        <Navbars />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/whatido" element={<Whatido />} />
          <Route path="/DelWhatido" element={<DelWhatido />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ContactForm" element={<ContactForm />} />
          <Route path="/MessageList" element={<MessageList />} />
          <Route path="/UploadProfile" element={<UploadProfile />} />
          <Route path="/GetProfile" element={<GetProfile />} />
          <Route path="/UploadImages" element={<UploadImages />} />
          <Route path="/GetAllimages" element={<GetAllimages />} />
          <Route path="/QuizApp" element={<QuizApp />} />
          <Route path="/QuizResults" element={<QuizResults />} />
          <Route path="/register" element={<RegisterPage />} />

        </Routes>
        <BottomFotter />
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
