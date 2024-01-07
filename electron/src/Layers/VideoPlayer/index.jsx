"use strict";

import { useState } from "react";
import ReactPlayer from "react-player";

import WelcomeBox from "../../components/WelcomeBox";

const VideoPlayer = ({ url }) => {
  const [videoFilePath, setVideoFilePath] = useState(null);

  const handleVideoUpload = (event) => {
    setVideoFilePath(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <>
      {!videoFilePath && <WelcomeBox handleVideoUpload={handleVideoUpload} />}
      {videoFilePath && (
        <ReactPlayer
          url={videoFilePath}
          width="100%"
          height="100%"
          controls={true}
        />
      )}
    </>
  );
};

export default VideoPlayer;
