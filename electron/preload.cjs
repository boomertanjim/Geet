const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("windowControls", {
  minimize: () => ipcRenderer.send("window:minimize"),
  toggleMaximize: () => ipcRenderer.invoke("window:toggle-maximize"),
  close: () => ipcRenderer.send("window:close"),
  isMaximized: () => ipcRenderer.invoke("window:is-maximized"),
});

contextBridge.exposeInMainWorld("musicAPI", {
  initializeDB: () => ipcRenderer.send("initialize-db"),
});

contextBridge.exposeInMainWorld("electronAPI", {
  folderPrompt: () => ipcRenderer.invoke("folder:prompt"),
  findMetaData: (songs) => ipcRenderer.invoke("find-meta-data", songs),
});
