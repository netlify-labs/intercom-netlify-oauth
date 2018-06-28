import simpleOauth from 'simple-oauth2' 

export const config = {
  app_id: process.env.INTERCOM_APP_ID,
  clientSecret: process.env.INTERCOM_CLIENT_SECRET,
  clientID: process.env.INTERCOM_CLIENT_ID,
  tokenHost: 'https://app.intercom.io',
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
    tokenHost: config.tokenHost,
    tokenPath: config.tokenPath,
    authorizePath: config.authorizationPath
  }
};

const oauth2 = simpleOauth.create(credentials);

export default oauth2