import React, { useState, useEffect } from "react";
import db from "../firebase";
import { useHistory } from "react-router-dom";
const AppointmentList = ({ data }) => {
  const [list, setList] = useState([]);
  const history = useHistory();

  const processList = async (LIST, type) => {
    let newList = [];
    if (type === "patient") {
      LIST.forEach((e) => {
        if (e.patient === window.ethereum.selectedAddress) {
          newList.push(e);
        }
      });
    }

    if (type === "doctor") {
      LIST.forEach((e) => {
        if (e.patient === window.ethereum.selectedAddress) {
          newList.push(e);
        }
      });
    }

    return newList;
  };

  const handleJoinCall = (d) => {
    console.log(d);
    console.log(data);
    history.push({
      pathname: "/chat",
      state: {
        token: d.token,
        channel: d.channelId,
        doctor: d.name,
        patient: d.patient,
        doc: d.doctor,
        license: d.license,
      },
    });
  };

  useEffect(() => {
    const start = async (type) => {
      console.log("START");
      db.collection("appointments")
        .get()
        .then(async (querySnapshot) => {
          let list = [];
          querySnapshot.forEach(async (doc) => {
            list.push(doc.data());

            const finalList = await processList(list, type);

            console.log("FINAL", finalList);
            setList(finalList);
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    const type = data.type || data.user[2];

    if (type) {
      start(type);
    }
  }, [data]);

  console.log("APPOINTMENT LIST", list);
  const a = [1, 2, 3, 4, 5, 6];
  return (
    <div>
      <div className="view">
        <h1>Appointments</h1>
        <br />
        <table id="customers">
          <tbody>
            <tr>
              <th>Date</th>
              <th>Doctor</th>
              <th>Connect</th>
              <th>Fee</th>
            </tr>
            {list.map((e, i) => (
              <tr key={i}>
                <td>{e.at.toDate().toDateString()}</td>
                <td>{e.name}</td>
                <td>
                  <p onClick={() => handleJoinCall(e)} className="hover">
                    Join Call
                  </p>
                </td>
                <td>{e.fee} eth</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;
