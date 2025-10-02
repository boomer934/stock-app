import { google } from "googleapis";

const CLIENT_ID = "1048456214875-ioko1625bcm7cv83202uataa038qoche.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000/oauth2callback"; // lo stesso registrato

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Il code che hai copiato da Google
const code = "4/0AVGzR1AWRJcngFBZBJhoGT7I08mMrGCujRwBmGrth46Brh1I4RRYjLUZ6T3CWzLW81KK9w";

async function getTokens() {
  const { tokens } = await oAuth2Client.getToken(code);
  console.log("Access Token:", tokens.access_token);
  console.log("Refresh Token:", tokens.refresh_token); // salvalo!
  console.log("Expiry Date:", tokens.expiry_date);
}

getTokens();
