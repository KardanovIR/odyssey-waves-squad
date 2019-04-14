var Config = require('../config/config');

const Pool = require('pg').Pool
const pool = new Pool({
  user: Config.db.user,
  host: Config.db.host,
  database: Config.db.name,
  password: Config.db.password,
  port: Config.db.port,
})



async function create(extraInfo) {
  console.log("db createExtraInfo")
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO extrainfo (creater, description, shipmentid, location, createdate) VALUES ($1, $2, $3, $4, $5)',
      [extraInfo.creater, extraInfo.description, extraInfo.shipmentId, extraInfo.location, extraInfo.createData], (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        if (results){
          var extraInfo = results.rows;
          extraInfo.forEach(element => {
            element= fillApiFields(element);
          });
        
          resolve(extraInfo[0]);
        }
        resolve([]);
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
      if (results){
        var extraInfo = results.rows;
        extraInfo.forEach(element => {
          element= fillApiFields(element);
        });
      
        resolve(extraInfo);
      }
      resolve([]);
    });
  })
}

async function findExtraInfoById(extraInfoId) {
  console.log("db findExtraInfoById")
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM extrainfo WHERE id = $1', [extraInfoId], (error, results) => {
      if (error) {
        reject(error);
      }
      console.log(results)
      if (results){
        var extraInfo = results.rows;
        extraInfo.forEach(element => {
          element= fillApiFields(element);
        });
      
        resolve(extraInfo[0]);
      }
      resolve([]);
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
      if (results){
        var extraInfo = results.rows;
        extraInfo.forEach(element => {
          element= fillApiFields(element);
        });
      
        resolve(extraInfo);
      }
      resolve([]);
    });
  })
}

async function findByShipmentId(shipmentId) {
  console.log("db findExtraInfoByShipmentId")
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM extrainfo WHERE shipmentid = $1', [shipmentId], (error, results) => {
      if (error) {
        reject(error);
      }
      if (results){
        var extraInfo = results.rows;
        extraInfo.forEach(element => {
          element= fillApiFields(element);
        });
      
        resolve(extraInfo);
      }
      resolve([]);
    })
  })
}

function fillApiFields(extraInfo){
  extraInfo.shipmentId = extraInfo.shipmentid;
  extraInfo.createDate = extraInfo.createdate;
  return extraInfo;
}

module.exports = {
  create: create,
  findExtraInfoById: findExtraInfoById,
  getExtraInfo: getExtraInfo,
  findByShipmentId: findByShipmentId
};