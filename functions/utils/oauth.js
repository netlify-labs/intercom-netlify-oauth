import simpleOauth from 'simple-oauth2' 

export const config = {
  app_id: process.env.INTERCOM_APP_ID,
  clientSecret: process.env.INTERCOM_CLIENT_SECRET,
  clientID: process.env.INTERCOM_CLIENT_ID,
  authorizationPath: 'https://app.intercom.io/oauth',
  tokenPath: 'https://api.intercom.io/auth/eagle/token',
  profilePath: 'https://api.intercom.io/me/',
  redirect_uri: 'https://intercom-login-example.netlify.com/.netlify/functions/auth-callback',
};

const credentials = {
  client: {
    id: config.clientID,
    secret: config.clientSecret
  },
  auth: {
    tokenHost: config.authorizationPath,
    tokenPath: config.tokenPath,
  }
};

const oauth2 = simpleOauth.create(credentials);

export default oauth2