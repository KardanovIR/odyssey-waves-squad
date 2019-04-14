var Config = require('../config/config');

const Pool = require('pg').Pool
const pool = new Pool({
  user: Config.db.user,
  host: Config.db.host,
  database: Config.db.name,
  password: Config.db.password,
  port: Config.db.port,
})

async function create(transportRoute) {
  console.log("db createTransportRoute");
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
        if (results){
          var routes = results.rows;
          routes.forEach(element => {
            element= fillApiFields(element);
          });
        
          resolve(routes[0]);
        }
        resolve([]);
      })
  })
}

async function findTransportRouteById(routeid) {
  console.log("db getTransportRoute");
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM transport_routes ORDER BY id ASC WHERE id = $1', [routeid], (error, results) => {
      if (error) {
        reject(error);
      }
      if (results){
        var routes = results.rows;
        routes.forEach(element => {
          element= fillApiFields(element);
        });
      
        resolve(routes[0]);
      }
      resolve([]);
    });
  });
}

async function getTransportRoute() {
  console.log("db getTransportRoute");
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM transport_routes ORDER BY id ASC ', [], (error, results) => {
      if (error) {
        reject(error);
      }
      if (results){
        var routes = results.rows;
        routes.forEach(element => {
          element= fillApiFields(element);
        });
      
        resolve(routes);
      }
      resolve([]);
    });
  });
}

async function findByShipmentId(shipmentid) {
  console.log("db getTransportRoute by shipmentId");
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM transport_routes WHERE shipmentid = $1 ORDER BY id ASC ', [shipmentid], (error, results) => {
      if (error) {
        reject(error);
      }
      if (results){
        var routes = results.rows;
        routes.forEach(element => {
          element= fillApiFields(element);
        });
      
        resolve(routes);
      }
      resolve([]);
    });
  });
}

function fillApiFields(route){
  route.shipmentId = route.shipmentid;
  route.createDate = route.createdate;
  route.countryFrom = route.countryfrom;
  route.countryTo = route.countryto;
  return route;
}

module.exports = {
  findByShipmentId: findByShipmentId,
  create: create,
  getTransportRoute: getTransportRoute,
  findTransportRouteById: findTransportRouteById,
  findByShipmentId: findByShipmentId
};