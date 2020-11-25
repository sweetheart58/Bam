import React from "react";

const Topbar = () => {
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
          <div className="flex">
            <div>username</div>
            <div>icon</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
