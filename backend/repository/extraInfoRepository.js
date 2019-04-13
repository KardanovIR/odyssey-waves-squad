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
  console.log("createExtraInfo")
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO extrainfo (creater, description, shipmentid, location, createdate) VALUES ($1, $2, $3, $4, $5)',
    [extraInfo.creater, extraInfo.description, extraInfo.shipmentId, extraInfo.location, extraInfo.createData], (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(result);
      })
    })
  }
  
  async function getExtraInfo() {
    console.log("getExtraInfo")
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM extrainfo ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      });
    })
  }
  
  async function findExtraInfoById (extraInfoId) {
    console.log("findExtraInfoById")
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM extrainfo WHERE id = $1', [extraInfoId], (error, results) => {
        if (error) {
          reject(error);
        }
        console.log(results)
        resolve(results.rows);
      })
    })
  }

async function getExtraInfo() {
  console.log("getExtraInfo")
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM extraInfo ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  })
}

  module.exports = {
    createExtraInfo:createExtraInfo,
    findExtraInfoById:findExtraInfoById,
    getExtraInfo:getExtraInfo
  };