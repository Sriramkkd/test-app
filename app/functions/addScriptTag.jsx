import https from 'https';

const addScriptTag = async (session) => {
  const data = JSON.stringify({

    "script_tag": {
      "event": "onload",
      "src": "https://vtoshopify.pages.dev/assets/tryon.js",
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
      console.log('Response:', response);

    });

  });

  req.on('error', (error) => {

    console.error('Error:', error);

  });

  req.write(data);

  req.end();



};



export default addScriptTag;
