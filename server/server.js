"use strict";

import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";

const readySet = new Set();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const broadcastUpdate = () => {
  io.emit("count:online", io.sockets.sockets.size);
  io.emit("count:ready", readySet.size);
};

io.on("connection", (socket) => {
  broadcastUpdate();
  socket.on("ready", () => {
    readySet.add(socket.id);
    broadcastUpdate();
  });
  socket.on("video:control", (action) => {
    io.emit("video:control", action);
  });
  socket.on("video:scrub", (timestamp) => {
    io.emit("video:scrub", timestamp);
    console.log(timestamp);
  });
  socket.on("disconnect", () => {
    readySet.delete(socket.id);
    broadcastUpdate();
  });
});

server.listen(8080, () => {
  console.log("server is online at 8080");
});
