import React, { useState } from "react";
import { ref, push } from "firebase/database"; // 🧩 Firebase DB
import { db } from "../../../firebaseConfig";   // ✅ Your DB instance
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialSocialLink = { icon: "", url: "", color: "", label: "" };

// ⚠️ Put your actual ImgBB API key here:
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

const UploadProfile = () => {
  const [about, setAbout] = useState({
    title: "",
    description: "",
    photo: "", // preview only
  });

  const [contact, setContact] = useState({
    phone: "",
    email: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [socialLinks, setSocialLinks] = useState([initialSocialLink]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("about.")) {
      const key = name.split(".")[1];
      setAbout((prev) => ({ ...prev, [key]: value }));
    } else if (name.startsWith("contact.")) {
      const key = name.split(".")[1];
      setContact((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setAbout((prev) => ({
        ...prev,
        photo: URL.createObjectURL(file),
      }));
    }
  };

  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index][field] = value;
    setSocialLinks(updatedLinks);
  };

  const addSocialLink = () => {
    setSocialLinks((prev) => [...prev, initialSocialLink]);
  };

  const deleteSocialLink = (index) => {
    setSocialLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!about.title.trim() || !about.description.trim()) {
      toast.error("Please fill in the title and description.");
      return;
    }
    if (!contact.phone.trim() || !contact.email.trim()) {
      toast.error("Please enter valid phone and email.");
      return;
    }
    for (let i = 0; i < socialLinks.length; i++) {
      const { icon, url, color, label } = socialLinks[i];
      if (!icon || !url || !color || !label) {
        toast.error(`Social Link ${i + 1} is incomplete.`);
        return;
      }
    }

    try {
      let uploadedPhotoUrl = about.photo; // fallback if no new photo selected

      if (photoFile) {
        // Upload to ImgBB
        const formData = new FormData();
        formData.append("image", photoFile);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        if (data.success) {
          uploadedPhotoUrl = data.data.url;
        } else {
          throw new Error("ImgBB upload failed");
        }
      }

      // Prepare profile data with ImgBB photo URL
      const profileData = {
        about: {
          ...about,
          photo: uploadedPhotoUrl,
        },
        contact,
        socialLinks,
        timestamp: Date.now(),
      };

      // Save profile data to Firebase DB
      await push(ref(db, "profiles"), profileData);

      toast.success("Profile uploaded to Firebase!");

      // Reset form
      setAbout({ title: "", description: "", photo: "" });
      setContact({ phone: "", email: "" });
      setPhotoFile(null);
      setSocialLinks([initialSocialLink]);
    } catch (err) {
      console.error(err);
      toast.error("Error uploading profile: " + err.message);
    }
  };

  return (
    <section
      className="container my-4 p-4 shadow rounded"
      style={{ maxWidth: "900px", backgroundColor: "#fff" }}
    >
      <h2 className="text-center mb-4 text-primary fw-bold">
        Edit About Me Section
      </h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* About & Contact */}
        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <label className="form-label fw-bold text-secondary">Title</label>
            <input
              type="text"
              className="form-control"
              name="about.title"
              value={about.title}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-bold text-secondary">Phone</label>
            <input
              type="tel"
              className="form-control"
              name="contact.phone"
              value={contact.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-bold text-secondary">Email</label>
            <input
              type="email"
              className="form-control"
              name="contact.email"
              value={contact.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label fw-bold text-secondary">Description</label>
          <textarea
            className="form-control"
            name="about.description"
            rows={4}
            value={about.description}
            onChange={handleChange}
          />
        </div>

        {/* Photo */}
        <div className="row g-3 mb-4 align-items-center">
          <div className="col-md-6">
            <label className="form-label fw-bold text-secondary">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handlePhotoChange}
            />
          </div>
          {(photoFile || about.photo) && (
            <div className="col-md-6 d-flex justify-content-center">
              <img
                src={about.photo}
                alt="Preview"
                className="rounded-circle"
                style={{ width: 120, height: 120, objectFit: "cover" }}
              />
            </div>
          )}
        </div>

        {/* Social Links */}
        <h4 className="mb-3 text-primary fw-bold">Social Links</h4>
        {socialLinks.map((link, idx) => (
          <div key={idx} className="d-flex gap-2 mb-2 flex-wrap">
            <input
              type="text"
              className="form-control"
              placeholder="Icon"
              value={link.icon}
              onChange={(e) =>
                handleSocialLinkChange(idx, "icon", e.target.value)
              }
            />
            <input
              type="url"
              className="form-control"
              placeholder="URL"
              value={link.url}
              onChange={(e) =>
                handleSocialLinkChange(idx, "url", e.target.value)
              }
            />
            <input
              type="text"
              className="form-control"
              placeholder="Color"
              value={link.color}
              onChange={(e) =>
                handleSocialLinkChange(idx, "color", e.target.value)
              }
            />
            <input
              type="text"
              className="form-control"
              placeholder="Label"
              value={link.label}
              onChange={(e) =>
                handleSocialLinkChange(idx, "label", e.target.value)
              }
            />
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteSocialLink(idx)}
            >
              &times;
            </button>
          </div>
        ))}

        <div className="text-center my-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={addSocialLink}
          >
            + Add Social Link
          </button>
        </div>

        <button type="submit" className="btn btn-warning w-100 fw-bold">
          Upload Profile
        </button>
      </form>

      <ToastContainer />
    </section>
  );
};

export default UploadProfile;
