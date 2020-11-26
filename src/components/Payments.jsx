import React, { useState, useEffect } from "react";
import db from "../firebase";
import { useHistory } from "react-router-dom";
import getWeb3 from "../getWeb3";

import Bam from "../abi/Bam.json";

const Payments = ({ data, contract }) => {
  console.log("PAYMENT CONTRACT", contract);
  const [list, setList] = useState([]);
  const history = useHistory();

  const setup = async () => {
    try {
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Bam.networks[networkId];

      const instance = new web3.eth.Contract(
        Bam.abi,
        deployedNetwork && deployedNetwork.address
      );

      return instance;
    } catch (e) {
      console.log("ERROR FROM SETUP -> CONNECT", e);
    }
  };

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
  const pay = async (d) => {
    try {
      const contract = await setup();
      console.log(d.doctor, d.patient);
      const res = await contract.methods
        .pay(d.doctor, d.fee)
        .send({ from: d.patient });

      console.log(res);
      console.log(contract);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <h1>Payments</h1>
      </div>
      <br />
      <table id="customers">
        <tbody>
          <tr>
            <th>Date</th>
            <th>Doctor</th>

            <th>Fee</th>
            <th>Pay</th>
          </tr>
          {list.map((e, i) => (
            <tr key={i}>
              <td>{e.at.toDate().toDateString()}</td>
              <td>{e.name}</td>

              <td>{e.fee} eth</td>
              <td className="center">
                <div onClick={() => pay(e)} className="v-center send">
                  <div>Pay</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payments;
