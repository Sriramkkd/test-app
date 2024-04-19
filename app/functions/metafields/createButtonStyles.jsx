import https from 'https';

const createButtonStyles = async (session) => {

  // Construct the GraphQL query with multiple mutation operations
  const metafieldData = {
    metafield: {
      namespace: 'mirrar',
      key: 'button_styles',
      type: 'json',
      value: JSON.stringify({
        button_text: "Virtual Tryon",
        tryonPlace: "modal",
        checked1: true,
        checked2: true,
        buttonBackground: {
          red: 0,
          green: 0,
          blue: 0
        },
        fontColor: {
          red: 255,
          green: 255,
          blue: 255
        },
        borderColor: {
          red: 0,
          green: 0,
          blue: 0
        },
        hoverColor: {
          red: 157,
          green: 157,
          blue: 157
        },
        shadowColor: {
          red: 0,
          green: 0,
          blue: 0
        },
        vertPaddButton: "8",
        vertPaddButton1: "8",
        horzPaddButton: "103",
        horzPaddButton1: "103",
        topMarButton: 10,
        topMarButton1: 10,
        bottomMarButton: "0",
        bottomMarButton1: "0",
        leftMarButton: "0",
        leftMarButton1: "0",
        rightMarButton: "0",
        rightMarButton1: "0",
        textSize: 20,
        textSize1: 20,
        textWeight: "600",
        textWeight1: "600",
        borderSize: "0",
        borderSize1: "0",
        borderRadius: "0",
        borderRadius1: "0",
        shadowTopBottom: "0",
        shadowRightLeft: "0",
        shadowBlur: "0",
        shadowSpread: "0",
        shadowInset: "inset",
        leftIconPosition: "none",
        rightIconPosition: "inline-block",
        position: "right",
        buttonDisplay: "block",
        buttonALign: "center",
        buttonWidth: "auto",
        iconMargin: "10px",
        pointer: ""
      })
    }
};

// Convert the data to a JSON string
const postData = JSON.stringify(metafieldData);

// Set up the request options
const options = {
  hostname: session.shop,
  path: '/admin/api/2024-01/metafields.json',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': session.accessToken,
    'Content-Length': postData.length
  }
};

// Send the request
const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

// Write the JSON data to the request
req.write(postData);
req.end();
};

export default createButtonStyles;
