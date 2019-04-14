var Config = require('../config/config');
const https = require('https');
const BillLandingModel = require('../models/tvm/BillLandingModel');
const goodsRep = require('../repository/goodsRepository');
const routeRep = require('../repository/routeRepository');

//BillLanding model as request model
async function calculatePremium(data) {
  console.log("client tvm calculatePremium");
  var billLanding = new BillLandingModel();

  var goods = await goodsRep.findByShipmentId(data.id);
  var routes = await routeRep.findByShipmentId(data.id);

  convertedRoutes = routes.map(function(r) {
        return {
            SequenceNr: r.sequencenr,
            FromCountry: r.countryfrom,
            FromPlace: '',
            ToCountry: r.countryto,
            ToPlace: ''
        };
    });

  convertedGoods = goods.map(function(r) {
        return {
            GoodsID: r.id.toString(10),
            //CONTAINER, LIQUID, DRY, BREAKBULK, RORO
            // shipmentid, sequencenr, countryfrom, countryto, carrier, createDate
            GoodsType: "CONTAINER",
            Description: "",
            Value: 1,
            Quantity: 5,
            Weight: 5,
            //OK, DAMAGED, LOST
            Status: 'OK'
        };
    });

  billLanding.TransportRoutes = convertedRoutes;
  billLanding.Goods = convertedGoods;

  billLanding.Sender = data.sender;
  billLanding.fromCountry = data.from;
  billLanding.toCountry = data.to;
  billLanding.Receiver = data.recipient;

  // CalculatePremiumResponce as responce
  return await sendPostRequest('/BillOfLading/CalculatePremium', billLanding);
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
