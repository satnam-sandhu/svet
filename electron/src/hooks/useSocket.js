"use strict";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [totalOnline, setTotalOnline] = useState(0);
  const [totalReady, setTotalReady] = useState(0);

  useEffect(() => {
    if (socket) return;
    setSocket(io("http://localhost:8080"));
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      setConnected(socket.connected);
    });
    socket.on("disconnect", () => {
      setConnected(socket.connected);
    });
    socket.on("count:online", (count) => {
      setTotalOnline(count);
    });
    socket.on("count:ready", (count) => {
      setTotalReady(count);
    });
  }, [socket]);

  return { connected, totalOnline, totalReady, socket };
};
