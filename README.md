# Netlify + Intercom Oauth

<!-- Markdown snippet -->
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/davidwells/intercom-oauth)


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


## About

This flow uses the [Authorization Code Grant](https://tools.ietf.org/html/draft-ietf-oauth-v2-31#section-4.1) flow.

![intercom oauth netlify](https://user-images.githubusercontent.com/532272/42139934-bacd88e6-7d4b-11e8-8ccd-9a6621ecc8a6.png)

For more information on Oauth 2.0. [Watch this video](https://www.youtube.com/watch?v=CPbvxxslDTU)
