import axios from "axios";
import jwtDecode from "jwt-decode";
import keytar from "keytar";
import os from "os";
import url from "url";

import envVariablesJSON from "../../../env-variables.json";
import envVariablesSchema, {
  EnvironmentVariables,
} from "../../types/JSON/env-variables.types";

let envVariables: EnvironmentVariables;

try {
  envVariables = envVariablesSchema.parse(envVariablesJSON);
} catch (e) {
  console.error(e);
  process.exit(1);
}

const { apiIdentifier, auth0Domain, clientId } = envVariables;

const redirectUri = "http://localhost/callback";

const keytarService = "electron-openid-oauth";
const keytarAccount = os.userInfo().username;

// TODO: Define these types later
let accessToken: any | null = null;
let profile: any | null = null;
let refreshToken: any | null = null;

export const getAccessToken = () => accessToken;

export const getProfile = () => profile;

export const getAuthenticationURL = () =>
  "https://" +
  auth0Domain +
  "/authorize?" +
  "audience=" +
  apiIdentifier +
  "&" +
  "scope=openid profile offline_access&" +
  "response_type=code&" +
  "client_id=" +
  clientId +
  "&" +
  "redirect_uri=" +
  redirectUri;

export async function refreshTokens() {
  const refreshTokenFromKeytar = await keytar.getPassword(
    keytarService,
    keytarAccount
  );

  if (refreshTokenFromKeytar) {
    const refreshOptions = {
      method: "POST",
      url: `https://${auth0Domain}/oauth/token`,
      headers: { "content-type": "application/json" },
      data: {
        grant_type: "refresh_token",
        client_id: clientId,
        refresh_token: refreshTokenFromKeytar,
      },
    };

    try {
      const response = await axios(refreshOptions);

      accessToken = response.data.access_token;
      profile = jwtDecode(response.data.id_token);
    } catch (error) {
      await logout();

      throw error;
    }
  } else {
    throw new Error("No available refresh token.");
  }
}

export async function loadTokens(callbackURL: string) {
  const urlParts = url.parse(callbackURL, true);
  const query = urlParts.query;

  const exchangeOptions = {
    grant_type: "authorization_code",
    client_id: clientId,
    code: query.code,
    redirect_uri: redirectUri,
  };

  const options = {
    method: "POST",
    url: `https://${auth0Domain}/oauth/token`,
    headers: {
      "content-type": "application/json",
    },
    data: JSON.stringify(exchangeOptions),
  };

  try {
    const response = await axios(options);

    accessToken = response.data.access_token;
    profile = jwtDecode(response.data.id_token);
    refreshToken = response.data.refresh_token;

    if (refreshToken) {
      await keytar.setPassword(keytarService, keytarAccount, refreshToken);
    }
  } catch (error) {
    await logout();

    throw error;
  }
}

export async function logout() {
  await keytar.deletePassword(keytarService, keytarAccount);
  accessToken = null;
  profile = null;
  refreshToken = null;
}

export const getLogOutUrl = () => `https://${auth0Domain}/v2/logout`;

module.exports = {
  getAccessToken,
  getAuthenticationURL,
  getLogOutUrl,
  getProfile,
  loadTokens,
  logout,
  refreshTokens,
};
