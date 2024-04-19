import https from 'https';
import createTryonType from './createTryonType';

const createIsTryon = async (session) => {


  // Construct the GraphQL query with multiple mutation operations
  const graphqlQuery = JSON.stringify({
    query: `mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
      metafieldDefinitionCreate(definition: $definition) {
        createdDefinition {
          id
          name
        }
        userErrors {
          field
          message
          code
        }
      }
    }`,
    variables: {
        "definition":
          {
            "name": "Is Tryon",
            "namespace": "mirrar",
            "key": "is_tryon",
            "description": "Select True or False",
            "type": "boolean",
            "ownerType": "PRODUCT",
            "pin": true
          }
      }
  });

  // Define request options
  const options = {
    hostname: session.shop,
    path: '/admin/api/2024-01/graphql.json',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': session.accessToken // Replace YOUR_ACCESS_TOKEN with your actual access token
    }
  };

  // Send HTTPS request
  const req = https.request(options, (res) => {
    let data = '';

    // A chunk of data has been received
    res.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received
    res.on('end', () => {
      var result = JSON.parse(data);
      var response = result.data.metafieldDefinitionCreate;
      if(response.createdDefinition == null){
        console.log(response.userErrors[0].message);
      }else{
        console.log(response.createdDefinition.id, "Created");
      }
    });
  });

  // Handle request errors
  req.on('error', (error) => {
    console.error(error);
  });

  // Send GraphQL query payload
  req.write(graphqlQuery);
  req.end();
};

export default createIsTryon;
