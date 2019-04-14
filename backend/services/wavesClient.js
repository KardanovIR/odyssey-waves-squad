var Config = require('../config/config');
const Waves = require('@waves/waves-transactions');
const https = require('https');

async function getLastBlock() {

  console.log("client waves getLastBlock");
  return new Promise((resolve, reject) => {
    https.get(Config.waves.host + '/blocks/last', (resp) => {
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

async function sendToWaves(req) {
  console.log("client waves sendToWaves");
  return new Promise((resolve, reject) => {
    Waves.broadcast(signedTx, nodeUrl).then(resp => {
      resolve(resp);
    });
    reject();
  });
}

async function writeDataToWaves(key, obj) {
    console.log("client waves writeShipmentToWaves");
    return new Promise((resolve, reject) => {
        const params = {
            data: [
                {key: key, value: JSON.stringify(obj)}
            ],
            senderPublicKey: obj.sender
        };

        const signedDataTx = Waves.data(params, null);
        Waves.broadcast(signedDataTx, Config.waves.host).then(resp => {
            resolve(resp);
        });
        reject();
    });
}

module.exports = {
    sendToWaves,
    getLastBlock,
    writeDataToWaves
};