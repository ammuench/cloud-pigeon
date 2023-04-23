import { ElectronStore, GoogleToken } from "./electron-store.types";

export interface ElectronWindow extends Window {
  electronAPI: {
    getGoogleToken: () => Promise<GoogleToken>;
    updateElectronStore: <K extends keyof ElectronStore>(
      key: K,
      newValue: ElectronStore[K]
    ) => Promise<ElectronStore>;
    exit: () => Promise<void>;
  };
}
