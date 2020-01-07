/* eslint-disable */
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    if (event.httpMethod == 'GET') {
      const id = event.queryStringParameters.id;
      if (!id) {
        return {
          statusCode: 400,
          body: JSON.stringify({ msg: 'No id found in request.' }),
        };
      }
    } else if (event.httpMethod == 'POST') {
      const matchup = JSON.parse(event.body);
      console.log(matchup);
      // TODO: save to database
    }
    // const response = await fetch('https://icanhazdadjoke.com', {
    //   headers: { Accept: 'application/json' },
    // });
    // if (!response.ok) {
    //   // NOT res.status >= 200 && res.status < 300
    //   return { statusCode: response.status, body: response.statusText };
    // }
    // const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: 'implement me' }),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
