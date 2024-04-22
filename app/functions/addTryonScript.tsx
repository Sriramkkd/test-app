import addScriptTag from './addScriptTag';
import { Buffer } from 'buffer';
interface Session{
  shop:string,
  accessToken:string
}
const addTryonScript = async (session:Session) => {
  const shop = session.shop;
  const accessToken = session.accessToken;
  const data = JSON.stringify({
    "script_tag": {
      "event": "onload",
      "src": "https://cdn.mirrar.online/js/init.min.js",
      "cache": false
    }
  });

  const options = {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': accessToken,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data).toString()
    },
    body: data
  };

  try {
    const response = await fetch(`https://${shop}/admin/api/2024-01/script_tags.json`, options);
    const responseData = await response.json();
    addScriptTag(session);
    console.log('Response:', responseData);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default addTryonScript;
