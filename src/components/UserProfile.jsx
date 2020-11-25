import React from "react";

const UserProfile = () => {
  return (
    <div className="h-100">
      <h1>User Profile</h1>
      <br />
      <br />
      <div className="v-center h-100">
        <div>
          <div className="center">
            <img
              className="userimage"
              src="https://via.placeholder.com/150"
              alt="user"
            />
          </div>
          <div className="center">
            <h2>Lorem, ipsum.</h2>
            <h3>lorem@gmail.com</h3>
            <h3>22</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
