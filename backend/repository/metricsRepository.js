var Config = require('../config/config');

const Pool = require('pg').Pool
const pool = new Pool({
  user: Config.db.user,
  host: Config.db.host,
  database: Config.db.name,
  password: Config.db.password,
  port: Config.db.port,
})

async function createMetrics (metrics) {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO metrics (deviceid, type, value, createDate) VALUES ($1, $2, $3, $4)', [metrics.deviceId, metrics.type, metrics.value, metrics.createDate], (error, results) => {
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

async function getMetrics() {
  console.log("getMetrics")
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM metrics ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      if(results)
            resolve(results.rows);
          resolve();
    });
  })
}

async function findByDeviceId(deviceId) {
  console.log("getMetrics")
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM metrics Where deviceid = $1 ORDER BY id ASC', [deviceId], (error, results) => {
      if (error) {
        reject(error);
      }
      if(results)
            resolve(results.rows);
          resolve([]);
    });
  })
}

  module.exports = {
    createMetrics: createMetrics,
    getMetrics:getMetrics,
    findByDeviceId:findByDeviceId
  };