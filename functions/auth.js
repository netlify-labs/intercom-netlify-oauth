import oauth2, { config } from './utils/oauth'

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
  redirect_uri: config.redirect_uri,
  scope: '',
  state: ''
});

exports.handler = (event, context, callback) => {
  console.log('hi')
  // authorization_uri
}
