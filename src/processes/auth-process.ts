import { BrowserWindow } from "electron";

import { createAppWindow } from "../index";
import * as authService from "../services/electron/auth-service";

let win: BrowserWindow | null = null;

export function createAuthWindow() {
  destroyAuthWin();

  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  win.loadURL(authService.getAuthenticationURL());

  const {
    session: { webRequest },
  } = win.webContents;

  const filter = {
    urls: ["http://localhost/callback*"],
  };

  webRequest.onBeforeRequest(filter, async ({ url }) => {
    await authService.loadTokens(url);
    createAppWindow();
    return destroyAuthWin();
  });

  // TODO: Remove this once we validate it
  // @ts-ignore
  win.on("authenticated", () => {
    destroyAuthWin();
  });

  win.on("closed", () => {
    win = null;
  });
}

export function destroyAuthWin() {
  if (!win) return;
  win.close();
  win = null;
}

export function createLogoutWindow() {
  const logoutWindow = new BrowserWindow({
    show: false,
  });

  logoutWindow.loadURL(authService.getLogOutUrl());

  logoutWindow.on("ready-to-show", async () => {
    await authService.logout();
    logoutWindow.close();
  });
}
