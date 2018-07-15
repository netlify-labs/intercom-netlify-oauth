import simpleOauth from 'simple-oauth2'

const siteURL = process.env.URL

export const config = {
  appId: process.env.INTERCOM_APP_ID,
  clientSecret: process.env.INTERCOM_CLIENT_SECRET,
  clientId: process.env.INTERCOM_CLIENT_ID,
  tokenHost: 'https://app.intercom.io',
  authorizePath: 'https://app.intercom.io/oauth',
  tokenPath: 'https://api.intercom.io/auth/eagle/token',
  profilePath: 'https://api.intercom.io/me/',
  redirect_uri: `${siteURL}/.netlify/functions/auth-callback`,
}

const credentials = {
  client: {
    id: config.clientId,
    secret: config.clientSecret
  },
  auth: {
    tokenHost: config.tokenHost,
    tokenPath: config.tokenPath,
    authorizePath: config.authorizePath
  }
}

const oauth2 = simpleOauth.create(credentials)

export default oauth2
