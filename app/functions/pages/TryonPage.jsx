const https = require('https');

const TryonPage = async (session) => {
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
    hostname: `${shop}`,
    path: '/admin/api/2024-01/pages.json',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': pageData.length,
      'X-Shopify-Access-Token': accessToken
    }
  };

  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.write(pageData);
  req.end();
};

export default TryonPage;
