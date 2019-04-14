var Config = require('../config/config');

const Pool = require('pg').Pool
const pool = new Pool({
  user: Config.db.user,
  host: Config.db.host,
  database: Config.db.name,
  password: Config.db.password,
  port: Config.db.port,
})

async function createClaim(claim) {
  console.log("db create Claim")
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO claims (creater, description, shipmentid, location, createdate) VALUES ($1, $2, $3, $4, $5)',
      [claim.creater, claim.description, claim.shipmentId, claim.location, claim.createData], (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        if (results)
          resolve(results.rows);
        resolve();
      })
  })
}

async function getClaims() {
  console.log("db get Claims")
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM claims ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      if (results)
        resolve(results.rows);
      resolve();
    });
  })
}

async function findById(claimId) {
  console.log("db find Claims ById")
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM claims WHERE id = $1', [claimId], (error, results) => {
      if (error) {
        reject(error);
      }
      if (results)
        resolve(results.rows);
      resolve();
    })
  })
}

async function findByShipmentId(shipmentId) {
  console.log("db find Claims ByShipmentId")
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM claims WHERE shipmentid = $1', [shipmentId], (error, results) => {
      if (error) {
        reject(error);
      }
      if (results){
        var claims = results.rows;
        claims.forEach(element => {
          element= fillApiFields(element);
        });
      
        resolve(claims);
      }
      resolve([]);
    })
  })
}

function fillApiFields(claim){
  claim.shipmentId = claim.shipmentid;
  claim.createDate = claim.createdate;
  return claim;
}

module.exports = {
  findById: findById,
  getClaims: getClaims,
  createClaim: createClaim,
  findByShipmentId: findByShipmentId
};