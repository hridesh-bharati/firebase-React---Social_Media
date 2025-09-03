import React from "react";
import VisitorCounter from "./VisitorCounter";
import MessageCount from "./MessageCount";
import PieChart from "./PieChart"; // ✅ Pie Chart (amCharts)
import "bootstrap/dist/css/bootstrap.min.css";

const WelcomeAdmin = () => {
  return (
    <main className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">Welcome Back, Admin!</h1>
        <p className="lead text-muted">
          Manage your dashboard efficiently and monitor all your important metrics at a glance.
        </p>
        <a href="#" className="btn btn-primary btn-lg mt-3 shadow">
          Get Started
        </a>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 justify-content-center">
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card text-center shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <div className="display-5 fw-bold text-success">
                <VisitorCounter />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card text-center shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h5 className="card-title">Total Messages</h5>
              <p className="display-5 fw-bold text-primary">
                <MessageCount />
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card text-center shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h5 className="card-title">Revenue</h5>
              <p className="display-5 fw-bold text-warning">$24,892</p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="card text-center shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h5 className="card-title">Support Tickets</h5>
              <p className="display-5 fw-bold text-danger">127</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row justify-content-center mt-5 g-4">
        {/* Pie Chart */}
        <div className="col-12 col-md-6 col-lg-6">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h5 className="card-title text-center">Sales Distribution</h5>
              <PieChart />
            </div>
          </div>
        </div>

        {/* Placeholder for Future Chart */}
        <div className="col-12 col-md-6 col-lg-6">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body text-center">
              <h5 className="card-title">Revenue Growth</h5>
              <p className="text-muted">
                (📊 You can integrate Line Chart / Bar Chart here)
              </p>
              <div
                style={{
                  width: "100%",
                  height: "300px",
                  background: "#f8f9fa",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#888",
                  fontStyle: "italic",
                }}
              >
                Chart Coming Soon...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task & Performance Cards */}
      <div className="row mt-5 g-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h5 className="card-title">Recent Activities</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">✔️ New User Registered</li>
                <li className="list-group-item">📨 5 Messages Sent</li>
                <li className="list-group-item">💰 Payment Received - $250</li>
                <li className="list-group-item">🎫 Ticket #453 Closed</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body text-center">
              <h5 className="card-title">Performance Overview</h5>
              <p className="display-6 fw-bold text-success">87%</p>
              <p className="text-muted">Overall System Efficiency</p>
              <button className="btn btn-outline-primary btn-sm">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WelcomeAdmin;
