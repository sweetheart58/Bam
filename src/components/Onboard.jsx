import React, { useState, useContext } from "react";
import { Context } from "../store/Context";
import { useHistory } from "react-router-dom";
const Onboard = () => {
  const [state, dispatch] = useContext(Context);
  const history = useHistory();
  const [lstate, setState] = useState({
    type: "patient",
    age: "",
    specialisation: "",
    licenseCode: "",
  });

  const handleChange = (e) => {
    setState({
      ...lstate,
      [e.target.name]: e.target.value,
    });
  };
  console.log(lstate);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { contract, accounts } = state;
    console.log(contract, accounts);
    const res = await contract.methods
      .addUser(
        state.username,
        "",
        lstate.type,
        lstate.licenseCode,
        lstate.age,
        lstate.specialisation
      )
      .send({ from: accounts[0] });

    dispatch({
      type: "TYPE",
      payload: lstate.type,
    });
    console.log(res);

    history.push("/dashboard");
  };
  return (
    <div className="v-center h-100">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <select onChange={(e) => handleChange(e)} name="type">
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
          <div>
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="age"
              placeholder="age"
            />
          </div>
          {lstate.type == "doctor" && (
            <>
              {" "}
              <div>
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="specialisation"
                  placeholder="specialisation"
                />
              </div>
              <div>
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  name="licenseCode"
                  placeholder="License Code"
                />
              </div>
            </>
          )}
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboard;
