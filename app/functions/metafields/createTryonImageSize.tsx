import createTryonImage from './createTryonImage';
interface Session{
  shop:string,
  accessToken:string
}
const createTryonImageSize = async (session:Session) => {
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
        "name": "Tryon Image Size",
        "namespace": "mirrar",
        "key": "tryon_image_size",
        "description": "tryon image size",
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
      console.log("Tryon Image Size Already Exist");
    } else {
      createTryonImage(session);
      console.log("Tryon Image Size Metafield Created");
    }
  } catch (error) {
    console.error(error);
  }
};

export default createTryonImageSize;
