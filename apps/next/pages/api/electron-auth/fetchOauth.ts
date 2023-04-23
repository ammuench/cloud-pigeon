import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

const oauthHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3001/api/electron-auth/oauthCallback"
  );

  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive.appfolder",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.resource",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });

  response.redirect(301, url);
};

export default oauthHandler;
