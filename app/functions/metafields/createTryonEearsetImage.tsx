import createTryonImageSize from './createTryonImageSize';
interface Session{
  shop:string,
  accessToken:string
}
const createTryonEarsetImage = async (session:Session) => {
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
        "name": "Try On Ear Set Images",
        "namespace": "mirrar",
        "key": "tryon_earset_image",
        "description": "Upload the try on earset images.",
        "type": "file_reference",
        "ownerType": "PRODUCT",
        "pin": true,
        "validations": [{
          "name": "file_type_options",
          "value": "[\"Image\"]"
        }]
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
      console.log("Try On Ear Set Images Metaield creation failed");
      return;
    }
    const responseData:any = await response.json();
    if (responseData.data.metafieldDefinitionCreate.createdDefinition === null) {
      console.log("Try On Ear Set Images Metaield already Existed");
    } else {
      await createTryonImageSize(session);
      console.log("Try On Ear Set Images Metafield Created");
    }
  } catch (error) {
    console.error(error);
  }
};

export default createTryonEarsetImage;
