import React from "react";

export default function ImageGallery() {
  const images = [
    { src: "img/a.jpg", alt: "Tech 1" },
    { src: "img/b.jpg", alt: "Code 2" },
    { src: "img/c.jpg", alt: "Design 3" },
    { src: "img/d.jpg", alt: "Programming 4" },
  ];

  return (
    <section className="container my-5">
      <h2 className="text-center text-warning fw-bold mb-3">Awesome Image Gallery</h2>
      <p className="text-center mb-4 text-secondary">Who are in extremely love with eco friendly system.</p>
      <div className="gallery-grid">
        {images.map(({ src, alt }, idx) => (
          <div className="gallery-item" key={idx} tabIndex={0} aria-label={`Image titled ${alt}`}>
            <img src={src} alt={alt} loading="lazy" />
            <div className="overlay" aria-hidden="true">
              <p>{alt}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          box-shadow:
            0 4px 8px rgba(0, 0, 0, 0.12),
            0 0 8px rgba(0, 120, 255, 0.1);
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(8px);
        }

        .gallery-item:focus,
        .gallery-item:hover {
          transform: scale(1.06);
          box-shadow:
            0 8px 20px rgba(0, 0, 0, 0.18),
            0 0 20px rgba(0, 120, 255, 0.4);
          z-index: 10;
          background: rgba(255, 255, 255, 0.12);
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
          border-radius: 16px;
          user-select: none;
          pointer-events: none;
        }

        .gallery-item:hover img,
        .gallery-item:focus img {
          transform: scale(1.12);
        }

        .overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(8px);
          color: white;
          padding: 14px 18px;
          opacity: 0;
          transition: opacity 0.3s ease;
          font-weight: 600;
          font-size: 1.1rem;
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
          user-select: none;
          pointer-events: none;
        }

        .gallery-item:hover .overlay,
        .gallery-item:focus .overlay {
          opacity: 1;
          pointer-events: auto;
        }

        /* Responsive adjustments */
        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .gallery-item {
            border-radius: 12px;
          }

          .gallery-item img {
            border-radius: 12px;
          }

          .overlay {
            font-size: 1rem;
            padding: 12px 14px;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
          }
        }
      `}</style>
    </section>
  );
}
