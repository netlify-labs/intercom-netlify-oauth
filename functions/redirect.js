exports.handler = (event, context, callback) => {
   const response = {
    statusCode: 301,
    headers: {
      Location: 'https://netlify.com',
    }
  };

  return callback(null, response);
}
