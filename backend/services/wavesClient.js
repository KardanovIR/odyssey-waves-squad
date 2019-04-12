var Config = require('../config/config');
const Broadcast =  require('@waves/waves-transactions');
const https = require('https');

async function getLastBlock(){
  return new Promise((resolve, reject) => {
    https.get(Config.waves.host+'/blocks/last', (resp) => {
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

async function sendToWaves(req){
    return new Promise((resolve, reject) => {
      broadcast(signedTx, nodeUrl).then(resp => {
        resolve(resp);
      
    });
    reject();
  });
}

module.exports = {
    sendToWaves,
    getLastBlock
  }
  