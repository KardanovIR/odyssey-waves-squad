var Config = require('../config/config');
const https = require('https');
const BillLandingModel = require('../models/tvm/BillLandingModel');
const goodsRep = require('../repository/goodsRepository');
const routeRep = require('../repository/routeRepository');

async function expandShipment(shipment) {
    var goods = await goodsRep.findByShipmentId(shipment.id);
    var routes = await routeRep.findByShipmentId(shipment.id);

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


    var billLanding = new BillLandingModel();

    billLanding.TransportRoutes = convertedRoutes;
    billLanding.Goods = convertedGoods;

    billLanding.Sender = shipment.sender;
    billLanding.fromCountry = shipment.from;
    billLanding.toCountry = shipment.to;
    billLanding.Receiver = shipment.recipient;

    return billLanding;
}

//BillLanding model as request model
async function calculatePremium(data) {
  console.log("client tvm calculatePremium");
  var billLanding = await expandShipment(data);

  // CalculatePremiumResponce as responce
  return await sendPostRequest('/BillOfLading/CalculatePremium', billLanding);
}

//BillLanding model as request model
async function insureCargo(data) {
  console.log("client tvm insureCargo");
    var billLanding = await expandShipment(data);
  //InsureCargoResponce as responce
  return await sendPostRequest('/BillOfLading/InsureCargo', billLanding);
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
