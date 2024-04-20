const createApiKey = async (session) => {
  const metafieldData = {
    metafield: {
      namespace: 'mirrar',
      key: 'api_key',
      type: 'string',
      value: "#"
    }
  };

  const postData = JSON.stringify(metafieldData);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': session.accessToken
    },
    body: postData
  };

  try {
    const response = await fetch(`https://${session.shop}/admin/api/2024-01/metafields.json`, options);
    console.log(`statusCode: ${response.status}`);
    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error(error);
  }
};

export default createApiKey;
