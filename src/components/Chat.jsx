import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk";
import { useLocation } from "react-router-dom";
import config from "../config.json";

import genToken from "../util";

const Call = (props) => {
  const [client, setClient] = useState(null);
  const [stream, setStream] = useState(null);
  const [chatState, setChatState] = useState({
    channelName: null,
    token: null,
  });

  const location = useLocation();

  console.log("LOCATION", location);

  const TOKEN = location.state.token;
  const CHANNEL = location.state.channel;

  const addVideoStream = (elementId) => {
    let remoteContainer = document.getElementById("remote-container");
    // Creates a new div for every stream
    let streamDiv = document.createElement("div");
    // Assigns the elementId to the div.
    streamDiv.id = elementId;
    // Takes care of the lateral inversion
    streamDiv.style.transform = "rotateY(180deg)";
    // Adds the div to the container.
    remoteContainer.appendChild(streamDiv);
  };

  const removeVideoStream = (elementId) => {
    let remoteDiv = document.getElementById(elementId);
    if (remoteDiv) remoteDiv.parentNode.removeChild(remoteDiv);
  };

  const errorHandler = (err) => {
    console.log(`Error:${err}`);
  };

  useEffect(() => {
    // const res = genToken();
    const TOKEN = location.state.token;
    const CHANNEL = location.state.channel;
    const meetingChannel = CHANNEL;
    const meetingToken = TOKEN;
    console.log(meetingChannel);
    setChatState({ channelName: meetingChannel, token: meetingToken });
    let agoraClient = AgoraRTC.createClient({
      mode: "rtc",
      codec: "vp8",
    });

    agoraClient.init(config.AGORA_APP_ID);
    setClient(agoraClient);
  }, []);

  const clickHandler = () => {
    // Join a channel
    client.join(
      chatState.token,
      chatState.channelName,
      null,
      (uid) => {
        // Create a local stream
        let localStream = AgoraRTC.createStream({
          audio: true,
          video: true,
        });
        // Initialize the local stream
        localStream.init(() => {
          // Play the local stream
          localStream.play("me");
          // Publish the local stream
          client.publish(localStream, errorHandler);
          setStream(localStream);
        }, errorHandler);
      },
      errorHandler
    );
    // Subscribe to the remote stream when it is published
    client.on("stream-added", function (evt) {
      client.subscribe(evt.stream, errorHandler);
    });
    // Play the remote stream when it is subsribed
    client.on("stream-subscribed", function (evt) {
      let stream = evt.stream;
      let streamId = String(stream.getId());
      addVideoStream(streamId);
      stream.play(streamId);
    });
    // Remove the corresponding view when a remote user unpublishes.
    client.on("stream-removed", function (evt) {
      let stream = evt.stream;
      let streamId = String(stream.getId());
      stream.close();
      removeVideoStream(streamId);
    });
    // Remove the corresponding view when a remote user leaves the channel.
    client.on("peer-leave", function (evt) {
      let stream = evt.stream;
      let streamId = String(stream.getId());
      stream.close();
      removeVideoStream(streamId);
    });
  };

  const leaveCall = () => {
    stream.close();
    stream.stop();
  };
  return (
    <React.Fragment>
      <div className="banner">
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
          <div className="flex v-center"></div>
        </div>
        <h1>
          Talk to Dr. {location.state.doctor}
          <h4>Lisence: {location.state.license}</h4>
          <br />
        </h1>

        <div id="me"></div>
        <div id="remote-container"></div>
        <button className="btn" onClick={clickHandler}>
          Join Call
        </button>
        <button className="btn" onClick={leaveCall}>
          Leave Call
        </button>
      </div>
    </React.Fragment>
  );
};

export default Call;
