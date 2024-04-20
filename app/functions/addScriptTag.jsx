const addScriptTag = async (session) => {
  const data = JSON.stringify({
    "script_tag": {
      "event": "onload",
      "src": "https://vtoshopify.pages.dev/assets/tryon.js",
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
    console.log('Response:', responseData);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default addScriptTag;
