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
          ], (error, result) => {
              if (error) {
                  console.log(error);
                  reject(error);
              }
              resolve(result);
          })
  })
}

async function findTransportRouteById(shipmentid) {
  console.log("getTransportRoute");
  return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM transport_routes ORDER BY id ASC WHERE shipmentid = $1', [shipmentid], (error, results) => {
          if (error) {
              reject(error);
          }
          resolve(results.rows);
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
          resolve(results.rows);
      });
  });
}

  module.exports = {
    findTransportRouteById: findTransportRouteById,
    createTransportRoute:createTransportRoute,
    getTransportRoute: getTransportRoute
  };