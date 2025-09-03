import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import StatsWithCounter from './StatsWithCounter';
import Artcals from './Articals';
import Slider from './Silder';
import Services from './Services';
import SkillsSection from './Skills';
import ClientFeedback from './ClientFeedback';

import './Home.css';
import GetAllImages from '../Backend/Gallary/GetAllImages';

function Home({ darkMode }) {
  const isDesktop = window.innerWidth >= 768;

  const services = [
    { name: "Web App Development", img: "/icons/angularjs.png", color: "#ff6f61" },
    { name: "Frontend Engineering (React)", img: "/icons/express1.webp", color: "#61dafb" },
    { name: "Tech Mentoring & Training", img: "/icons/github.jpg", color: "#4caf50" },
    { name: "UI/UX Design & Optimization", img: "/icons/java.jpg", color: "#f39c12" },
    { name: "Code Review & Refactoring", img: "/icons/mongodb1.png", color: "#e74c3c" },
    { name: "API Integration", img: "/icons/nodejs1.png", color: "#9b59b6" },
    { name: "Performance Optimization", img: "/icons/node2.png", color: "#f1c40f" },
    { name: "Code Review & Refactoring", img: "/icons/mongodb.png", color: "#e74c3c" },
  ];

  return (
    <>
      <Slider />

      <div className={`p-0 ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
        {/* Articles Section */}
        <section className={`${darkMode ? 'bg-dark' : 'bg-light'}`}>
          <Artcals />
        </section>

        {/* About Section */}
        <section className={`${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'} transition-all`}>
          <div className="container-fluid py-5"
            style={{ backgroundColor: "#015761" }}
          >
            <h1 className="display-6 fw-bolder text-white">
              I am happy to know you that 300+ projects done successfully!
            </h1>
          </div>
          <div className="container-fluid py-5">
            <div className="row">
              <div className="col-12 mx-auto mt-3">
                <p>
                  I'm a passionate web developer focused on crafting responsive, modern user interfaces using React and JavaScript.
                  I believe in writing clean, maintainable code and building scalable frontends that perform efficiently across devices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={`${darkMode ? 'bg-secondary' : 'bg-white'} my-2  myshadow bg-white`}>
          <h2 className="fw-bold pt-4 text-center text-info heading1">Here are some of my expertise</h2>
          <StatsWithCounter />
        </section>

        {/* Other Sections */}
        <section className={`${darkMode ? 'bg-dark' : 'bg-light'} py-2 my-2  myshadow bg-white`}>
          <Services />
        </section>
        <section className={`${darkMode ? 'bg-dark' : 'bg-light'} py-2 my-2  myshadow bg-white`}>
          <SkillsSection />
        </section>
        <section className={`${darkMode ? 'bg-dark' : 'bg-light'} py-2 my-2  myshadow bg-white`}>
          <GetAllImages />
        </section>
        <section className={`${darkMode ? 'bg-dark' : 'bg-light'} py-2 my-2  myshadow bg-white`}>
          <ClientFeedback />
        </section>



        <section className={`${darkMode ? 'bg-dark' : 'bg-light'}  myshadow bg-white pb-5`}>
          <div className="container-fluid">
            <h2 className="text-center fw-bold mb-4 text-info heading1">My Services</h2>

            {[0, 1].map((row) => (
              <div
                key={row}
                className={`marquee-container ${row % 2 === 1 ? 'reverse' : ''}`}
              >
                <div className="marquee">
                  {[...services, ...services].map((service, idx) => (
                    <span
                      key={`${row}-${idx}`}
                      className="marquee-item"
                      style={{ color: service.color, borderColor: service.color }}
                    >
                      <span className="service-icon" style={{ marginRight: 8 }}>
                        <img
                          src={service.img}
                          alt={service.name}
                          style={{ width: '150px', height: '150px', objectFit: 'contain' }} // Uniform size
                        />
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
