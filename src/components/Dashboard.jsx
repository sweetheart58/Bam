import React, { useState, useContext, useEffect } from "react";
import AppointmentList from "./AppointmentList";
import Diagnostics from "./Diagnostics";
import Payments from "./Payments";
import PrescriptionsList from "./PrescriptionsList";
import Topbar from "./Topbar";
import UserProfile from "./UserProfile";
import { Context } from "../store/Context";
import db from "../firebase";
import getWeb3 from "../getWeb3";

import Bam from "../abi/Bam.json";

import genToken from "../util";
const Dashboard = () => {
  const [view, setView] = useState("appointments");
  const [state, dispatch] = useContext(Context);
  const [search, setSearch] = useState([]);
  const handleView = (view, s) => {
    switch (view) {
      case "appointments":
        return <AppointmentList data={s} />;
      case "user":
        return <UserProfile data={s} />;
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

  const setup = async () => {
    console.log("IN SETUP");
    console.log("CONTEXT", state);
    try {
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Bam.networks[networkId];

      const instance = new web3.eth.Contract(
        Bam.abi,
        deployedNetwork && deployedNetwork.address
      );

      dispatch({
        type: "CONTRACT",
        payload: {
          instance,
          accounts,
        },
      });

      return instance;
    } catch (e) {
      console.log("ERROR FROM SETUP -> CONNECT", e);
    }
  };
  useEffect(() => {
    const getData = async () => {
      let address = [];
      let users = [];

      const contract = await setup();

      const userAddress = window.ethereum.selectedAddress;
      const user = await contract.methods.getUserof(userAddress).call();

      dispatch({
        type: "USER",
        payload: user,
      });

      const userCount = await contract.methods.getCountUsers().call();

      console.log("USERS COUNT", userCount);

      for (var i = 0; i < userCount; i++) {
        const ad = await contract.methods.getAddress(i).call();

        address.push(ad);
      }

      for (var i = 0; i < userCount; i++) {
        const user = await contract.methods.getUserof(address[i]).call();
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

  const handleAddAppointment = (dData) => {
    console.log("APPOINTMENT DATA", dData);
    const agoraRTC = genToken();
    console.log("agoraRTC", agoraRTC);

    db.collection("appointments")
      .add({
        patient: window.ethereum.selectedAddress,
        doctor: dData[6],
        at: new Date(),
        fee: 1,
        token: agoraRTC.token,
        channelId: agoraRTC.channelName,
        name: dData[0],
        license: dData[3],
      })
      .then((e) => {
        console.log(e);
        console.log(e.id);
      })
      .catch((e) => console.log(e));
  };
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
                <div key={i} className="white flex">
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
                    <p
                      onClick={() => handleAddAppointment(e)}
                      className="ap-btn"
                    >
                      Add Appointment
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="right-overlay">{handleView(view, state)}</div>
    </div>
  );
};

export default Dashboard;
