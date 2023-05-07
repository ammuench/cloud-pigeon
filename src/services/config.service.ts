import axios from "axios";

import { CONFIG_NAME, FOLDER_NAME } from "../constants";
import { GoogleToken } from "../types/electron-store.types";

export type GoogleFileQueryAPIResponse = {
  kind: "drive#fileList";
  incompleteSearch: boolean;
  files: GoogleFile[];
};

export type GoogleFile = {
  kind: "drive#file";
  mimeType: string;
  id: string;
  name: string;
};

export const getConfig = async (token: GoogleToken, configId?: string) => {
  const { data: fileList } = await axios.get<GoogleFileQueryAPIResponse>(
    `https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.folder'`,
    {
      headers: {
        access_token: token.access_token,
      },
    }
  );
  if (fileList.files.length > 0) {
    // Return Config
  } else {
    await createFolderAndConfig(token);
  }
};

const createFolderAndConfig = async (token: GoogleToken) => {
  const { data } = await axios.post<GoogleFile>(
    `https://www.googleapis.com/drive/v3/files`,
    {
      name: FOLDER_NAME,
      mimeType: "application/vnd.google-apps.folder",
    },
    {
      headers: {
        access_token: token.access_token,
      },
    }
  );
};

const createConfig = async (token: GoogleToken, folderId: string) => {
  if (!folderId) {
    throw new Error("NO FOLDER ID PROVIDED TO CREATE CONFIG");
  }
  const { data } = await axios.post<GoogleFile>(
    `https://www.googleapis.com/drive/v3/files?parents=[${folderId}]`,
    {
      name: CONFIG_NAME,
      mimeType: "application/vnd.google-apps.folder",
    },
    {
      headers: {
        access_token: token.access_token,
      },
    }
  );
};

const getConfigFromGDrive = async (token: GoogleToken, folderId: string) => {
  if (!folderId) {
    throw new Error("NO FOLDER ID PROVIDED TO CREATE CONFIG");
  }
  const { data: configQuery } = await axios.post<GoogleFile>(
    `https://www.googleapis.com/drive/v3/files?parents=[${folderId}]`,
    {
      name: CONFIG_NAME,
      mimeType: "application/json",
    },
    {
      headers: {
        access_token: token.access_token,
      },
    }
  );
};
