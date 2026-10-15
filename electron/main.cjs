const { app, BrowserWindow } = require("electron");
require("@electron/remote/main").initialize();

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Geet",
    webPreferences: {
      enableRemoteModule: true,
    },
  });

  win.loadURL("http://localhost:5173");

  win.setMenuBarVisibility(false);
}

app.on("ready", createWindow);
