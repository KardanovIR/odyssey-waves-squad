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
    pool.query('INSERT INTO metrics (deviceid, type, value, createDate) VALUES ($1, $2, $3, $4)', [metrics.deviceId, metrics.type, metrics.value, metrics.createDate], (error, result) => {
      if (error) {
        console.log(error);
        reject(error);
      }
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
      resolve(results.rows);
    });
  })
}
  module.exports = {
    createMetrics: createMetrics,
    getMetrics:getMetrics,
  };