import React from "react";

const Diagnostics = () => {
  return (
    <div>
      <h1>Diagnostics</h1>
      <div className="cont">
        <div className="chat"></div>
        <div className="input flex">
          <div className="text">
            <form>
              <input className="message" type="text" />
              <button className="send" type="submit">
                Send
              </button>
            </form>
          </div>
          <div className="mic v-center">
            <div>
              <i class="fas fa-microphone"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnostics;
