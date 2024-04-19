import https from 'https';

const createApiKey = async (session) => {
  // Construct the GraphQL query with multiple mutation operations
  const metafieldData = {
    metafield: {
      namespace: 'mirrar',
      key: 'api_key',
      type: 'string',
      value:"#"
    }
  };
// Convert the data to a JSON string
const postData = JSON.stringify(metafieldData);

// Set up the request options
const options = {
  hostname: session.shop,
  path: '/admin/api/2024-01/metafields.json',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': session.accessToken,
    'Content-Length': postData.length
  }
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

// Write the JSON data to the request
req.write(postData);
req.end();
};

export default createApiKey;
