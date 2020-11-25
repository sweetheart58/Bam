import React from "react";

const UserProfile = ({ data }) => {
  return (
    <div className="h-100">
      <h1>User Profile</h1>
      <br />
      <br />
      {data ? (
        <div className="v-center h-100">
          <div>
            <div className="center">
              <img className="userimage" src={data.imageUrl} alt="user" />
            </div>
            <div className="center">
              <h2>{data.username}</h2>
              <h3>{data.email}</h3>
              <h3>{data.user[4]}</h3>
            </div>
          </div>
        </div>
      ) : (
        <p>Data error</p>
      )}
    </div>
  );
};

export default UserProfile;
