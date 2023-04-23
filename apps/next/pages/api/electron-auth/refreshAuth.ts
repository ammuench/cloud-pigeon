import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handleRefreshToken = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { refreshToken } = request.body;

  if (!refreshToken) {
    response.status(400).json({ message: "Missing refresh token" });
  }

  const { data } = await axios.post("https://oauth2.googleapis.com/token", {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  response.status(200).json(data);
};

export default handleRefreshToken;
