import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../../../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as FaIcons from "react-icons/fa";

const faIconList = Object.entries(FaIcons).map(([name, Icon]) => ({
  name,
  Icon,
}));

export default function Whatido() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    color: "#00b135",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "color") {
      setFormData({ ...formData, color: value.slice(0, 7) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleIconSelect = (iconName) => {
    setFormData({ ...formData, icon: iconName });
    toast.success(`Icon "${iconName}" selected.`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description, icon, color } = formData;

    if (!title || !description || !icon || !color) {
      toast.error("All fields are required.");
      return;
    }

    try {
      await push(ref(db, "whatido"), {
        title,
        description,
        icon,
        color,
        timestamp: Date.now(),
      });

      toast.success("Successfully saved to Firebase!");
      setFormData({
        title: "",
        description: "",
        icon: "",
        color: "#00b135",
      });
    } catch (error) {
      toast.error("Error saving data: " + error.message);
      console.error("Firebase error:", error);
    }
  };

  const SelectedIcon = formData.icon && FaIcons[formData.icon];

  // Filter icons based on search term
  const filteredIcons = faIconList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-3">
      <h2 className="text-center mb-4">What I Do?</h2>

      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm mb-4">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Icon's Color</label>
          <input
            type="color"
            name="color"
            className="form-control form-control-color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>

        {SelectedIcon && (
          <div className="mb-3 text-center">
            <strong>Selected Icon:</strong><br />
            <SelectedIcon style={{ fontSize: "2rem", color: formData.color }} />
            <div>{formData.icon}</div>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search icons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light sticky-top">
            <tr>
              <th style={{ width: "60px" }}>Icon</th>
              <th>Name</th>
              <th style={{ width: "100px" }}>Select</th>
            </tr>
          </thead>
          <tbody>
            {filteredIcons.map(({ name, Icon }) => (
              <tr key={name}>
                <td className="text-center" style={{ fontSize: "1.5rem" }}>
                  <Icon />
                </td>
                <td>{name}</td>
                <td>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => handleIconSelect(name)}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
            {filteredIcons.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No icons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
}
