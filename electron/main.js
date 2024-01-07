"use strict";

import path from "path";
import url from "url";
import { app, BrowserWindow } from "electron";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: path.join(__dirname, "./icons/icon.png"),
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "./dist/index.html"),
      protocol: "file:",
      slashes: true,
    });

  win.loadURL(startUrl);

  process.env.ELECTRON_START_URL ? win.webContents.openDevTools() : null;
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
