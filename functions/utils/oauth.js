import simpleOauth from 'simple-oauth2' 

export const config = {
  clientSecret: '[....]',
  clientID: '[....]',
  authorizationPath: 'https://app.intercom.io/oauth',
  tokenPath: 'https://api.intercom.io/auth/eagle/token',
  profilePath: 'https://api.intercom.io/me/',
  redirect_uri: 'https://[..yourdomain..]/oauth/callback',
  app_id: '[....]',
};

const oauth2 = simpleOauth.create({
  site: ' ',
  clientSecret: config.clientSecret,
  clientID: config.clientID,
  authorizationPath: config.authorizationPath,
  tokenPath: config.tokenPath,
});

export default oauth2