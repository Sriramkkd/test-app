const TryonPage = async (session: { shop: string; accessToken: string }) => {
  const shop = session.shop;
  const accessToken = session.accessToken;

  const pageData = JSON.stringify({
    page: {
      title: 'Mirrar Tryon',
      body_html: `<script>
let hasReloaded = false;
let scriptCount = 0;

function reloadPageOnce() {
  if (!hasReloaded) {
    hasReloaded = true;
    window.location.reload();
  }
}

function loadingScript(url, callback) {
  var script = document.createElement('script');
  script.src = url;
  script.onload = callback;
  document.head.appendChild(script);
}

var urlParams = new URLSearchParams(window.location.search);
var myParam = urlParams.get('sku');

if (scriptCount === 0 || scriptCount >= 3) {
  scriptCount++;
  loadingScript('https://code.jquery.com/jquery-3.6.0.min.js', function () {
    if (scriptCount === 1 || scriptCount >= 3) {
      scriptCount++;
      loadingScript('https://cdn.mirrar.online/js/init.min.js', function () {
        if (scriptCount === 2 || scriptCount >= 3) {
          scriptCount++;
          loadingScript('https://cdn.shopify.com/s/files/1/0645/8828/4088/files/tryon-modal.js?v=1712565964', function () {
            // All scripts have loaded, now you can use jQuery
            $("#popup1").css({ "z-index": "9999", "visibility": "visible", "opacity": "1" });
          });
        }
      });
    }
  });
}
</script>`
    }
  });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(pageData).toString(),
      'X-Shopify-Access-Token': accessToken
    },
    body: pageData
  };

  try {
    const response = await fetch(`https://${shop}/admin/api/2024-01/pages.json`, options);
    console.log(`statusCode: ${response.status}`);
    const responseData = await response.json();
    console.log("Page added Successfully");
  } catch (error) {
    console.error(error);
  }
};

export default TryonPage;
