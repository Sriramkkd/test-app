import createTryonYPosition from './createTryonYPosition';
interface Session{
  shop:string,
  accessToken:string
}
const createTryonImage = async (session:Session) => {
  const shop = session.shop;
  const accessToken = session.accessToken;
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
        "name": "Try On Image",
        "namespace": "mirrar",
        "key": "try_on_images",
        "description": "Upload the try on images.",
        "type": "file_reference",
        "ownerType": "PRODUCT",
        "pin": true,
        "validations": [{
          "name": "file_type_options",
          "value": "[\"Image\"]"
        }]
      }
    }
  });

  try {
    const response = await fetch(`https://${shop}/admin/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken
      },
      body: graphqlQuery
    });

    const result:any = await response.json();
    const responseData = result.data.metafieldDefinitionCreate;

    if (responseData.createdDefinition === null) {
      console.log("Try On Image Already Exist");
    } else {
      await createTryonYPosition(session);
      console.log("Try On Image Metafield Created");
    }
  } catch (error) {
    console.error(error);
  }
};

export default createTryonImage;
