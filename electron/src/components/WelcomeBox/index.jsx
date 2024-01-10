"use strict";

import "./WelcomeBox.css";
import Icon from "../../assets/icon.ico";
import { useEffect, useState } from "react";
import { useSocket } from "../../SocketContext";

const WelcomeBox = (props) => {
  const [label, setLabel] = useState("Choose a Movie");

  const { socket, totalOnline, totalReady } = useSocket();

  const getFileName = (event) => {
    const fileName = event.target.files[0].name;
    setLabel(fileName);
  };

  const handleVideoUpload = (event) => {
    getFileName(event);
    props.handleVideoUpload(event);
    socket.emit("ready");
  };

  return (
    <div className="wrapper">
      <div className="welcome-box">
        <div>
          <img src={Icon} alt="" />
        </div>
        <div class="file-input">
          <input
            type="file"
            id="my-file"
            data-file-name=""
            onChange={handleVideoUpload}
          />
          <label for="my-file">{label}</label>
        </div>
        {totalOnline && (
          <span>
            {totalReady} of {totalOnline} ready
          </span>
        )}

        {totalReady == totalOnline && (
          <div>
            <button
              onClick={() => {
                props.setIsWatching(true);
                props.setPlaying(true);
              }}
            >
              Play
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeBox;
