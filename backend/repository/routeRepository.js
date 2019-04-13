var Config = require('../config/config');

const Pool = require('pg').Pool
const pool = new Pool({
  user: Config.db.user,
  host: Config.db.host,
  database: Config.db.name,
  password: Config.db.password,
  port: Config.db.port,
})

async function createTransportRoute(transportRoute) {
  console.log("createTransportRoute");
  return new Promise((resolve, reject) => {
      pool.query('INSERT INTO transport_routes (shipmentid, sequencenr, countryfrom, countryto, carrier, createDate) VALUES ($1,$2,$3,$4,$5,$6)',
          [
              transportRoute.shipmentId,
              transportRoute.sequenceNr,
              transportRoute.countryFrom,
              transportRoute.countryTo,
              transportRoute.carrier,
              transportRoute.createDate
          ], (error, results) => {
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

async function findTransportRouteByShipmentId(shipmentid) {
  console.log("getTransportRoute");
  return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM transport_routes ORDER BY id ASC WHERE shipmentid = $1', [shipmentid], (error, results) => {
          if (error) {
              reject(error);
          }
          if(results)
            resolve(results.rows);
          resolve();
      });
  });
}

async function findTransportRouteById(routeid) {
  console.log("getTransportRoute");
  return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM transport_routes ORDER BY id ASC WHERE id = $1', [routeid], (error, results) => {
          if (error) {
              reject(error);
          }
          if(results)
            resolve(results.rows);
          resolve();
      });
  });
}

async function getTransportRoute() {
  console.log("getTransportRoute");
  return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM transport_routes ORDER BY id ASC ', [], (error, results) => {
          if (error) {
              reject(error);
          }
          if(results)
            resolve(results.rows);
          resolve();
      });
  });
}

async function findByShipmentId(shipmentid) {
  console.log("getTransportRoute");
  return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM transport_routes WHERE shipmentid = $1 ORDER BY id ASC ', [shipmentid], (error, results) => {
          if (error) {
              reject(error);
          }
          if(results)
            resolve(results.rows);
          resolve([]);
      });
  });
}

  module.exports = {
    findByShipmentId: findByShipmentId,
    createTransportRoute:createTransportRoute,
    getTransportRoute: getTransportRoute,
    findTransportRouteById: findTransportRouteById,
    findByShipmentId:findByShipmentId
  };