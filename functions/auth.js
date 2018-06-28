import oauth2, { config } from './utils/oauth'

exports.handler = (event, context, callback) => {
  // Authorization uri definition
  const authorization_uri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: config.redirect_uri,
    scope: '',
    state: ''
  });
  console.log('authorization_uri', authorization_uri)
  
  /* redirect user to intercom login */
  const response = {
    statusCode: 301,
    headers: {
      Location: authorization_uri,
    }
  };

  callback(null, response);
}
