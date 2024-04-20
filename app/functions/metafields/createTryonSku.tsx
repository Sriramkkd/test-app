import createTryonType from './createTryonType';
interface Session{
  shop:string,
  accessToken:string
}
const createTryonSku = async (session:Session) => {
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
        "name": "Try On SKU",
        "namespace": "mirrar",
        "key": "try_on_sku",
        "description": "sku",
        "type": "single_line_text_field",
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
      console.log("Try On SKU Already Exist");
    } else {
      createTryonType(session);
      console.log("Try On SKU Metafield Created");
    }
  } catch (error) {
    console.error(error);
  }
};

export default createTryonSku;
