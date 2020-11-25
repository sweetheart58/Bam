import React from "react";

const Topbar = (props) => {
  return (
    <div>
      <div className="topbar">
        <div className="flex ">
          <div className="v-center">
            <div>
              <i class="fas fa-th-large icon"></i>
            </div>{" "}
            &nbsp; &nbsp;
          </div>
          <div>
            <p className="title">Bam</p>
          </div>
        </div>
        <div className="flex v-center">
          {props.data ? (
            <div className="flex white">
              <div className="v-center">
                <div>{props.data.username}</div>
              </div>
              <div>
                <img
                  className="imageuser"
                  src={props.data.imageUrl}
                  alt={props.data.username}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
