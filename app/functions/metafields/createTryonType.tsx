import createIsTryon from './createIsTryon';
interface Session{
  shop:string,
  accessToken:string
}
const createTryonType = async (session:Session) => {
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
        "name": "Tryon Type",
        "namespace": "mirrar",
        "key": "tryon_type",
        "description": "Enter NECK / SET / EAR / RING / WATCH / BRACELET",
        "type": "single_line_text_field",
        "ownerType": "PRODUCT",
        "pin": true,
        "validations": [
          {
            "name": "choices",
            "value": "[\"NECK\",\"SET\",\"EAR\",\"RING\",\"WATCH\",\"BRACELET\"]"
          }
        ]
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
      console.log("Tryon Type Already Exist");
    } else {
      await createIsTryon(session);
      console.log("Tryon Type Metafield Created");
    }
  } catch (error) {
    console.error(error);
  }
};

export default createTryonType;
