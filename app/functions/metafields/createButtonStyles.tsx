interface Session{
  shop:string,
  accessToken:string
}
const createButtonStyles = async (session:Session) => {
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

  const postData = JSON.stringify(metafieldData);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': session.accessToken
    },
    body: postData
  };

  try {
    const response = await fetch(`https://${session.shop}/admin/api/2024-01/metafields.json`, options);
    console.log(`statusCode: ${response.status}`);
    const responseData = await response.json();
    console.log("Styles Added Successfully");
  } catch (error) {
    console.error(error);
  }
};

export default createButtonStyles;
