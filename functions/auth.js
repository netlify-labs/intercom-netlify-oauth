import oauth2, { config } from './utils/oauth'

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
  redirect_uri: config.redirect_uri,
  scope: '',
  state: ''
});

exports.handler = (event, context, callback) => {
  console.log('authorization_uri', authorization_uri)
  // authorization_uri
   const response = {
    statusCode: 301,
    headers: {
      Location: authorization_uri,
    }
  };

  callback(null, response);
}
