import React, { useState } from "react";
import AppointmentList from "./AppointmentList";
import Diagnostics from "./Diagnostics";
import Payments from "./Payments";
import PrescriptionsList from "./PrescriptionsList";
import Topbar from "./Topbar";
import UserProfile from "./UserProfile";

const Dashboard = () => {
  const [view, setView] = useState("appointments");

  const handleView = (view) => {
    switch (view) {
      case "appointments":
        return <AppointmentList />;
      case "user":
        return <UserProfile />;
      case "prescriptions":
        return <PrescriptionsList />;
      case "payment":
        return <Payments />;
      case "diagnostics":
        return <Diagnostics />;
    }
  };
  return (
    <div className="dashboard">
      <div className="v-center float" onClick={() => setView("diagnostics")}>
        <div>
          <i class="fas fa-notes-medical icon primary"></i>
        </div>
      </div>
      <div className="left">
        <div className="main">
          <Topbar />
        </div>

        <div className="searchbar">
          <input type="text" placeholder="Search" className="search" />
        </div>

        <div className="container">
          <div className="first">
            <div onClick={() => setView("prescriptions")} className="first-1">
              <div className="v-center h">
                <div>
                  <div className="center">
                    <i class="fas fa-file-medical"></i>
                  </div>
                  <div>Prescriptions</div>
                </div>
              </div>
            </div>
          </div>
          <div className="second">
            <div onClick={() => setView("appointments")} className="v-center h">
              <div>
                <div className="center">
                  <i class="far fa-handshake icon-b"></i>
                </div>
                <div className="thin">Appointments</div>
              </div>
            </div>
          </div>
          <div className="third">
            <div onClick={() => setView("user")} className="third-3 v-center">
              <div className="white">User Profile</div>
            </div>
            <div onClick={() => setView("user")} className="third-4 v-center">
              <div>
                <div className="center white icon-b">
                  <i class="fas fa-money-check"></i>
                </div>
                <div className="white center">Paymnets</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="right-overlay">{handleView(view)}</div>
    </div>
  );
};

export default Dashboard;
