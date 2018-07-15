import simpleOauth from 'simple-oauth2'

const intercomApi = 'https://app.intercom.io'

export const config = {
  /* values set in terminal session or in netlify environment variables */
  appId: process.env.INTERCOM_APP_ID,
  clientId: process.env.INTERCOM_CLIENT_ID,
  clientSecret: process.env.INTERCOM_CLIENT_SECRET,
  /* Intercom oauth API endpoints */
  tokenHost: intercomApi,
  authorizePath: `${intercomApi}/oauth`,
  tokenPath: `${intercomApi}/auth/eagle/token`,
  profilePath: `${intercomApi}/me/`,
  /* redirect_uri is the callback url after successful signin */
  redirect_uri: `${process.env.URL}/.netlify/functions/auth-callback`,
  /* ^ process.env.URL from netlify BUILD environment variables */
}

function authInstance(credentials) {
  if (!credentials.client.id) {
    throw new Error('MISSING REQUIRED ENV VARS. Please set INTERCOM_CLIENT_ID')
  }
  if (!credentials.client.secret) {
    throw new Error('MISSING REQUIRED ENV VARS. Please set INTERCOM_CLIENT_SECRET')
  }
  // return oauth instance
  return simpleOauth.create(credentials)
}

/* Create oauth2 instance to use in our two functions */
export default authInstance({
  client: {
    id: config.clientId,
    secret: config.clientSecret
  },
  auth: {
    tokenHost: config.tokenHost,
    tokenPath: config.tokenPath,
    authorizePath: config.authorizePath
  }
})
