import createButtonStyles from "./createButtonStyles";
interface Session{
  shop:string,
  accessToken:string
}
const createClientSecret = async (session:Session ) => {
  const shop = session.shop;
  const accessToken = session.accessToken;
  const metafieldData = {
    metafield: {
      namespace: 'mirrar',
      key: 'client_secret',
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
    console.log("Client Secret Added");
    await createButtonStyles(session);
  } catch (error) {
    console.error(error);
  }
};

export default createClientSecret;
