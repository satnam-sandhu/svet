// SocketContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [totalOnline, setTotalOnline] = useState(0);
  const [totalReady, setTotalReady] = useState(0);

  useEffect(() => {
    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
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

  return (
    <SocketContext.Provider
      value={{ socket, connected, totalOnline, totalReady }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
