import https from 'https';
import addScriptTag from './addScriptTag';
import addTryonScript from './addTryonScript';

const addJquery = async (session) => {
  const data = JSON.stringify({

    "script_tag": {
      "event": "onload",
      "src": "https://code.jquery.com/jquery-3.6.0.min.js",
      "cache":false
    }

  });



  const options = {

    hostname: session.shop,

    path: '/admin/api/2024-01/script_tags.json',

    method: 'POST',

    headers: {

      'X-Shopify-Access-Token': session.accessToken,

      'Content-Type': 'application/json',

      'Content-Length': Buffer.byteLength(data)

    }

  };

  const req = https.request(options, (res) => {

    let response = '';

    res.on('data', (chunk) => {

      response += chunk;
    });

    res.on('end', () => {
      addTryonScript(session);
      console.log('Response:', response);

    });

  });

  req.on('error', (error) => {

    console.error('Error:', error);

  });

  req.write(data);

  req.end();



};



export default addJquery;
