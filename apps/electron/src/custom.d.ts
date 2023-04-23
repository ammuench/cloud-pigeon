import { ElectronStore, GoogleToken } from "./types/JSON/electron-store.types";

declare global {
  interface Window {
    electronAPI: {
      getGoogleToken: () => Promise<GoogleToken>;
      updateElectronStore: <K extends keyof ElectronStore>(
        key: K,
        newValue: ElectronStore[K]
      ) => Promise<ElectronStore>;
      exit: () => Promise<void>;
    };
  }
}
