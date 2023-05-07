import { contextBridge, ipcRenderer } from "electron";

import { ElectronStore, GoogleToken } from "./types/electron-store.types";
import { CHANNELS } from "./constants";

// API Definition
const electronAPI = {
  getGoogleToken: (): Promise<GoogleToken> =>
    ipcRenderer.invoke(CHANNELS.GET_GOOGLE_TOKEN),
  updateElectronStore: <K extends keyof ElectronStore>(
    key: K,
    newValue: ElectronStore[K]
  ): Promise<ElectronStore> =>
    ipcRenderer.invoke(CHANNELS.UPDATE_ELECTRON_STORE, [key, newValue]),
  openExternalBrowser: (url: string) =>
    ipcRenderer.invoke(CHANNELS.OPEN_DESKTOP_BROWSER, url),
  exit: () => ipcRenderer.send(CHANNELS.EXIT),
};

// Register the API with the contextBridge
process.once("loaded", () => {
  contextBridge?.exposeInMainWorld("electronAPI", electronAPI);
});
