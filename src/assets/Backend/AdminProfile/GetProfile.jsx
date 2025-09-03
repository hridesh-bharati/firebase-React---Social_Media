import React, { useState, useEffect } from "react";
import { ref, onValue, remove } from "firebase/database";
import { db } from "../../../firebaseConfig";
import UseAuthStatus from "../CreateAdmin/UseAuthStatus";
const GetProfile = () => {
  const { isAuthenticated, checkingStatus } = UseAuthStatus();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profilesRef = ref(db, "profiles");
    const unsubscribe = onValue(profilesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([key, val]) => ({
          id: key,
          ...val,
        }));
        setProfiles(list);
      } else {
        setProfiles([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      try {
        await remove(ref(db, `profiles/${id}`));
        alert("Profile deleted successfully.");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete profile: " + error.message);
      }
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!profiles.length) return <p>No profiles found.</p>;

  return (
    <div>
      {profiles.map((p) => (
        <section
          key={p.id}
          className="container my-4 p-4 shadow rounded"
          style={{ maxWidth: "900px", backgroundColor: "#fff" }}
        >
          <div className="text-end w-100 mb-3">
            {
              isAuthenticated && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(p.id)}
                  title="Delete Profile"
                >
                  Delete
                </button>
              )}
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-4 d-flex justify-content-center">
              {p.about?.photo ? (
                <img
                  src={p.about.photo}
                  alt="Profile"
                  className="rounded-circle border border-primary shadow"
                  style={{ width: 140, height: 140, objectFit: "cover" }}
                />
              ) : (
                <div
                  className="rounded-circle border border-secondary d-flex align-items-center justify-content-center"
                  style={{ width: 140, height: 140, fontSize: 48, color: "#aaa" }}
                >
                  ?
                </div>
              )}
            </div>

            <div className="col-md-8">
              <h3 className="fw-bold">{p.about?.title}</h3>
              <p>{p.about?.description}</p>
              <div>
                <strong>Phone:</strong> {p.contact?.phone || "N/A"}
              </div>
              <div>
                <strong>Email:</strong> {p.contact?.email || "N/A"}
              </div>
            </div>
          </div>

          <h4 className="mb-3 text-primary fw-bold">Social Links</h4>
          <div className="d-flex flex-wrap gap-3">
            {p.socialLinks?.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center gap-2 px-3 py-2 rounded"
                style={{
                  backgroundColor: link.color || "#333",
                  color: "#fff",
                  textDecoration: "none",
                  minWidth: 120,
                }}
                title={link.label || link.url}
              >
                <i
                  className={link.icon}
                  style={{ fontSize: "1.5rem" }}
                  aria-hidden="true"
                ></i>
                <span>{link.label || "Link"}</span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default GetProfile;
