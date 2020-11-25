import React from "react";

const PrescriptionsList = () => {
  const a = [1, 2, 3, 4, 5, 6];
  return (
    <div>
      <div className="view">
        <h1>Prescriptions</h1>
        <br />
        <table id="customers">
          <tr>
            <th>Date</th>
            <th>Doctor</th>
            <th>Prescription</th>
          </tr>
          {a.map((e, i) => (
            <tr key={i}>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default PrescriptionsList;
