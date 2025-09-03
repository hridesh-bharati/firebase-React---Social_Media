import React, { useState, useEffect } from "react";
import { ref, onValue, remove } from "firebase/database";
import { db } from "../../../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as FaIcons from "react-icons/fa";
import UseAuthStatus from "../CreateAdmin/UseAuthStatus";
const DelWhatido = () => {
  const { isAuthenticated, checkingStatus } = UseAuthStatus();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const servicesRef = ref(db, "whatido");
    const unsubscribe = onValue(servicesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedServices = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setServices(loadedServices.reverse());
      } else {
        setServices([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await remove(ref(db, `whatido/${id}`));
      toast.success(`Deleted "${title}" successfully.`);
    } catch (error) {
      toast.error("Failed to delete: " + error.message);
      console.error(error);
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (services.length === 0) return <div className="text-center py-5">No services found.</div>;

  return (
    <section className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">What I Do</h2>
        <p className="text-muted">Here are some of my areas of expertise</p>
      </div>

      <div className="row g-4">
        {services.map((service) => {
          // Dynamically get icon component by name
          const IconComponent = service.icon && FaIcons[service.icon] ? FaIcons[service.icon] : FaIcons.FaLayerGroup;

          return (
            <div key={service.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow border-0 hover-shadow">
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <div>
                    <div
                      className="mb-3"
                      style={{
                        fontSize: "2.5rem",
                        color: service.color || "#000",
                      }}
                    >
                      <IconComponent />
                    </div>
                    <h5 className="card-title fw-bold">{service.title}</h5>
                    <p className="card-text text-muted">{service.description}</p>
                  </div>
                  {isAuthenticated && (
                    <button
                      className="btn btn-outline-danger mt-3"
                      onClick={() => handleDelete(service.id, service.title)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ToastContainer position="top-right" />
    </section>
  );
};

export default DelWhatido;
