import React from "react";

const AppointmentList = () => {
  const a = [1, 2, 3, 4, 5, 6];
  return (
    <div>
      <div className="view">
        <h1>Appointments</h1>
        <br />
        <table id="customers">
          <tr>
            <th>Date</th>
            <th>Doctor</th>
            <th>Connect</th>
            <th>Fee</th>
          </tr>
          {a.map((e, i) => (
            <tr key={i}>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
              <td>300</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;
