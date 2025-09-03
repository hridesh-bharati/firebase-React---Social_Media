import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../../../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      contactNo: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, contactNo, subject, message } = formData;

    if (!name || !contactNo || !subject || !message) {
      toast.error("All fields are required!");
      return;
    }

    try {
      await push(ref(db, "contactMessages"), {
        name,
        contactNo,
        subject,
        message,
        timestamp: Date.now(),
      });

      toast.success("Message sent successfully!");
      setFormData({ name: "", contactNo: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Error sending message: " + error.message);
    }
  };

  return (
    <div className="container p-4 mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 shadow">
          <h2 className="mb-4 text-center text-primary">CONTACT-ME</h2>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-control"
              />
              <div className="invalid-feedback">Please enter your name.</div>
            </div>

            <div className="mb-3">
              <PhoneInput
                country={"us"}
                value={formData.contactNo}
                onChange={handlePhoneChange}
                inputProps={{
                  name: "contactNo",
                  required: true,
                  className: "form-control w-100",
                  placeholder: "Contact No",
                }}
                enableSearch={true}
                countryCodeEditable={false}
                specialLabel=""
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="form-control"
              />
              <div className="invalid-feedback">Please enter a subject.</div>
            </div>

            <div className="mb-3">
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="form-control"
                rows={4}
              />
              <div className="invalid-feedback">Please enter your message.</div>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 mb-2">
              Send
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
