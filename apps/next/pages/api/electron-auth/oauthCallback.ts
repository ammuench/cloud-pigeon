import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import qs from "querystring";

const oauthHandler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const qsParse = qs.parse(`${request.url!.split("?")[1]}`);

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3001/api/electron-auth/oauthCallback"
  );

  async function getTokens({ code }: any) {
    const { tokens } = await oauth2Client.getToken(code);

    return {
      tokens,
    };
  }

  if (qsParse.code) {
    const userData = await getTokens({ code: qsParse.code });
    console.log({
      userData,
    });
  }

  // TODO: Kick this back to deeplink eventually
  response.status(200).json({
    oauth: true,
  });
};

export default oauthHandler;
