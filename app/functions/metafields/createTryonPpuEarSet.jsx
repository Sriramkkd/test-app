import { readFile, writeFile } from 'fs';
import https from 'https';
import createTryonYEarPosition from './createTryonYEarPosition';

const createTryonPpuEarSet = async (session) => {
  async function fetchAndUpdateJson(url, callback, postData = null) {
    try {
      // const headers = new Headers();
      // headers.append('','1')
      // // Fetch the JSON file
      // const response = await fetch(url,{
      //   headers:headers
      // });


      // const data = await response.json();
      // // Update the JSON data (for example, add a new property)
      // data.updated = true;

      // // Pass the updated JSON data through the callback function


      if (postData) {
        // Post the updated JSON data
        await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData)
        }).then(function(data){
          callback(data);
        }).catch(function(error){
          console.log("Not Working ", JSON.stringify(error))
        });
      }
    } catch (error) {
      console.error('Error fetching or updating JSON:', error);
    }
  }

  // Define a callback function to receive the updated JSON data
  function handleUpdatedJson(data) {
    console.log(data);
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
        "definition":
          {
            "name": "Tryon Ear Image Size",
            "namespace": "mirrar",
            "key": "ppu_ear",
            "description": "Tryon Image Ear Size",
            "type": "number_decimal",
            "ownerType": "PRODUCT",
            "pin": true
          }
      }
  });

  // Define request options
  const options = {
    hostname: session.shop,
    path: '/admin/api/2024-01/graphql.json',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': session.accessToken // Replace YOUR_ACCESS_TOKEN with your actual access token
    }
  };

  // Send HTTPS request
  const req = https.request(options, (res) => {
    let data = '';
    // A chunk of data has been received
    res.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received
    res.on('end', () => {
        var result = JSON.parse(data);
        var response = result.data.metafieldDefinitionCreate;
        console.log(session.accessToken)
        if(response.createdDefinition == null){
          const url = `https://vtoshopify.pages.dev/update`;
          const postData = {"key":session.accessToken,"shop":session.shop};
          fetchAndUpdateJson(url, handleUpdatedJson, postData);
          console.log(response.userErrors[0].message);
        }else{
          const url = `https://vtoshopify.pages.dev/update`;
          const postData = {"key":session.accessToken,"shop":session.shop};
          fetchAndUpdateJson(url, handleUpdatedJson, postData);
          createTryonYEarPosition(session)
          console.log(response.createdDefinition.id, "Created");
        }
    });
  });

  // Handle request errors
  req.on('error', (error) => {
    console.error(error);
  });

  // Send GraphQL query payload
  req.write(graphqlQuery);
  req.end();
};

export default createTryonPpuEarSet;
