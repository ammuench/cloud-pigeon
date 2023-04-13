// // See the Electron documentation for details on how to use preload scripts:
// // https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// import CHANNELS from "./shared/channels";

// const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("channels", {
//   exportCSV: (tableData: any[]) =>
//     ipcRenderer.invoke(CHANNELS.EXPORT_CSV, tableData),
//   openExternalBrowser: (url: string) =>
//     ipcRenderer.invoke(CHANNELS.OPEN_DESKTOP_BROWSER, url),
//   saveConfig: (configDataStr: string) =>
//     ipcRenderer.invoke(CHANNELS.SAVE_FILE, configDataStr),
//   loadConfig: (configDataStr: string) =>
//     ipcRenderer.invoke(CHANNELS.LOAD_FILE, configDataStr),
// });
