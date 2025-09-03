import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const socialLinks = [
    { icon: "bi-facebook", url: "https://facebook.com", color: "#3b5998" },
    { icon: "bi-instagram", url: "https://instagram.com", color: "#C13584" },
    { icon: "bi-linkedin", url: "https://linkedin.com", color: "#0e76a8" },
    { icon: "bi-github", url: "https://github.com", color: "#333" },
    { icon: "bi-twitter", url: "https://twitter.com", color: "#1DA1F2" },
  ];

  return (
    <footer className="pro-footer py-5 px-4">
      <div className="container">
        <div className="row gy-4">
          {/* About */}
          <div className="col-md-6 col-lg-3">
            <h3 className="text-primary fw-bold">Hridesh Bharati</h3>
            <p className="text-muted">
              Passionate web developer creating smooth, modern digital experiences with a focus on clarity and performance.
            </p>
            <div className="d-flex gap-3 mt-3">
              {socialLinks.map(({ icon, url, color }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  style={{ backgroundColor: color }}
                  aria-label={url}
                >
                  <i className={`bi ${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-6 col-lg-3">
            <h4 className="text-primary fw-semibold mb-3">Quick Links</h4>
            <div className="row">
              <div className="col-6">
                <ul className="list-unstyled">
                  <li><Link to="/" className="footer-link">Home</Link></li>
                  <li><Link to="/about" className="footer-link">About Me</Link></li>
                  <li><Link to="/services" className="footer-link">Services</Link></li>
                </ul>
              </div>
              <div className="col-6">
                <ul className="list-unstyled">
                  <li><Link to="/portfolio" className="footer-link">Portfolio</Link></li>
                  <li><Link to="/resume" className="footer-link">Resume</Link></li>
                  <li><Link to="/contact" className="footer-link">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="col-md-6 col-lg-3">
            <h4 className="text-primary fw-semibold mb-3">Contact</h4>
            <p className="text-muted"><i className="bi bi-geo-alt-fill me-2"></i>Nichalul, Maharajganj, UP, India</p>
            <p><i className="bi bi-telephone-fill me-2"></i><a href="tel:+917267995307" className="footer-link">+91 7267995307</a></p>
            <p><i className="bi bi-envelope-fill me-2"></i><a href="mailto:hrideshbharati027@gmail.com" className="footer-link">hrideshbharati027@gmail.com</a></p>
          </div>

          {/* Newsletter */}
          <div className="col-md-6 col-lg-3">
            <h4 className="text-primary fw-semibold mb-3">Newsletter</h4>
            <p className="text-muted">Subscribe to get updates on latest projects and articles.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed!");
              }}
              className="d-flex flex-wrap gap-2 mt-2"
            >
              <input
                type="email"
                placeholder="Your email"
                required
                className="form-control rounded-pill"
              />
              <button type="submit" className="btn btn-primary rounded-pill px-4">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="my-4" />
        <p className="text-center text-muted small mb-0">
          © {new Date().getFullYear()} Hridesh Bharati. All rights reserved.
        </p>
      </div>

      {/* Custom Styles */}
      <style>{`
        .pro-footer {
          background: rgba(173, 216, 230, 0.2);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 15px 15px 0 0;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.05);
        }

        .footer-link {
          text-decoration: none;
          color: #3b82f6;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .footer-link:hover {
          color: #0c4a6e;
          text-decoration: underline;
        }

        .social-link {
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: #fff;
          font-size: 1.25rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
        }

        .social-link:hover {
          transform: scale(1.1);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </footer>
  );
}
