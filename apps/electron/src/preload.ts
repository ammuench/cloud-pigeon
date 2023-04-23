import { contextBridge, ipcRenderer } from "electron";

import { ElectronStore, GoogleToken } from "./types/JSON/electron-store.types";

export const CHANNELS = {
  GET_GOOGLE_TOKEN: "app:get-google-token",
  UPDATE_ELECTRON_STORE: "app:update-electron-store",
  EXIT: "app:exit",
} as const;

// API Definition
const electronAPI = {
  getGoogleToken: (): Promise<GoogleToken> =>
    ipcRenderer.invoke(CHANNELS.GET_GOOGLE_TOKEN),
  updateElectronStore: <K extends keyof ElectronStore>(
    key: K,
    newValue: ElectronStore[K]
  ): Promise<ElectronStore> =>
    ipcRenderer.invoke(CHANNELS.UPDATE_ELECTRON_STORE, [key, newValue]),
  exit: () => ipcRenderer.send(CHANNELS.EXIT),
};

// Register the API with the contextBridge
process.once("loaded", () => {
  contextBridge?.exposeInMainWorld("electronAPI", electronAPI);
});
