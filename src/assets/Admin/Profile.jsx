import React from 'react';

const Profile = () => {
  return (
    <div className="container py-5">
      <div className="row">
        {/* Left Section: Profile Picture */}
        <div className="col-md-4 text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="User Profile"
            className="img-fluid rounded-circle mb-3"
          />
          <h3>John Doe</h3>
          <p>Software Developer</p>
          <div className="social-links">
            {/* Social Media Icons */}
            <a href="https://www.linkedin.com/in/johndoe/" className="btn btn-linkedin btn-sm m-1" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://facebook.com/johndoe" className="btn btn-primary btn-sm m-1" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/johndoe" className="btn btn-info btn-sm m-1" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://plus.google.com/johndoe" className="btn btn-danger btn-sm m-1" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-google-plus-g"></i>
            </a>
          </div>
        </div>

        {/* Right Section: Profile Details */}
        <div className="col-md-8">
          <h2 className="mb-4">Profile Information</h2>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Bio</h5>
              <p className="card-text">
                Passionate software developer with a focus on building scalable web applications. 
                Experienced with front-end and back-end development. Enthusiast of modern JavaScript frameworks like React and Node.js.
              </p>

              <h5 className="card-title mt-4">Contact Information</h5>
              <ul className="list-unstyled">
                <li>
                  <strong>Email:</strong> johndoe@example.com
                </li>
                <li>
                  <strong>Phone:</strong> (123) 456-7890
                </li>
                <li>
                  <strong>Location:</strong> New York, USA
                </li>
              </ul>

              <h5 className="card-title mt-4">Skills</h5>
              <ul className="list-unstyled">
                <li>JavaScript (React, Node.js)</li>
                <li>HTML, CSS, SASS</li>
                <li>Version Control (Git, GitHub)</li>
                <li>Database Management (MySQL, MongoDB)</li>
              </ul>

              <button className="btn btn-success mt-4">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
