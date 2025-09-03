import React, { useState } from "react";
export default function ShareButton({ url, title = "Check this out!" }) {
  const [open, setOpen] = useState(false);

  const shareLinks = [
    { name: "WhatsApp", icon: "bi-whatsapp", url: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`, color: "#25D366" },
    { name: "Facebook", icon: "bi-facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, color: "#4267B2" },
    { name: "Instagram", icon: "bi-instagram", url: `https://www.instagram.com/?url=${encodeURIComponent(url)}`, color: "#E1306C" },
    { name: "Snapchat", icon: "bi-snapchat", url: `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(url)}`, color: "#FFFC00" },
    { name: "LinkedIn", icon: "bi-linkedin", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, color: "#0077b5" },
    { name: "Telegram", icon: "bi-telegram", url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, color: "#0088cc" },
    { name: "TikTok", icon: "bi-tiktok", url: `https://www.tiktok.com/share?url=${encodeURIComponent(url)}`, color: "#000000" },
    { name: "Email", icon: "bi-envelope", url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`, color: "#EA4335" },
  ];

  return (
    <>
      <button className="share-btn" onClick={() => setOpen(true)}>📤 Share</button>

      {open && (
        <>
          <div className="share-backdrop" onClick={() => setOpen(false)}></div>

          <div className="share-offcanvas">
            <h5 className="share-title">Share this</h5>
            <div className="share-grid">
              {shareLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-item"
                  style={{ backgroundColor: s.color }}
                  onClick={() => setOpen(false)}
                >
                  <i className={`bi ${s.icon} p-0 m-0 lh-0 share-icon`}></i>
                  <span className="share-name">{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      <style>{`
        .share-btn {
          background: #333;
          color: #fff;
          border: none;
          padding: 8px 14px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
        }
        .share-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          z-index: 100;
        }
        .share-offcanvas {
          position: fixed;
          left: 0;
          bottom: 0;
          width: 100%;
          max-height: 50vh;
          height: 50vh;
          background: #fff;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          padding: 16px;
          z-index: 101;
          transform: translateY(100%);
          animation: slideUp 0.3s forwards;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        @keyframes slideUp { to { transform: translateY(0); } }
        .share-title { font-weight: bold; font-size: 16px; margin-bottom: 16px; }
        .share-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
          width: 100%;
        }
        .share-item {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          text-decoration: none;
          font-weight: bold;
          transition: transform 0.2s ease;
        }
        .share-item:hover { transform: scale(1.1); }
        .share-icon { font-size: 24px; margin-bottom: 4px; }
        .share-name { font-size: 10px; text-align: center; }
      `}</style>
    </>
  );
}
