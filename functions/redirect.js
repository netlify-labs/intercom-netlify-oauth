exports.handler = (event, context, callback) => {
   const response = {
    statusCode: 301,
    headers: {
      Location: 'https://google.com',
    }
  };

  return callback(null, response);
}
