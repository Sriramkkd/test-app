import createTryonXPosition from './createTryonXPosition';
interface Session{
  shop:string,
  accessToken:string
}
const createTryonYPosition = async (session:Session) => {
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
        "name": "Vertical Position",
        "namespace": "mirrar",
        "key": "y_position",
        "description": "vertical position",
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

    const result:any = await response.json();
    const responseData = result.data.metafieldDefinitionCreate;

    if (responseData.createdDefinition === null) {
      console.log("Vertical Position Already Exist");
    } else {
      createTryonXPosition(session);
      console.log("Vertical Position Metafield Created");
    }
  } catch (error) {
    console.error(error);
  }
};

export default createTryonYPosition;
