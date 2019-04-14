var Config = require('../config/config');
const https = require('https');

//BillLanding model as request model
async function calculatePremium(data) {
  console.log("client tvm calculatePremium");
  // CalculatePremiumResponce as responce
  return await sendPostRequest('/BillOfLading/CalculatePremium', data);
}

//BillLanding model as request model
async function insureCargo(data) {
  console.log("client tvm insureCargo");
  //InsureCargoResponce as responce
  return await sendPostRequest('/BillOfLading/InsureCargo', data);
}

//ClaimReport model as request model
async function handleClaim(data) {
  console.log("client tvm handleClaim");
  //HandleClaimResponce as responce
  return await sendPostRequest('/BillOfLading/HandleClaim', data);
}

async function sendPostRequest(url, data) {
  var postData = JSON.stringify(data);

  var options = {
    hostname: Config.tvm.host,
    port: 8000,
    path: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    },
    body: postData
  };

  return new Promise((resolve, reject) => {
    https.request(options, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {

        resolve(JSON.parse(data));
      });

    }).on("error", (err) => {
      reject(err);
    });
  });
}



module.exports = {
  calculatePremium,
  insureCargo,
  handleClaim,
}
