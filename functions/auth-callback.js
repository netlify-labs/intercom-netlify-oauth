import request from 'request'
import querystring from 'querystring'
import oauth2, { config } from './utils/oauth'

exports.handler = (event, context, callback) => {
  console.log('event', event)
  // authorization_uri
  var code = event.queryStringParameters.code;
  var state = event.queryStringParameters.state

  oauth2.authorizationCode.getToken({
    code: code,
    redirect_uri: config.redirect_uri,
    client_id: config.clientID,
    client_secret: config.clientSecret,
    app_id: config.app,
  }).then((result) => {
    saveToken(null, result)
  }).catch((error) => {
    if (error) { 
      console.log('Access Token Error promise catch', error.message); 
    }
  });

  function saveToken(error, result) {
    console.log('save token')
    console.log('error', error)
    console.log('result', result)
    if (error) { 
      console.log('Access Token Error', error.message); 
    }

    console.log('token result', result)
    var token = oauth2.accessToken.create(result);
    console.log('created token', token)
    var params = params || {};

    params['client_id'] = config.clientID;
    params['client_secret'] = config.clientSecret;
    params['app_id']= config.app_id;

    var post_data = querystring.stringify(params);

    console.log('token.token.token', token.token.token)

    var req_options = {
      url: config.profilePath + "?" + post_data,
      json: true,
      auth: {
        user: token.token.token,
        pass: '',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        "Accept": "application/json",
      }
    };

    console.log('make request', req_options)

    request(req_options, (err, req, body) => {
      console.log(token)
      console.log(body)
      return callback(null, {
	      statusCode: 200,
	      body: JSON.stringify({
	        token: token,
	        data: body,
	      })
	    })
    });
  }
}