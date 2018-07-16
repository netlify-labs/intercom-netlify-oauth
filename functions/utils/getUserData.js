import request from 'request'
import querystring from 'querystring'
import { config } from './oauth'

/* Call into https://app.intercom.io/me and return user data */
export default function getUserData(token) {
  const postData = querystring.stringify({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    app_id: config.appId
  })

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
