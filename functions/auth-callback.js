import request from 'request'
import querystring from 'querystring'
import oauth2, { config } from './utils/oauth2'

exports.handler = (event, context, callback) => {
  console.log('event', event)
  // authorization_uri
  var code = req.query.code; // change

  oauth2.authorizationCode.getToken({
    code: code,
    redirect_uri: config.redirect_uri,
    client_id: config.clientID,
    client_secret: config.clientSecret,
    app_id: config.app,
  }, saveToken);

  function saveToken(error, result) {
    if (error) { 
      console.log('Access Token Error', error.message); 
    }
    token = oauth2.accessToken.create(result);

    var params = params || {};
    var request = require('request');
    var querystring = require('querystring');
    params['client_id'] = undefined /*clientId*/;
    params['client_secret'] = undefined /*clientSecret*/;
    params['app_id']= 'l8ecsskq';
    var post_data= querystring.stringify(params);

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