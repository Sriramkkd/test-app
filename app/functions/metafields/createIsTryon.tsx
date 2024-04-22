interface Session{
  shop:string,
  accessToken:string
}
const createIsTryon = async (session:Session) => {
  const shop = session.shop;
  const accessToken = session.accessToken;
  const graphqlQuery = {
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
        "name": "Is Tryon",
        "namespace": "mirrar",
        "key": "is_tryon",
        "description": "Select True or False",
        "type": "boolean",
        "ownerType": "PRODUCT",
        "pin": true
      }
    }
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken
    },
    body: JSON.stringify(graphqlQuery)
  };

  try {
    const response = await fetch(`https://${shop}/admin/api/2024-01/graphql.json`, options);
    if (!response.ok) {
      const errorData = await response.json();
      console.log("Is Tryon Metaield creation failed");
      return;
    }
    const responseData:any = await response.json();
    if (responseData.data.metafieldDefinitionCreate.createdDefinition === null) {
      console.log("Is Tryon Metaield already existed");
    } else {
      console.log("Is Tryon Metafield Created");
    }
  } catch (error) {
    console.error(error);
  }
};

export default createIsTryon;
