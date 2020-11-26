import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import config from "../config.json";

const UserMessage = (props) => {
  return <div className="user-message">{props.data}</div>;
};

const BotMessage = (props) => {
  return <div className="bot-message">{props.data}</div>;
};

const Diagnostics = () => {
  const [state, setState] = useState({ messages: [] });
  const [isListening, setListening] = useState(false);
  const { transcript, resetTranscript, listening } = useSpeechRecognition();
  useEffect(() => {
    if (state.messages.length === 0) {
      const newMessage = {
        sender: "bot",
        data: "Welcome to Bam. How are you feeling today?",
      };
      const newMessages = [...state.messages];
      newMessages.push(newMessage);
      setState({ messages: [...newMessages] });
    } else {
      const lastMessage = state.messages[state.messages.length - 1];
      if (lastMessage.sender === "user") {
        async function getDiseases(data) {
          console.log("Getting diseases");
          console.log(state.messages);
          const res = await axios.post(
            "https://api.infermedica.com/v2/parse",
            {
              text: data,
              age: { value: 30 },
            },
            {
              headers: {
                "Content-Type": "application/json",
                "App-key": config.INFERMEDICA_APP_KEY,
                "App-Id": config.INFERMEDICA_APP_ID,
              },
            }
          );

          const newMessages = [...state.messages];
          const message = {
            sender: "bot",
            data: "Here's what I found that could be troubling you:",
          };
          newMessages.push(message);
          res.data.mentions.forEach((e) => {
            const diseaseName = e.name;
            const commonName = e.common_name;
            let diseaseData;
            if (diseaseName === commonName) {
              diseaseData = ` -${diseaseName}`;
            } else {
              diseaseData = ` -${diseaseName} (${commonName})`;
            }
            const diseaseMessage = {
              sender: "bot",
              data: diseaseData,
            };
            newMessages.push(diseaseMessage);
          });
          setState({ messages: newMessages });
        }
        getDiseases(lastMessage.data);
      }
    }
  }, [state.messages]);

  const messageHandler = async (e) => {
    e.preventDefault();
    const data = document.getElementsByClassName("message")[0].value;
    let newMessages = state.messages.slice();
    let message = { sender: "user", data };
    newMessages.push(message);

    setState({ messages: newMessages });
    document.getElementsByClassName("message")[0].value = null;
  };

  const renderMessages = () => {
    return state.messages !== undefined
      ? state.messages.map((message, index) => {
          if (message.sender === "bot") {
            return <BotMessage data={message.data} key={index} />;
          } else {
            return <UserMessage data={message.data} key={index} />;
          }
        })
      : "";
  };

  const voiceHandler = async (e) => {
    console.log("Voice handler called");
    e.preventDefault();
    console.log(listening);
    if (listening === false) {
      await SpeechRecognition.startListening();
    } else {
      SpeechRecognition.abortListening();
      let newMessages = state.messages.slice();
      let message = { sender: "user", data: transcript };
      newMessages.push(message);
      setState({ messages: newMessages });
    }
  };

  return (
    <div>
      <h1>Diagnostics</h1>
      <br />
      <div className="cont">
        <div className="chat">{renderMessages()}</div>
        <div className="input flex">
          <div className="text">
            <form>
              <input className="message" type="text" />
              <button className="send" onClick={messageHandler}>
                Send
              </button>
            </form>
          </div>
          <div className="mic v-center">
            <div>
              <i class="fas fa-microphone" onClick={voiceHandler}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnostics;
