import React, { useState, useEffect, useRef } from "react";

const postsData = [
  {
    tag: "News",
    date: "28 August 2025",
    title: "React 19 Stable Released with Built-in Server Components",
    img: "img/slider1.jpg",
    alt: "React 19 Stable Released with Built-in Server Components",
    linkText: "find out more",
    linkIcon: "arrow",
    href: "#",
  },
  {
    tag: "Video",
    date: "24 August 2025",
    title: "Building Scalable Frontends with Micro-Frontend Architecture",
    img: "img/slider2.jpg",
    alt: "Building Scalable Frontends with Micro-Frontend Architecture",
    linkText: "play video",
    linkIcon: "play-btn",
    href: "#",
  },
  {
    tag: "News",
    date: "20 August 2025",
    title: "Top 5 JavaScript Frameworks for 2025: What's Worth Learning Now",
    img: "img/d.jpg",
    alt: "Top 5 JavaScript Frameworks for 2025",
    linkText: "find out more",
    linkIcon: "arrow",
    href: "#",
  },
];


const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startProgress();
    return () => clearInterval(intervalRef.current);
  }, [activeIndex]);

  const startProgress = () => {
    clearInterval(intervalRef.current);
    setProgress(0);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          let nextIndex = activeIndex + 1;
          if (nextIndex >= postsData.length) nextIndex = 0;
          setActiveIndex(nextIndex);
          return 0;
        }
        return prev + 1;
      });
    }, 100);
  };

  const handlePostClick = (index) => {
    clearInterval(intervalRef.current);
    setActiveIndex(index);
    setProgress(0);
    startProgress();
  };

  return (
    <>
      <style>{`
        .carousel {
          min-height: 100vh;
          position: relative;
          background: #0e0d0e2f;
          color: white;
        }
        @media (max-width: 767px) {
        .carousel {
          min-height: 60vh;
        }
      }

        .progress-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 5px;
          width: 100%;
          z-index: 2;
        }
        .progress-bar__fill {
          width: 0;
          height: 100%;
          background: #3399ffff;
          transition: width 0.16s;
        }
        .main-post-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .slides {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .main-post {
          position: absolute;
          top: 100%;
          right: 0;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: all 0.9s ease-out;
        }
        .main-post.active {
          top: 0;
          opacity: 1;
          z-index: 1;
        }
        .main-post__image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .main-post__image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          filter: brightness(0.5);
        }
        .main-post__content {
          position: absolute;
          top: 40%;
          left: 4%;
          transform: translateY(-40%);
          color: #fff;
          width: 90%;
        }
        .main-post__tag {
          font-size: 0.95em;
          background: #c20000;
          padding: 6px 18px;
          display: inline-block;
          margin-bottom: 0.5em;
          user-select: none;
        }
        .main-post__title {
          font-weight: 700;
          font-size: 1.95em;
          line-height: 1.25;
          margin: 0 0 1em;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }
        .main-post__link {
          text-decoration: none;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          display: inline-flex;
          align-items: center;
          user-select: none;
        }
        .main-post__link-text {
          font-size: 0.9em;
        }
        .main-post__link-icon--arrow {
          margin-left: 12px;
          stroke: white;
          transition: stroke 0.3s;
        }
        .main-post__link:hover .main-post__link-text,
        .main-post__link:hover .main-post__link-icon--arrow {
          color: #c20000;
          stroke: #c20000;
        }
        .main-post__link-icon--play-btn {
          margin-right: 12px;
        }

        .posts-wrapper {
          display: none;
        }

        @media (min-width: 1024px) {
          .posts-wrapper {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            column-gap: 14px;
            position: absolute;
            bottom: 0;
            max-width: 95%;
            margin: auto;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            z-index: 1;
          }
          .post {
            background: rgba(14, 13, 14, 0.6);
            opacity: 0.3;
            color: #fff;
            position: relative;
            padding: 16px 20px;
            transition: opacity 0.2s linear;
            cursor: pointer;
            user-select: none;
          }
          .post.active {
            opacity: 1;
            background: rgba(14, 13, 14, 0.75);
            pointer-events: none;
          }
          .post__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.8em;
            margin-bottom: 8px;
          }
          .post__tag {
            color: #80837e;
          }
          .post__title {
            font-weight: 400;
            font-size: 0.95em;
            line-height: 1.5;
            margin: 0;
          }
          .progress-bar {
            position: relative;
            height: 4px;
            width: 100%;
            background: rgba(255, 255, 255, 0.1);
          }
          .progress-bar__fill {
            height: 100%;
            background: #c20000;
            width: 0;
            transition: width 0.16s;
          }
        }
      `}</style>

      <div className="carousel" style={{ marginTop: '60px' }}>
        <div className="progress-bar progress-bar--primary">
          <div
            className="progress-bar__fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <header className="main-post-wrapper">
          <div className="slides">
            {postsData.map((post, idx) => (
              <article
                key={idx}
                className={`main-post ${idx === activeIndex ? "active" : ""}`}
              >
                <div className="main-post__image">
                  <img src={post.img} alt={post.alt} loading="lazy" />
                </div>
                <div className="main-post__content">
                  <div className="main-post__tag-wrapper">
                    <span className="main-post__tag">{post.tag}</span>
                  </div>
                  <h1 className="main-post__title">{post.title}</h1>
                  <a className="main-post__link" href={post.href}>
                    {post.linkIcon === "play-btn" && (
                      <svg
                        className="main-post__link-icon main-post__link-icon--play-btn"
                        width="30"
                        height="30"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="10"
                          cy="10"
                          r="9"
                          stroke="#C20000"
                          strokeWidth="2"
                        />
                        <path d="M14 10L8 6V14L14 10Z" fill="white" />
                      </svg>
                    )}
                    <span className="main-post__link-text">{post.linkText}</span>
                    {post.linkIcon === "arrow" && (
                      <svg
                        className="main-post__link-icon main-post__link-icon--arrow"
                        width="37"
                        height="12"
                        viewBox="0 0 37 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 6H36.0001M36.0001 6L31.0001 1M36.0001 6L31.0001 11"
                          stroke="white"
                        />
                      </svg>
                    )}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </header>

        <div className="posts-wrapper">
          {postsData.map((post, idx) => (
            <article
              key={idx}
              className={`post ${idx === activeIndex ? "active" : ""}`}
              onClick={() => handlePostClick(idx)}
            >
              <div className="progress-bar">
                <div
                  className="progress-bar__fill"
                  style={{
                    width: idx === activeIndex ? `${progress}%` : "0%",
                  }}
                ></div>
              </div>
              <header className="post__header">
                <span className="post__tag">{post.tag}</span>
                <p className="post__published">{post.date}</p>
              </header>
              <h2 className="post__title">{post.title}</h2>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;