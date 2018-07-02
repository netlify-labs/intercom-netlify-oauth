import oauth2, { config } from './utils/oauth'

exports.handler = (event, context, callback) => {
  // Authorization uri definition
  const authorization_uri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: config.redirect_uri,
    scope: '', /* Specify how your app needs to access the user’s account. http://bit.ly/intercom-scopes */
    state: '' /* Pass custom client state */
  });
  // console.log('authorization_uri', authorization_uri)

  /* redirect user to intercom authorization_uri login */
  const response = {
    statusCode: 301,
    headers: {
      Location: authorization_uri,
      // Set no cache
      'Cache-Control': 'no-cache'
    }
  }

  return callback(null, response)
}
