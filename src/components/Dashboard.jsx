import React from "react";
import Topbar from "./Topbar";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="left">
        <div className="main">
          <Topbar />
        </div>

        <div className="searchbar">
          <input type="text" placeholder="Search" className="search" />
        </div>

        <div className="container">
          <div className="first">
            <div className="first-1">
              <div className="v-center h">
                <div>
                  <i class="fas fa-notes-medical icon"></i>&nbsp;Prescriptions
                </div>
              </div>
            </div>
          </div>
          <div className="second">
            <div className="v-center h">
              <div>
                <div className="center">
                  <i class="far fa-handshake icon-b"></i>
                </div>
                <div className="thin">Appointments</div>
              </div>
            </div>
          </div>
          <div className="third">
            <div className="third-3 v-center">
              <div className="white">User Profile</div>
            </div>
          </div>
        </div>
      </div>

      <div className="right-overlay">overlay</div>
    </div>
  );
};

export default Dashboard;
