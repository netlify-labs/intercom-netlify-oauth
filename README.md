# Netlify + Intercom Oauth &nbsp;&nbsp;&nbsp;<a href="https://app.netlify.com/start/deploy?repository=https://github.com/davidwells/intercom-netlify-oauth"><img src="https://www.netlify.com/img/deploy/button.svg"></a>

Add 'login with intercom' via Netlify Functions

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [Install](#install)
- [Architecture](#architecture)
  * [auth.js](#authjs)
  * [auth-callback.js](#auth-callbackjs)
<!-- AUTO-GENERATED-CONTENT:END -->


## Install

1. Clone down the repository

2. Install the dependencies

    ```bash
    npm install
    ```

3. Set your Intercom app id and Oauth values in your terminal enviroment

    You can create an intercom Oauth app here: https://app.intercom.com/developers/

    In your terminal run the following command:

    ```bash
    export INTERCOM_APP_ID=INTERCOM_APP_ID
    export INTERCOM_CLIENT_ID=INTERCOM_CLIENT_ID
    export INTERCOM_CLIENT_SECRET=INTERCOM_CLIENT_SECRET
    ```

4. Run project locally

    ```bash
    npm start
    ```

5. Deploy

    Fork this repo and connect with your Netlify account or use the one click deploy button:

    [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/davidwells/intercom-oauth)


## Architecture

This flow uses the [Authorization Code Grant](https://tools.ietf.org/html/draft-ietf-oauth-v2-31#section-4.1) flow.

![intercom oauth netlify](https://user-images.githubusercontent.com/532272/42140261-fb3e1d22-7d51-11e8-87ec-dd718187a659.png)

For more information on Oauth 2.0. [Watch this video](https://www.youtube.com/watch?v=CPbvxxslDTU)


### auth.js

The `auth.js` function creates a `authorization_uri` using the `simple-oauth2` npm module and redirects the user to the intercom login screen.

Setting the `header.Location` in the lambda response will redirect the user to the `authorization_uri`.

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./functions/auth.js) -->
<!-- The below code snippet is automatically added from ./functions/auth.js -->
```js
import oauth2, { config } from './utils/oauth'

exports.handler = (event, context, callback) => {
  // Authorization uri definition
  const authorization_uri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: config.redirect_uri,
    scope: '',
    state: ''
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
```
<!-- AUTO-GENERATED-CONTENT:END -->

### auth-callback.js

The `auth-callback.js` function handles the authorization grant code returned from the successful intercom login.

It then calls `oauth2.authorizationCode.getToken` to get a valid AccessToken from intercom.

Once you have the valid accessToken, you can store it and make authenticated calls on behalf of the user to the intercom API.

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./functions/auth-callback.js) -->
<!-- The below code snippet is automatically added from ./functions/auth-callback.js -->
```js
import request from 'request'
import querystring from 'querystring'
import oauth2, { config } from './utils/oauth'

/* Function to handle intercom auth callback */
exports.handler = (event, context, callback) => {
  // console.log('event', event)
  const code = event.queryStringParameters.code
  const state = event.queryStringParameters.state

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

/* promify request call */
function requestWrapper(requestOptions, token) {
  return new Promise((resolve, reject) => {
    request(requestOptions, (err, response, body) => {
      if (err) {
        return reject(err)
      }
      const data = {
        token: token,
        data: body,
      }
      return resolve(data)
    })
  })
}
```
<!-- AUTO-GENERATED-CONTENT:END -->