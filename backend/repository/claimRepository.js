var Config = require('../config/config');

const Pool = require('pg').Pool
const pool = new Pool({
  user: Config.db.user,
  host: Config.db.host,
  database: Config.db.name,
  password: Config.db.password,
  port: Config.db.port,
})

async function createClaim (goods) {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO claims (description, type, value, quantity, wight, shipmentid) VALUES ($1, $2, $3, $4, $5, $6)', 
        [goods.description, goods.type, goods.value, goods.quantity, goods.wight, goods.shipmentId], (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve();
      })
    })
  }
  
  async function getClaims() {
    console.log("getClaims")
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM claims ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      });
    })
  }
  
  async function findClaimsById (claimId) {
    console.log("findClaimsById")
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM claims WHERE id = $1', [goodsId], (error, results) => {
        if (error) {
          reject(error);
        }
        console.log(results)
        resolve(results.rows);
      })
    })
  }

  module.exports = {
    findClaimsById:findClaimsById,
    getClaims:getClaims,
    createClaim:createClaim
  };