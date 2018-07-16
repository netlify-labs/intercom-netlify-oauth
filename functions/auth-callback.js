import request from 'request'
import querystring from 'querystring'
import oauth2, { config } from './utils/oauth'

/* Function to handle intercom auth callback */
exports.handler = (event, context, callback) => {
  const code = event.queryStringParameters.code
  /* state helps mitigate CSRF attacks & Restore the previous state of your app */
  const state = event.queryStringParameters.state

  /* Take the grant code and exchange for an accessToken */
  oauth2.authorizationCode.getToken({
    code: code,
    redirect_uri: config.redirect_uri,
    client_id: config.clientId,
    client_secret: config.clientSecret
  })
    .then(saveToken)
    .then((result) => {
    // Do stuff with token
      console.log('auth token', result.token)
      // Do stuff with user data
      console.log('user data', result.data)
      // Do other custom stuff
      console.log('state', state)
      // return results to browser
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(result)
      })
    })
    .catch((error) => {
      console.log('Access Token Error', error.message)
      console.log(error)
      return callback(null, {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          error: error.message,
        })
      })
    })
}

function saveToken(result) {
  console.log('save token', result)
  const token = oauth2.accessToken.create(result)
  console.log('=== created token', token)

  const params = {
    client_id: config.clientId,
    client_secret: config.clientSecret,
    app_id: config.appId
  }

  const postData = querystring.stringify(params)

  const requestOptions = {
    url: `${config.profilePath}?${postData}`,
    json: true,
    auth: {
      user: token.token.token,
      pass: '',
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    }
  }

  return requestWrapper(requestOptions, token)
}

/* promisify request call */
function requestWrapper(requestOptions, token) {
  return new Promise((resolve, reject) => {
    request(requestOptions, (err, response, body) => {
      if (err) {
        return reject(err)
      }
      // return data
      return resolve({
        token: token,
        data: body,
      })
    })
  })
}
