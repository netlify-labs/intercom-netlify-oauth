import request from 'request'

/* promisify request call */
export default function requestWrapper(requestOptions, token) {
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
