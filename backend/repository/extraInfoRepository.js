var Config = require('../config/config');

const Pool = require('pg').Pool
const pool = new Pool({
  user: Config.db.user,
  host: Config.db.host,
  database: Config.db.name,
  password: Config.db.password,
  port: Config.db.port,
})



async function createExtraInfo (extraInfo) {
  console.log("db createExtraInfo")
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO extrainfo (creater, description, shipmentid, location, createdate) VALUES ($1, $2, $3, $4, $5)',
    [extraInfo.creater, extraInfo.description, extraInfo.shipmentId, extraInfo.location, extraInfo.createData], (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        if(results)
            resolve(results.rows);
          resolve();
      })
    })
  }
  
  async function getExtraInfo() {
    console.log("db getExtraInfo")
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM extrainfo ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error);
        }
        if(results)
            resolve(results.rows);
          resolve();
      });
    })
  }
  
  async function findExtraInfoById (extraInfoId) {
    console.log("db findExtraInfoById")
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM extrainfo WHERE id = $1', [extraInfoId], (error, results) => {
        if (error) {
          reject(error);
        }
        console.log(results)
        if(results)
            resolve(results.rows);
          resolve();
      })
    })
  }

async function getExtraInfo() {
  console.log("db getExtraInfo")
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM extraInfo ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      if(results)
            resolve(results.rows);
          resolve();
    });
  })
}

async function findByShipmentId (shipmentId) {
  console.log("db findExtraInfoByShipmentId")
  return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM extrainfo WHERE shipmentid = $1', [shipmentId], (error, results) => {
      if (error) {
        reject(error);
      }
      if(results)
            resolve(results.rows);
          resolve([]);
    })
  })
}

  module.exports = {
    createExtraInfo:createExtraInfo,
    findExtraInfoById:findExtraInfoById,
    getExtraInfo:getExtraInfo,
    findByShipmentId:findByShipmentId
  };