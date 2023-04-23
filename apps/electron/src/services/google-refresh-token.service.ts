import axios from "axios";

import type { GoogleToken } from "../types/JSON/electron-store.types";

type RefreshTokenResponse = Omit<GoogleToken, "expiry_date">;

export const reauthGoogleToken = async (token: GoogleToken) => {
  const url = process.env.PRODUCTION
    ? "someprodurl"
    : "http://localhost:3001/api/electron-auth/refreshAuth";

  try {
    const { data } = await axios.post<RefreshTokenResponse>(url, {
      refreshToken: token.refresh_token,
    });

    return data;
  } catch (e) {
    return {
      error: e,
    };
  }
};
