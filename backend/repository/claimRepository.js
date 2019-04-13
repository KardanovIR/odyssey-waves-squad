var Config = require('../config/config');

const Pool = require('pg').Pool
const pool = new Pool({
  user: Config.db.user,
  host: Config.db.host,
  database: Config.db.name,
  password: Config.db.password,
  port: Config.db.port,
})

async function createClaim (claim) {
  console.log("createClaim")
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO claims (creater, description, shipmentid, location, createdate) VALUES ($1, $2, $3, $4, $5)',
        [claim.creater, claim.description, claim.shipmentId, claim.location, claim.createData], (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(result);
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
  
  async function findClaimById (claimId) {
    console.log("findClaimsById")
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM claims WHERE id = $1', [claimId], (error, results) => {
        if (error) {
          reject(error);
        }
        console.log(results)
        resolve(results.rows);
      })
    })
  }

  module.exports = {
    findClaimById:findClaimById,
    getClaims:getClaims,
    createClaim:createClaim
  };