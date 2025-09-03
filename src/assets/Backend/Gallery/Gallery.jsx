import React, { useEffect, useState } from "react";
import { db, auth } from "../../../firebaseConfig";
import "./Gallery.css";
import { ref, onValue, set, remove, push, serverTimestamp } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import Heart from "./Heart";
import ShareButton from "./ShareBtn";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL?.toLowerCase().trim();

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [offcanvasImage, setOffcanvasImage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [guestId, setGuestId] = useState(null);

  // Guest ID
  useEffect(() => {
    let id = localStorage.getItem("guestId");
    if (!id) {
      id = "guest_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
      localStorage.setItem("guestId", id);
    }
    setGuestId(id);
  }, []);

  // Auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return () => unsub();
  }, []);

  // Load images
  useEffect(() => {
    const galleryRef = ref(db, "galleryImages");
    return onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sorted = Object.entries(data)
          .map(([id, v]) => ({ id, ...v }))
          .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setImages(sorted);
      } else {
        setImages([]);
      }
    });
  }, []);

  // Check admin
  const isAdmin = () => (currentUser?.email || "").toLowerCase().trim() === ADMIN_EMAIL;

  // Like toggle
  const toggleLike = async (id) => {
    const userId = currentUser?.uid || guestId;
    if (!userId) return;
    const img = images.find((img) => img.id === id);
    const alreadyLiked = img?.likes?.[userId];

    if (alreadyLiked) {
      await remove(ref(db, `galleryImages/${id}/likes/${userId}`));
    } else {
      await set(ref(db, `galleryImages/${id}/likes/${userId}`), true);
    }
  };

  // Add comment
  const addComment = async (id) => {
    if (!commentText.trim()) return;
    const userId = currentUser?.uid || guestId;
    const userName = currentUser?.email || "Guest";
    await push(ref(db, `galleryImages/${id}/comments`), {
      userId,
      userName,
      text: commentText,
      timestamp: serverTimestamp(),
    });
    setCommentText("");
  };

  // Delete comment (admin OR owner)
  const deleteComment = async (postId, commentId, commentUserId) => {
    const currentId = currentUser?.uid || guestId;
    if (isAdmin() || currentId === commentUserId) {
      await remove(ref(db, `galleryImages/${postId}/comments/${commentId}`));
    }
  };


  // Delete photo (admin only)
  const deleteImage = async (imgId) => {
    if (!isAdmin()) return; // enforce admin-only delete
    await remove(ref(db, `galleryImages/${imgId}`));
    setOffcanvasImage(null);
  };


  return (
    <div className="my-5 py-4">
      <div className="gallery-feed">
        {images.length === 0 && <p className="text-center">
          <img src="icons/cameraico.png" alt="img" className="img-fluid"/>
          Loading pictures...</p>}
        {images.map((img) => {
          const userId = currentUser?.uid || guestId;
          const liked = img.likes?.[userId];
          const likeCount = img.likes ? Object.keys(img.likes).length : 0;

          return (
            <div key={img.id} className="card insta-card mb-4">
              {/* Header */}
              <div className="card-header d-flex align-items-center bg-white border-0">
                <img
                  src={img.userPic || "icons/avatar.jpg"}
                  alt="profile"
                  className="rounded-circle me-2"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <strong>{img.user || "Guest User"}</strong>
                <button
                  className="btn btn-sm border rounded-pill ms-auto"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#imageOffcanvas"
                  onClick={() => setOffcanvasImage(img)}
                >
                  <i className="bi bi-three-dots"></i>
                </button>
              </div>

              {/* Image */}
              <div className="insta-img-wrapper">
                <img src={img.src} alt="Gallery" className="insta-img" />
              </div>

              {/* Actions */}
              <div className="card-body p-2">
                <div className="d-flex align-items-center mb-2">
                  {/* Like */}
                  <button
                    className={`btn btn-link btn-lg p-0 me-3 ${liked ? "text-danger" : "text-dark"}`}
                    onClick={() => toggleLike(img.id)}
                  >
                    <Heart />
                  </button>

                  {/* Comment button (scroll to comment box) */}
                  <button
                    className="btn btn-link p-0 me-3 text-dark"
                    onClick={() => {
                      const input = document.getElementById(`comment-input-${img.id}`);
                      if (input) input.focus();
                    }}
                  >
                    <i className="bi bi-chat display-6 small"></i>
                  </button>

                  {/* Share */}
                  <ShareButton url={img.src} title={img.caption || "Check this image!"} />
                </div>

                {/* Like count below actions */}
                {likeCount > 0 && <div className="fw-bold small mb-1">{likeCount} likes</div>}

                {/* Caption */}
                <p className="mb-1">
                  <strong>{img.user || "Guest"}:</strong> {img.caption}
                </p>

                {/* Comments */}
                <div className="comments">
                  {img.comments &&
                    Object.entries(img.comments).map(([cId, c]) => (
                      <div
                        key={cId}
                        className="d-flex justify-content-between align-items-center mb-1 small"
                      >
                        <p className="mb-0">
                          <strong>{c.userName}:</strong> {c.text}
                        </p>
                        {(isAdmin() || c.userId === (currentUser?.uid || guestId)) && (
                          <button
                            className="btn btn-sm btn-outline-danger ms-2 py-0"
                            onClick={() => deleteComment(img.id, cId, c.userId)}
                          >
                            ❌
                          </button>
                        )}
                      </div>
                    ))}
                </div>

                {/* Add Comment */}
                <div className="d-flex mt-2">
                  <input
                    id={`comment-input-${img.id}`}
                    type="text"
                    className="form-control form-control-sm me-2"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => addComment(img.id)}
                  >
                    Post
                  </button>
                </div>
              </div>

            </div>
          );
        })}

        {/* Offcanvas */}
        <div
          className="offcanvas offcanvas-bottom"
          tabIndex="-1"
          id="imageOffcanvas"
          aria-labelledby="imageOffcanvasLabel"
          style={{ height: "40vh" }}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="imageOffcanvasLabel">
              {offcanvasImage?.caption || "Photo"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            {offcanvasImage && (
              <>
                <p>
                  <strong>Uploaded:</strong>{" "}
                  {offcanvasImage.timestamp
                    ? new Date(offcanvasImage.timestamp).toLocaleString()
                    : "Unknown"}
                </p>
                {isAdmin() && (
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteImage(offcanvasImage.id)}
                  >
                    Delete Photo
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
