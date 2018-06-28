exports.handler = (event, context, callback) => {
   const response = {
    statusCode: 301,
    headers: {
      Location: 'https://lol.com',
    }
  };

  return callback(null, response);
}
