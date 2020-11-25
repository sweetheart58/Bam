import React from "react";

const Payments = () => {
  const a = [1, 2, 3, 4, 5, 6];
  return (
    <div>
      <div>
        <h1>Payments</h1>
      </div>
      <br />
      <table id="customers">
        <tr>
          <th>Date</th>
          <th>Doctor</th>

          <th>Fee</th>
          <th>Pay</th>
        </tr>
        {a.map((e, i) => (
          <tr key={i}>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>

            <td>300</td>
            <td className="center">
              <div className="v-center send">
                <div>Pay</div>
              </div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Payments;
