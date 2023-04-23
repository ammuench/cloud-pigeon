import axios from "axios";

import { GoogleToken } from "../types/electron-store.types";

export type GoogleProfile = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
};

export const getGoogleProfile = (token: GoogleToken) =>
  axios.get<GoogleProfile>(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token.access_token}`,
    {
      headers: {
        Authorization: `Bearer ${token.id_token}`,
      },
    }
  );
