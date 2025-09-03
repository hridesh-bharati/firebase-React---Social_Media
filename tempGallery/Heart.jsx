import React, { useState, useEffect } from "react";

export default function Heart({ liked = false, onToggle }) {
  const [burst, setBurst] = useState(false);
  const [localLiked, setLocalLiked] = useState(liked);

  useEffect(() => {
    setLocalLiked(liked); // parent se sync
  }, [liked]);

  const handleClick = () => {
    setLocalLiked(!localLiked);
    setBurst(true);
    if (onToggle) onToggle(); // parent ko notify karega
    setTimeout(() => setBurst(false), 500);
  };

  return (
    <div className="heart-container">
      <button
        className={`heart-btn ${localLiked ? "liked" : ""}`}
        onClick={handleClick}
      >
        <span className="heart-icon"></span>
        {burst && <span className="burst"></span>}
      </button>

      <style>{`
        .heart-container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .heart-btn {
          position: relative;
          width: 40px;
          height: 40px;
          background: none;
          border: none;
          outline: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .heart-btn:active {
          transform: scale(0.8);
        }

        .heart-icon {
          width: 30px;
          height: 30px;
          background: url("data:image/svg+xml;utf8,<svg fill='gray' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>")
            no-repeat center/contain;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .liked .heart-icon {
          background: url("data:image/svg+xml;utf8,<svg fill='red' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>")
            no-repeat center/contain;
          transform: scale(1.2);
        }

        .burst {
          position: absolute;
          width: 40px;
          height: 40px;
          border: 2px solid rgba(255, 0, 0, 0.5);
          border-radius: 50%;
          animation: burstAnim 0.5s ease forwards;
        }

        @keyframes burstAnim {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
