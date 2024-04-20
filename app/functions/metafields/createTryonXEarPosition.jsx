import createTryonEarsetImage from './createTryonEearsetImage';

const createTryonXEarPosition = async (session) => {
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
      "definition": {
        "name": "Horizontal Ear Position",
        "namespace": "mirrar",
        "key": "x_ear_position",
        "description": "Ear horizontal position",
        "type": "number_decimal",
        "ownerType": "PRODUCT",
        "pin": true
      }
    }
  });

  try {
    const response = await fetch(`https://${session.shop}/admin/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': session.accessToken
      },
      body: graphqlQuery
    });

    const result = await response.json();
    const responseData = result.data.metafieldDefinitionCreate;

    if (responseData.createdDefinition === null) {
      console.log("Horizontal Ear Position Already Exist");
    } else {
      createTryonEarsetImage(session);
      console.log("Horizontal Ear Position Metafield Created");
    }
  } catch (error) {
    console.error(error);
  }
};

export default createTryonXEarPosition;
