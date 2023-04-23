import { app, BrowserWindow, ipcMain, shell } from "electron";
import store from "electron-store";
import path from "path";

import * as DEV_TOKEN from "../../../DEV_TOKEN.json";

import { reauthGoogleToken } from "./services/google-refresh-token.service";
import { ElectronStore, GoogleToken } from "./types/JSON/electron-store.types";
import { DEEP_LINK } from "./constants";
import { CHANNELS } from "./preload";

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const isDev = !process.env.PRODUCTION;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow: BrowserWindow;

const logEverywhere = (s: any) => {
  console.log(s);
  if (mainWindow && mainWindow.webContents) {
    let safeS = typeof s === "string" ? s : JSON.stringify(s);
    mainWindow.webContents.executeJavaScript(`console.log('${safeS}')`);
  }
};

export const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1280,
    resizable: false,
    title: "Cloud Pigeon",
    backgroundColor: "#202020",
    autoHideMenuBar: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient(DEEP_LINK, process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient(DEEP_LINK);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
});

let deeplinkingUrl;

// TODO define isDev
if (isDev && process.platform === "win32") {
  // Set the path of electron.exe and your app.
  // These two additional parameters are only available on windows.
  // Setting this is required to get this working in dev mode.
  // app.setAsDefaultProtocolClient(`${DEEP_LINK}`, process.execPath, [
  //   resolve(process.argv[1]),
  // ]);
} else {
  app.setAsDefaultProtocolClient(`${DEEP_LINK}`);
}

app.on("open-url", function (event, url) {
  event.preventDefault();
  deeplinkingUrl = url;
  // TODO: HANDLE RETURN TOKEN HERE
  logEverywhere({
    label: "HELLO FROM DEEPLINK1",
    deeplinkingUrl,
    event,
    url,
  });
});

// Force single application instance
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (e, argv) => {
    if (process.platform !== "darwin") {
      // Find the arg that is our custom protocol url and store it
      // TODO: HANDLE RETURN TOKEN HERE
      deeplinkingUrl = argv.find((arg) => arg.startsWith(`${DEEP_LINK}://`));
      logEverywhere("app.makeSingleInstance# " + deeplinkingUrl);
      logEverywhere({
        label: "HELLO FROM DEEPLINK2",
        deeplinkingUrl,
        e,
        argv,
      });
    }

    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const appStore = new store<ElectronStore>();
const googleToken = appStore.get("googleToken");

const openSignin = () => {
  const url = "http://localhost:3001/api/electron-auth/fetchOauth";
  shell.openExternal(url);
};

const reauthToken = async (currentToken: GoogleToken) => {
  try {
    const newToken = await reauthGoogleToken(currentToken);
    return newToken;
  } catch (e) {
    // TODO: handle error
    openSignin();
    console.error(e);
  }
};

//TODO: Remove console logs after debugging
if (googleToken) {
  console.log("[INFO] Have token, attempting reauth");
  reauthToken(googleToken).then((newToken) => {
    appStore.set("googleToken", {
      ...googleToken,
      ...newToken,
    });
    console.log("[SUCCESS] Successful reauth");
    console.log({
      googleToken,
      newToken,
    });
  });
} else {
  console.log("[INFO] No token, looking to get one");
  if (isDev) {
    if (DEV_TOKEN) {
      console.log("[INFO] Loading DEV_TOKEN");
      appStore.set("googleToken", DEV_TOKEN);
    } else {
      console.log("[INFO] Opening Signin");
      openSignin();
    }
  } else {
    console.log("[INFO] Opening Signin");
    openSignin();
  }
}

ipcMain.handle(CHANNELS.GET_GOOGLE_TOKEN, () => appStore.get("googleToken"));
ipcMain.handle(CHANNELS.EXIT, () => app.quit());