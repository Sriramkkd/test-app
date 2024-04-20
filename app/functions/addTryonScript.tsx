import addScriptTag from './addScriptTag';

const addTryonScript = async (session: { shop: string; accessToken: string }) => {
  const data = JSON.stringify({
    "script_tag": {
      "event": "onload",
      "src": "https://cdn.mirrar.online/js/init.min.js",
      "cache": false
    }
  });

  const options = {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': session.accessToken,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data).toString()
    },
    body: data
  };

  try {
    const response = await fetch(`https://${session.shop}/admin/api/2024-01/script_tags.json`, options);
    const responseData = await response.json();
    addScriptTag(session);
    console.log('Response:', responseData);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default addTryonScript;
