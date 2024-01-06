"use strict";

import "./WelcomeBox.css";
import Icon from "../../assets/icon.ico";
import { useState } from "react";

const WelcomeBox = (props) => {
  const [label, setLabel] = useState("Choose a Movie");

  const getFileName = (event) => {
    const fileName = event.target.files[0].name;
    setLabel(fileName);
  };

  return (
    <div className="wrapper">
      <div className="welcome-box">
        <img src={Icon} alt="" />
        <div class="file-input">
          <input
            type="file"
            id="my-file"
            data-file-name=""
            onChange={(event) => {
              //   props.handleVideoUpload(event);
              getFileName(event);
            }}
          />
          <label for="my-file">{label}</label>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBox;
