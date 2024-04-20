import createTryonXEarPosition from './createTryonXEarPosition';
interface Session{
  shop:string,
  accessToken:string
}
const createTryonYEarPosition = async (session:Session) => {
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
        "name": "Vertical Ear Position",
        "namespace": "mirrar",
        "key": "y_ear_position",
        "description": "vertical Ear position",
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
      console.log("Vertical Ear Position already Exist");
    } else {
      createTryonXEarPosition(session);
      console.log("Vertical Ear Position Created");
    }
  } catch (error) {
    console.error(error);
  }
};

export default createTryonYEarPosition;
