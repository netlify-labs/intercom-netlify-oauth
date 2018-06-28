import simpleOauth from 'simple-oauth2' 

export const config = {
  clientSecret: process.env.INTERCOM_CLIENT_SECRET,
  clientID: process.env.INTERCOM_CLIENT_ID,
  authorizationPath: 'https://app.intercom.io/oauth',
  tokenPath: 'https://api.intercom.io/auth/eagle/token',
  profilePath: 'https://api.intercom.io/me/',
  redirect_uri: 'https://intercom-login-example.netlify.com/.netlify/functions/auth-callback',
  app_id: process.env.INTERCOM_APP_ID,
};

const oauth2 = simpleOauth.create({
  site: ' ',
  clientSecret: config.clientSecret,
  clientID: config.clientID,
  authorizationPath: config.authorizationPath,
  tokenPath: config.tokenPath,
});

export default oauth2