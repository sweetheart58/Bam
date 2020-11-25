import React, { useState, useContext, useEffect } from "react";
import AppointmentList from "./AppointmentList";
import Diagnostics from "./Diagnostics";
import Payments from "./Payments";
import PrescriptionsList from "./PrescriptionsList";
import Topbar from "./Topbar";
import UserProfile from "./UserProfile";
import { Context } from "../store/Context";

const Dashboard = () => {
  const [view, setView] = useState("appointments");
  const [state, dispatch] = useContext(Context);
  const [search, setSearch] = useState([]);
  const handleView = (view) => {
    switch (view) {
      case "appointments":
        return <AppointmentList />;
      case "user":
        return <UserProfile data={state} />;
      case "prescriptions":
        return <PrescriptionsList />;
      case "payment":
        return <Payments />;
      case "diagnostics":
        return <Diagnostics />;
    }
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
    const newArray = state.userList.filter((m) =>
      m[5].toLowerCase().includes(e.target.value.toLowerCase())
    );

    setSearch(newArray);
  };

  console.log("NEWARRAY", search);

  useEffect(() => {
    const getData = async () => {
      let address = [];
      let users = [];

      const userCount = await state.contract.methods.getCountUsers().call();

      console.log("USERS COUNT", userCount);

      for (var i = 0; i < userCount; i++) {
        const ad = await state.contract.methods.getAddress(i).call();

        address.push(ad);
      }

      for (var i = 0; i < userCount; i++) {
        const user = await state.contract.methods.getUserof(address[i]).call();
        console.log("USER", user);
        users.push({
          ...user,
          6: address[i],
        });
      }

      dispatch({
        type: "USERS",
        payload: {
          address,
          users,
        },
      });
    };

    getData();
  }, []);

  console.log(state);
  return (
    <div className="dashboard">
      <div className="v-center float" onClick={() => setView("diagnostics")}>
        <div>
          <i class="fas fa-notes-medical icon primary"></i>
        </div>
      </div>
      <div className="left">
        <div className="main">
          <Topbar data={state} />
        </div>

        <div className="searchbar">
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            className="search"
          />
        </div>

        <div className="container">
          <div className="first">
            <div onClick={() => setView("prescriptions")} className="first-1">
              <div className="v-center h">
                <div>
                  <div className="center">
                    <i class="fas fa-file-medical icon"></i>
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
            <div
              onClick={() => setView("payment")}
              className="third-4 v-center"
            >
              <div>
                <div className="center white icon-b">
                  <i class="fas fa-money-check"></i>
                </div>
                <div className="white center">Payments</div>
              </div>
            </div>
          </div>
        </div>

        {search.length > 0 ? (
          <div className="container">
            <div className="w100">
              <h2 className="white">Search</h2>

              {search.map((e, i) => (
                <div className="white flex">
                  <div>
                    <p>
                      {i + 1}. {e[0]}
                    </p>
                  </div>

                  <div>
                    <p>{e[5]}</p>
                  </div>
                  <div>
                    <p>1 eth</p>
                  </div>
                  <div>
                    <p className="ap-btn">Add Appointment</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="right-overlay">{handleView(view)}</div>
    </div>
  );
};

export default Dashboard;
