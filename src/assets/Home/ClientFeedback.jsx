import React from "react";

export default function FluentClientFeedback() {
  const feedbacks = [
    {
      feedback:
        "It is very easy to start smoking but it is an uphill task to quit it. Ask any chain smoker or even a person.",
      client: "Harriet Maxwell",
      role: "CEO at Google",
    },
    {
      feedback:
        "Do you want to be even more successful? Learn to love learning and growth. The more effort you put into improving your skills, the bigger the payoff you.",
      client: "Harriet Maxwell",
      role: "CEO at Google",
    },
  ];

  return (
    <section className="fluent-feedback-section" aria-labelledby="feedback-title">
      <h2 id="feedback-title">Client’s Feedback About Me</h2>
      <div className="feedback-grid">
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
      </div>

      <style>{`
        .fluent-feedback-section {
          max-width: 960px;
          margin: 4rem auto;
          padding: 0 1rem;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: #1e293b;
          text-align: center;
          user-select: none;
        }
        .fluent-feedback-section h2 {
          font-weight: 700;
          font-size: 2.75rem;
          margin-bottom: 2.5rem;
          color: #0c4a6e; /* deep blue */
          text-shadow: 0 2px 6px rgba(12,74,110,0.3);
        }

        .feedback-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
        }

        .feedback-card {
          background: rgba(255 255 255 / 0.25);
          backdrop-filter: blur(18px);
          border-radius: 18px;
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.08),
            0 0 0 1px rgba(255, 255, 255, 0.12);
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: box-shadow 0.3s ease, transform 0.35s ease;
          cursor: default;
          user-select: text;
        }

        .feedback-card:hover,
        .feedback-card:focus-within {
          box-shadow:
            0 12px 36px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          transform: translateY(-8px);
          outline: none;
        }

        .feedback-text {
          font-style: italic;
          font-size: 1.25rem;
          line-height: 1.7;
          color: #134e8a;
          margin-bottom: 2.25rem;
          user-select: text;
        }

        .feedback-text q {
          quotes: "“" "”" "‘" "’";
        }

        .client-info h5 {
          font-weight: 700;
          font-size: 1.2rem;
          color: #0c4a6e;
          margin-bottom: 0.25rem;
          user-select: none;
        }

        .client-info p {
          font-weight: 600;
          font-size: 1rem;
          color: #3b82f6;
          margin: 0;
          user-select: none;
        }

        /* Responsive tweaks */
        @media (max-width: 480px) {
          .feedback-text {
            font-size: 1.1rem;
          }
          .fluent-feedback-section h2 {
            font-size: 2rem;
            margin-bottom: 1.8rem;
          }
        }
      `}</style>
    </section>
  );
}
