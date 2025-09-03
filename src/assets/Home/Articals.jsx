import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Typed from 'typed.js';
import Card from './Card.jsx';
import GetProfile from '../Backend/AdminProfile/GetProfile.jsx'
export default function Home() {
  const elementRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(elementRef.current, {
      strings: [
        "Web Developer",
        "Web Designer",
        "Computer Operator",
        "Programmer"
      ],
      typeSpeed: 55,
      backSpeed: 40,
      loop: true,
      backDelay: 1000,
    });

    return () => typed.destroy();
  }, []);

  const socialLinksData = [
    { icon: "bi-facebook", url: "/facebook", color: "#3b5998", label: "Facebook" },
    { icon: "bi-instagram", url: "/instagram", color: "#C13584", label: "Instagram" },
    { icon: "bi-linkedin", url: "/linkedin", color: "#0e76a8", label: "LinkedIn" },
    { icon: "bi-github", url: "/github", color: "#333", label: "GitHub" },
    { icon: "bi-youtube", url: "/youtube", color: "#FF0000", label: "YouTube" },
    { icon: "bi-whatsapp", url: "/whatsapp", color: "#25D366", label: "WhatsApp" },
  ];

  const colleges = [
    {
      title: "Ramharsh Inter College",
      location: "Nichalul, Maharajganj, UP",
      description: "Dedicated to quality education and holistic development with modern facilities and a supportive environment."
    },
    {
      title: "Rastriya Inter College Bali",
      location: "Nichlaul, Maharajganj, UP",
      description: "Focused on academic growth and personal development with a well-rounded education program."
    },
    {
      title: "Rajendra Prasad Tarachand P.G. College",
      location: "Nichlaul, Maharajganj, UP",
      description: "Offers UG and PG programs, promoting research and extracurricular excellence."
    }
  ];

  return (
    <div className="bg-light text-dark min-vh-100 d-flex flex-column">

      {/* Hero Section */}
      <section className="hero-section d-flex flex-column justify-content-center align-items-center text-center text-white px-4">
        <h1 className="display-3 fw-bold mb-3">HRIDESH BHARATI</h1>
        <h4 ref={elementRef} className="typed-text text-warning fw-semibold  small mb-4"></h4>
        <p className="lead fw-light fs-5">Developer | Educator | Problem Solver</p>
        <Link to="/about" className="btn btn-warning btn-lg mt-4 shadow-sm hover-scale">Learn More</Link>
      </section>

      {/* About Section */}
      <GetProfile />
      {/* Education Timeline */}
      <section className="bg-white py-5">
        <div className="container">
          <h2 className="text-center text-secondary fw-bold mb-5">Education Timeline</h2>

          <div className="timeline d-flex justify-content-between align-items-center position-relative mb-5 mx-auto" style={{ maxWidth: 700 }}>
            {["2019", "2021", "2022", "2025"].map((year, idx) => (
              <div className="timeline-step" key={idx}>{year}</div>
            ))}
            <div className="timeline-line"></div>
          </div>

          {/* Colleges */}
          <div className="row gy-4">
            {colleges.map(({ title, location, description }, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card h-100 shadow-sm border-0 p-3">
                  <h5 className="text-primary fw-bold">{title}</h5>
                  <p className="text-muted fst-italic mb-2">{location}</p>
                  <p className="text-secondary">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/education" className="btn btn-warning btn-lg shadow-sm hover-scale">Explore More</Link>
          </div>
        </div>
      </section>

      {/* Styles */}
      <style>{`
        .hero-section {
          background: linear-gradient(135deg, #014d4d, #056d6d);
          min-height: 70vh;
          padding: 4rem 1rem;
          box-shadow: inset 0 0 150px rgb(0 0 0 / 0.5);
          border-radius: 0 0 80px 80px;
        }
        .typed-text {
          font-size: 1.75rem;
          min-height: 2.25rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .hover-scale {
          transition: transform 0.3s ease;
        }
        .hover-scale:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(255, 193, 7, 0.7);
        }
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid;
          background: #fff;
          font-size: 1.3rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .social-icon:hover {
          background: #ffc107;
          color: #000 !important;
          box-shadow: 0 4px 10px rgba(255, 193, 7, 0.6);
        }
        .timeline {
          position: relative;
          height: 70px;
          max-width: 700px;
          margin: 0 auto;
        }
        .timeline-line {
          position: absolute;
          top: 50%;
          left: 5%;
          width: 90%;
          height: 6px;
          background: #ffc107;
          border-radius: 3px;
          transform: translateY(-50%);
          z-index: 0;
        }
        .timeline-step {
          background: #fff;
          border: 4px solid #ffc107;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          font-weight: 700;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          position: relative;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          user-select: none;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .timeline-step:hover {
          background-color: #ffc107;
          color: #000;
          cursor: default;
        }
        .card p {
          line-height: 1.5;
        }
        .card h5 {
          font-size: 1.25rem;
        }
      `}</style>
    </div>
  );
}
