import React from "react";
import { Link } from "react-router-dom";

export default function ProFooter() {
  const socialLinks = [
    { icon: "bi-facebook", url: "https://facebook.com", color: "#3b5998" },
    { icon: "bi-instagram", url: "https://instagram.com", color: "#C13584" },
    { icon: "bi-linkedin", url: "https://linkedin.com", color: "#0e76a8" },
    { icon: "bi-github", url: "https://github.com", color: "#333" },
    { icon: "bi-twitter", url: "https://twitter.com", color: "#1DA1F2" },
  ];

  return (
    <footer className="pro-footer">
      <div className="container">
        <div className="footer-grid">
          {/* About */}
          <div className="footer-section about">
            <h3>Hridesh Bharati</h3>
            <p>
              Passionate web developer creating smooth, modern digital experiences with a focus on clarity and performance.
            </p>
            <div className="social-icons">
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
          <div className="footer-section links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Me</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section contact">
            <h4>Contact</h4>
            <p><i className="bi bi-geo-alt-fill"></i> Nichalul, Maharajganj, UP, India</p>
            <p><i className="bi bi-telephone-fill"></i> <a href="tel:+917267995307">+91 7267995307</a></p>
            <p><i className="bi bi-envelope-fill"></i> <a href="mailto:hrideshbharati027@gmail.com">hrideshbharati027@gmail.com</a></p>
          </div>

          {/* Newsletter */}
          <div className="footer-section newsletter">
            <h4>Newsletter</h4>
            <p>Subscribe to get updates on latest projects and articles.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed!");
              }}
            >
              <input
                type="email"
                placeholder="Your email"
                required
                aria-label="Email address"
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <hr />
        <p className="copyright">
          © {new Date().getFullYear()} Hridesh Bharati. All rights reserved.
        </p>
      </div>

      {/* Styles */}
      <style>{`
        .pro-footer {
          background: rgba(255 255 255 / 0.3);
          backdrop-filter: blur(20px);
          padding: 3rem 1.5rem 2rem;
          font-family: "Segoe UI Variable", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: #1e293b;
          user-select: none;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
          border-top: 1px solid rgba(0,0,0,0.1);
          margin-top: 5rem;
          border-radius: 15px 15px 0 0;
        }
        .container {
          max-width: 1140px;
          margin: 0 auto;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-section h3,
        .footer-section h4 {
          color: #0c4a6e;
          margin-bottom: 1rem;
          font-weight: 700;
          user-select: text;
        }

        .footer-section.about h3 {
          font-size: 1.6rem;
        }

        .footer-section p {
          font-size: 1rem;
          line-height: 1.6;
          color: #334155;
          user-select: text;
        }

        /* Quick Links */
        .footer-section.links ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-section.links ul li {
          margin-bottom: 0.8rem;
        }
        .footer-section.links ul li a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        .footer-section.links ul li a:hover {
          color: #0c4a6e;
          text-decoration: underline;
        }

        /* Contact */
        .footer-section.contact p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          color: #475569;
          font-size: 1rem;
        }
        .footer-section.contact a {
          color: #3b82f6;
          text-decoration: none;
        }
        .footer-section.contact a:hover {
          text-decoration: underline;
        }

        /* Social Icons */
        .social-icons {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        .social-link {
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: #fff;
          font-size: 1.3rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 3px 8px rgb(0 0 0 / 0.1);
          cursor: pointer;
        }
        .social-link:hover {
          transform: scale(1.2);
          box-shadow: 0 5px 15px rgb(0 0 0 / 0.2);
        }

        /* Newsletter */
        .footer-section.newsletter form {
          margin-top: 1rem;
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .footer-section.newsletter input[type="email"] {
          flex: 1 1 150px;
          padding: 0.6rem 1rem;
          border-radius: 9999px;
          border: 1.8px solid #94a3b8;
          font-size: 1rem;
          outline-offset: 2px;
          transition: border-color 0.3s ease;
        }
        .footer-section.newsletter input[type="email"]:focus {
          border-color: #3b82f6;
          outline: none;
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
        }
        .footer-section.newsletter button {
          background-color: #3b82f6;
          border: none;
          color: white;
          padding: 0.65rem 1.5rem;
          border-radius: 9999px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          flex-shrink: 0;
        }
        .footer-section.newsletter button:hover {
          background-color: #2563eb;
        }

        /* Horizontal rule */
        hr {
          border: none;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          margin: 1rem 0 1.5rem 0;
          user-select: none;
        }

        /* Copyright */
        .copyright {
          font-size: 0.9rem;
          text-align: center;
          color: #64748b;
          user-select: none;
        }

        /* Responsive */
        @media (max-width: 600px) {
          .footer-section.newsletter form {
            flex-direction: column;
            gap: 0.8rem;
          }
          .footer-section.newsletter input[type="email"] {
            flex: 1 1 auto;
          }
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
