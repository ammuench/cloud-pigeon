export const DEEP_LINK = "cloud-pigeon";

export const CHANNELS = {
  GET_GOOGLE_TOKEN: "app:get-google-token",
  UPDATE_ELECTRON_STORE: "app:update-electron-store",
  EXIT: "app:exit",
  OPEN_DESKTOP_BROWSER: "app:open-url",
} as const;

// TODO: Implement dev routes/constants
export const ROUTES = {
  signIn: "http://localhost:3001/api/electron-auth/fetchOauth",
};

// TODO: Implement dev routes/constants
export const FOLDER_NAME = "Cloud-Pigeon-Dev";
export const CONFIG_NAME = "cloud_pigeon.config";
