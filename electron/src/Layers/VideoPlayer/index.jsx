"use strict";

import _ from "lodash";

import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";

import WelcomeBox from "../../components/WelcomeBox";
import { useSocket } from "../../SocketContext";

const VideoPlayer = ({ url }) => {
  const playerRef = useRef(null);

  const [videoFilePath, setVideoFilePath] = useState(null);
  const [isWatching, setIsWatching] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [scrubType, setScrubType] = useState("manual");

  const { socket } = useSocket();

  const handleVideoUpload = (event) => {
    setVideoFilePath(URL.createObjectURL(event.target.files[0]));
  };

  const debouncedSeek = _.debounce((timestamp) => {
    socket.emit("video:scrub", timestamp);
  }, 300);

  useEffect(() => {
    if (!socket) return;
    socket.on("video:control", (action) => {
      setPlaying(action == "play");
      if (!isWatching) setIsWatching(true);
    });
    socket.on("video:scrub", (timestamp) => {
      if (playerRef.current) {
        setScrubType("code");
        playerRef.current.seekTo(timestamp);
        setTimeout(() => {
          setScrubType("manual");
        }, 1000);
      }
    });
  }, [socket]);

  return (
    <>
      {!isWatching && (
        <WelcomeBox
          handleVideoUpload={handleVideoUpload}
          setIsWatching={setIsWatching}
          setPlaying={setPlaying}
        />
      )}
      {isWatching && (
        <ReactPlayer
          ref={playerRef}
          url={videoFilePath}
          width="100%"
          height="100%"
          controls={true}
          playing={playing}
          volume={1}
          muted={false}
          onPlay={() => {
            socket.emit("video:control", "play");
          }}
          onPause={() => {
            socket.emit("video:control", "pause");
          }}
          onSeek={(timestamp) => {
            if (scrubType == "manual") socket.emit("video:scrub", timestamp);
          }}
        />
      )}
    </>
  );
};

export default VideoPlayer;
