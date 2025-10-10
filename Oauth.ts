import { google } from "googleapis";

const CLIENT_ID = process.env.CLIENT_ID!;
const CLIENT_SECRET = process.env.CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN!;
const REDIRECT_URI = "https://developers.google.com/oauthplayground"; // se hai usato OAuth Playground
const USER_EMAIL = process.env.EMAIL!;

// crea client OAuth2
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function getAccessToken() {
    const res = await oAuth2Client.getAccessToken();
    if (!res.token) throw new Error("Failed to get access token");
    return res.token;
  }
  