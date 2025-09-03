import React, { useEffect, useState } from "react";
import { db, auth } from "../../../firebaseConfig"; // <-- auth import
import "./Gallery.css";
import {
  ref,
  onValue,
  update,
  remove,
  push,
  serverTimestamp,
} from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import Heart from "./Heart";
import ShareButton from "./ShareBtn";

export default function GetAllimages() {
  const [images, setImages] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [offcanvasImage, setOffcanvasImage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ Listen auth state (user login hai ya nahi)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  // ✅ Fetch images
  useEffect(() => {
    const galleryRef = ref(db, "galleryImages");
    onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const sorted = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)); // latest first ✅
        setImages(sorted);
      } else {
        setImages([]);
      }
    });
  }, []);


  // ✅ Like / Unlike
  const toggleLike = async (id, userId = currentUser?.uid || "guestUser") => {
    const likeRef = ref(db, `galleryImages/${id}/likes/${userId}`);
    const alreadyLiked = images.find((img) => img.id === id)?.likes?.[userId];

    if (alreadyLiked) {
      await remove(likeRef);
    } else {
      await update(ref(db, `galleryImages/${id}/likes`), { [userId]: true });
    }
  };

  // ✅ Add Comment
  const addComment = async (id, user = currentUser?.email || "Guest") => {
    if (!commentText.trim()) return;
    await push(ref(db, `galleryImages/${id}/comments`), {
      user,
      text: commentText,
      timestamp: serverTimestamp(),
    });
    setCommentText("");
  };

  // ✅ Delete Comment (only admin/login user)
  const deleteComment = async (postId, commentId) => {
    if (!currentUser) {
      alert("Login required to delete comments!");
      return;
    }
    try {
      await remove(ref(db, `galleryImages/${postId}/comments/${commentId}`));
    } catch (error) {
      alert("Failed to delete comment: " + error.message);
    }
  };

  // ✅ Offcanvas Controls
  const openOffcanvas = (img) => setOffcanvasImage(img);
  const closeOffcanvas = () => {
    setOffcanvasImage(null);
    setShowDeleteModal(false);
  };

  const openDeleteModal = () => setShowDeleteModal(true);
  const closeDeleteModal = () => setShowDeleteModal(false);

  // ✅ Delete Image (only if logged in)
  const handleDelete = async () => {
    if (!offcanvasImage) return;
    if (!currentUser) {
      alert("Login required to delete images!");
      return;
    }
    try {
      await remove(ref(db, `galleryImages/${offcanvasImage.id}`));
      closeDeleteModal();
      closeOffcanvas();
    } catch (error) {
      alert("Failed to delete image: " + error.message);
    }
  };

  return (
    <div className="mt-5 pt-4">
      <div className="gallery-feed">
        {images.map((img) => (
          <div key={img.id} className="card insta-card mb-4">
            {/* Post Header */}
            <div className="card-header d-flex align-items-center bg-white border-0">
              <img
                src={img.userPic || "icons/avatar.jpg"}
                alt="profile"
                className="rounded-circle me-2"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
              <strong>{img.user || "Guest User"}</strong>

              {/* More Options */}
              <button
                className="btn btn-sm border rounded-pill ms-auto"
                onClick={() => openOffcanvas(img)}
              >
                <i className="bi bi-three-dots"></i>
              </button>
            </div>

            {/* Post Image */}
            <div className="insta-img-wrapper">
              <img src={img.src} alt="Gallery" className="insta-img" />
            </div>

            {/* Action Buttons */}
            <div className="card-body p-2">
              <div className="d-flex align-items-center mb-2">
                <button
                  className="btn btn-link p-0 me-3 text-danger"
                  onClick={() => toggleLike(img.id)}
                >
                  <Heart /> {img.likes ? Object.keys(img.likes).length : 0}
                </button>

                <ShareButton url={img.src} title={img.caption || "Check this image!"} />

              </div>

              {/* Caption */}
              <p className="mb-1">
                <strong>{img.user || "Guest"}</strong> {img.caption}
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
                        <strong>{c.user}:</strong> {c.text}
                      </p>
                      {currentUser && (
                        <button
                          className="btn btn-sm btn-outline-danger ms-2 py-0"
                          onClick={() => deleteComment(img.id, cId)}
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
        ))}

        {/* ✅ Offcanvas */}
        {offcanvasImage && (
          <>
            <div
              className="offcanvas-backdrop fade show"
              onClick={closeOffcanvas}
              style={{ zIndex: 1040 }}
            ></div>
            <div
              className="offcanvas offcanvas-bottom show w-100 bg-white"
              tabIndex="-1"
              style={{ visibility: "visible", zIndex: 1045, height: "45vh" }}
              aria-modal="true"
              role="dialog"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title">Photo Details</h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  aria-label="Close"
                  onClick={closeOffcanvas}
                ></button>
              </div>
              <div className="offcanvas-body pb-5">
                <p>
                  <strong>Caption:</strong>{" "}
                  {offcanvasImage.caption || "No caption"}
                </p>
                <p>
                  <strong>Uploaded:</strong>{" "}
                  {offcanvasImage.timestamp
                    ? new Date(offcanvasImage.timestamp).toLocaleString()
                    : "Unknown"}
                </p>

                {/* Delete button only if logged in */}
                {currentUser && (
                  <button
                    className="btn btn-danger mt-3"
                    onClick={openDeleteModal}
                  >
                    Delete Photo
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {/* ✅ Delete Confirmation Modal */}
        {showDeleteModal && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeDeleteModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this photo?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeDeleteModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
