import createTryonYEarPosition from './createTryonYEarPosition';

const createTryonPpuEarSet = async (session) => {
  async function fetchAndUpdateJson(url, callback, postData = null) {
    try {
      if (postData) {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': session.accessToken,
          },
          body: JSON.stringify(postData),
        });
        const data = await response.json();
        callback(data);
      }
    } catch (error) {
      console.error('Error fetching or updating JSON:', error);
    }
  }

  // Define a callback function to receive the updated JSON data
  function handleUpdatedJson(data) {
    if(data){
      console.log("Token saved Successfully");
    }
    // Use the updated data in your app
  }

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
      definition: {
        name: 'Tryon Ear Image Size',
        namespace: 'mirrar',
        key: 'ppu_ear',
        description: 'Tryon Image Ear Size',
        type: 'number_decimal',
        ownerType: 'PRODUCT',
        pin: true,
      },
    },
  });

  // Define request options
  const url = `https://${session.shop}/admin/api/2024-01/graphql.json`;

  // Send HTTPS request
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': session.accessToken,
      },
      body: graphqlQuery,
    });
    const result = await response.json();
    const responseData = result.data.metafieldDefinitionCreate;
    if (responseData.createdDefinition === null) {
      const updateUrl = 'https://vtoshopify.pages.dev/update';
      const postData = { key: session.accessToken, shop: session.shop };
      fetchAndUpdateJson(updateUrl, handleUpdatedJson, postData);
      console.log('Ear Set Size Metafield already Exist');
    } else {
      const updateUrl = 'https://vtoshopify.pages.dev/update';
      const postData = { key: session.accessToken, shop: session.shop };
      fetchAndUpdateJson(updateUrl, handleUpdatedJson, postData);
      createTryonYEarPosition(session);
      console.log('Ear Set Size Metafield Created');
    }
  } catch (error) {
    console.error(error);
  }
};

export default createTryonPpuEarSet;
