import React, { useState, useRef } from "react";
import { ref as dbRef, push } from "firebase/database";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../../../firebaseConfig"; // make sure storage is initialized
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsImage, BsUpload, BsHash } from "react-icons/bs";

export default function UploadGalleryMedia() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file.");
    if (!caption.trim()) return toast.error("Please enter a caption.");

    setUploading(true);
    const storageReference = storageRef(storage, `gallery/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageReference, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(percent);
      },
      (error) => {
        toast.error("Upload failed: " + error.message);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await push(dbRef(db, "galleryMedia"), {
          src: downloadURL,
          caption: caption.trim(),
          timestamp: Date.now(),
          type: file.type.startsWith("video/") ? "video" : "image",
          user: auth.currentUser?.email || "Guest User",
          userPic: auth.currentUser?.photoURL || "icons/avatar.jpg",
        });
        toast.success("Upload successful!");
        setFile(null);
        setCaption("");
        setProgress(100);
        setUploading(false);
        fileInputRef.current.value = null;
      }
    );
  };

  return (
    <section className="d-flex justify-content-center align-items-center" style={{ minHeight: "92vh", background: "linear-gradient(135deg,#f9d423,#ff4e50)", padding: "20px" }}>
      <div className="card shadow-lg p-4 text-center" style={{ width: "100%", maxWidth: "420px", borderRadius: "20px", backgroundColor: "#fff" }}>
        <h3 className="fw-bold mb-3" style={{ color: "#ff4e50" }}>
          <BsUpload className="me-2" /> New Post
        </h3>

        {file && (
          <div className="mb-3">
            {file.type.startsWith("video/") ? (
              <video controls style={{ maxHeight: "200px", borderRadius: "10px", width: "100%" }}>
                <source src={URL.createObjectURL(file)} type={file.type} />
              </video>
            ) : (
              <img src={URL.createObjectURL(file)} alt="preview" style={{ maxHeight: "200px", borderRadius: "10px", objectFit: "cover" }} className="img-fluid" />
            )}
          </div>
        )}

        <form onSubmit={handleUpload} className="d-flex flex-column gap-3">
          <label className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center" style={{ borderRadius: "12px" }}>
            <BsImage className="me-2" /> Choose Media
            <input type="file" accept="image/*,video/*" onChange={handleFileChange} ref={fileInputRef} className="d-none" />
          </label>

          <div className="input-group">
            <span className="input-group-text bg-light"><BsHash /></span>
            <input type="text" placeholder="Write a caption..." value={caption} onChange={(e) => setCaption(e.target.value)} className="form-control" />
          </div>

          <button type="submit" className="btn w-100 text-white fw-bold" style={{ background: uploading ? "linear-gradient(90deg,#6a11cb,#2575fc)" : "linear-gradient(90deg,#ff4e50,#f9d423)", borderRadius: "12px" }} disabled={uploading}>
            {uploading ? `Uploading... (${progress}%)` : "Post"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
}
