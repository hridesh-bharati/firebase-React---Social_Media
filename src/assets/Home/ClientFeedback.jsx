import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FluentClientFeedback() {
  const feedbacks = [
    {
      feedback:
        "Collaborating with this developer was seamless. Their understanding of full-stack technologies and attention to detail helped us ship a critical feature ahead of schedule.",
      client: "Alex Johnson",
      role: "Tech Lead at Meta",
    },
    {
      feedback:
        "One of the most resourceful and self-motivated developers I’ve mentored. Their ability to break down complex problems and write clean, efficient code is impressive.",
      client: "Sophia Lee",
      role: "Senior Software Engineer at Amazon",
    },
    {
      feedback:
        "Their contribution to our open-source project brought immediate performance improvements. Great communication and consistent code quality.",
      client: "Daniel Kim",
      role: "Maintainer at OpenAI OSS",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <section className="fluent-feedback-section" aria-labelledby="feedback-title">
      <h2 id="feedback-title">Client & Mentor Feedback</h2>

      <Slider {...sliderSettings} className="feedback-slider">
        {feedbacks.map(({ feedback, client, role }, idx) => (
          <blockquote className="feedback-card" key={idx}>
            <p className="feedback-text" aria-label="Client feedback">
              <q>{feedback}</q>
            </p>
            <footer className="client-info">
              <h5>{client}</h5>
              <p>{role}</p>
            </footer>
          </blockquote>
        ))}
      </Slider>

      <style>{`
        .fluent-feedback-section {
          max-width: 720px;
          margin: 4rem auto;
          padding: 0 1rem;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: #1e293b;
          text-align: center;
          user-select: none;
        }

        .fluent-feedback-section h2 {
          font-weight: 700;
          font-size: 2.5rem;
          margin-bottom: 2rem;
          color: #0c4a6e;
          text-shadow: 0 2px 6px rgba(12, 74, 110, 0.3);
        }

        .feedback-slider {
          padding: 0 1rem;
        }

        .feedback-card {
          background: rgba(255 255 255 / 0.25);
          backdrop-filter: blur(18px);
          border-radius: 18px;
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.08),
            0 0 0 1px rgba(255, 255, 255, 0.12);
          padding: 2.5rem 2rem;
          margin: 0 auto;
          max-width: 600px;
          transition: transform 0.3s ease;
        }

        .feedback-card:hover {
          transform: translateY(-6px);
        }

        .feedback-text {
          font-style: italic;
          font-size: 1.25rem;
          line-height: 1.7;
          color: #134e8a;
          margin-bottom: 2rem;
        }

        .client-info h5 {
          font-weight: 700;
          font-size: 1.2rem;
          color: #0c4a6e;
          margin-bottom: 0.25rem;
        }

        .client-info p {
          font-weight: 600;
          font-size: 1rem;
          color: #3b82f6;
          margin: 0;
        }

        @media (max-width: 480px) {
          .feedback-text {
            font-size: 1.1rem;
          }

          .fluent-feedback-section h2 {
            font-size: 2rem;
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
