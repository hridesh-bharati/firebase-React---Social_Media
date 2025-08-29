import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import StatsWithCounter from './StatsWithCounter';
import Artcals from './Articals';

import {
  FaCode, FaPaintBrush, FaMobileAlt, FaBug,
  FaProjectDiagram, FaUsers, FaReact, FaBolt
} from 'react-icons/fa';

import './Home.css';
import Services from './Services';
import SkillsSection from './Skills';
import ImageGallery from './ImageGallery';
import ClientFeedback from './ClientFeedback';

function Home({ darkMode }) {
  const isDesktop = window.innerWidth >= 768;

  const services = [
    { name: "Web App Development", icon: <FaCode />, color: "#ff6f61" },
    { name: "Frontend Engineering (React)", icon: <FaReact />, color: "#61dafb" },
    { name: "Tech Mentoring & Training", icon: <FaUsers />, color: "#4caf50" },
    { name: "UI/UX Design & Optimization", icon: <FaPaintBrush />, color: "#f39c12" },
    { name: "Code Review & Refactoring", icon: <FaBug />, color: "#e74c3c" },
    { name: "API Integration", icon: <FaProjectDiagram />, color: "#9b59b6" },
    { name: "Performance Optimization", icon: <FaBolt />, color: "#f1c40f" },
  ];

  return (
    <div className={`p-0 ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
      {/* Hero Section */}
      <section
        className="d-flex align-items-center"
        style={{
          minHeight: '100vh',
          backgroundImage: 'url(/img/slider.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: isDesktop ? 'fixed' : 'scroll',
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <h5 className="text-warning fw-bold mb-3">
                Hi, I’m{' '}
                <TypeAnimation
                  sequence={[
                    'Web Developer', 1000,
                    'Frontend Engineer', 1000,
                    'React Specialist', 1000,
                  ]}
                  speed={50}
                  repeat={Infinity}
                />
              </h5>

              <h1 className="fw-bold mb-4" style={{ color: '#ffc107' }}>
                HRIDESH BHARATI
              </h1>

              <button className="btn btn-warning btn-lg">Explore More</button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={`${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'} transition-all`}>
        <div className="container-fluid py-5 bgColor1">
          <h1 className="display-6 fw-bolder text-white">
            I am happy to know you that 300+ projects done successfully!
          </h1>
        </div>

        <div className="container-fluid py-5">
          <div className="row fw-normal">
            <div className="col-12 mx-auto mt-3">
              <h2 className="text-primary mb-3 text-center">About Me</h2>
              <p>
                I'm a passionate web developer focused on crafting responsive, modern user interfaces using React and JavaScript. With a strong eye for design and performance, I thrive on turning ideas into smooth, engaging digital experiences that are both functional and user-friendly.
                <hr />
                I believe in writing clean, maintainable code and building scalable frontends that not only look great but also perform efficiently across devices. Whether it's a dynamic web app, an interactive UI, or optimizing an existing codebase, I enjoy solving
              </p>

              {/* Services Marquee */}
              <section className="py-5">
                <div className="container-fluid">
                  <h2 className="text-center fw-bold mb-4 text-info heading1">My Services</h2>


                  {[0, 1, 2, 3].map((row) => (
                    <div
                      key={row}
                      className={`marquee-container ${row % 2 === 1 ? 'reverse' : ''} mb-3`}
                    >
                      <div className="marquee">
                        {[...services, ...services].map((service, idx) => (
                          <span
                            key={`${row}-${idx}`}
                            className="marquee-item"
                            style={{ color: service.color, borderColor: service.color }}
                          >
                            <span className="service-icon" style={{ color: service.color, marginRight: 8 }}>
                              {service.icon}
                            </span>
                            {service.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`${darkMode ? 'bg-secondary' : 'bg-white'}`}>
        <h2 className="fw-bold mb-4 text-info heading1">Here are some of my expertise</h2>
        <StatsWithCounter />
      </section>

      {/* Articles Section */}
      <section className={`${darkMode ? 'bg-dark' : 'bg-light'} py-5`}>
        <Artcals />
      </section>

      {/* Articles Section */}
      <section className={`${darkMode ? 'bg-dark' : 'bg-light'} py-5`}>
        <Services />
      </section>

      {/* Articles Section */}
      <section className={`${darkMode ? 'bg-dark' : 'bg-light'} py-5`}>
        <SkillsSection />
      </section>


      {/* Articles Section */}
      <section className={`${darkMode ? 'bg-dark' : 'bg-light'} py-5`}>
        <ImageGallery />
      </section>

      {/* Articles Section */}
      <section className={`${darkMode ? 'bg-dark' : 'bg-light'} py-5`}>
        <ClientFeedback />
      </section>


    </div>
  );
}

export default Home;
