interface Session{
  shop:string,
  accessToken:string
}
const createApiKey = async (session:Session) => {
  const shop = session.shop;
  const accessToken = session.accessToken;
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
      'X-Shopify-Access-Token': accessToken
    },
    body: postData
  };

  try {
    const response = await fetch(`https://${shop}/admin/api/2024-01/metafields.json`, options);
    console.log(`statusCode: ${response.status}`);
    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error(error);
  }
};

export default createApiKey;
