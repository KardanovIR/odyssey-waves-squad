var Config = require('../config/config');

const Pool = require('pg').Pool
const pool = new Pool({
  user: Config.db.user,
  host: Config.db.host,
  database: Config.db.name,
  password: Config.db.password,
  port: Config.db.port,
})

async function createGoods (goods) {
  console.log("db create goods");
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO goods (description, type, value, quantity, wight, shipmentid) VALUES ($1, $2, $3, $4, $5, $6)', 
      [goods.description, goods.type, goods.value, goods.quantity, goods.wight, goods.shipmentId], (error, results) => {
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

async function update (goods) {
  console.log("db update goods")
  return new Promise((resolve, reject) => {
    pool.query('UPDATE goods SET description = $2, type = $3, value = $4, quantity = $5, wight = $6, shipmentid = $7 WHERE id = $1',
        [goods.id, goods.description, goods.type, goods.value, goods.quantity, goods.wight, goods.shipmentId], (error, results) => {
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

async function getGoods() {
  console.log("db getGoods")
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM goods ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      if(results)
            resolve(results.rows);
          resolve();
    });
  })
}

async function findGoodsById (goodsId) {
  console.log("db findGoodsById")
  return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM goods WHERE id = $1', [goodsId], (error, results) => {
      if (error) {
        reject(error);
      }
      if(results)
            resolve(results.rows);
          resolve();
    })
  })
}

async function findByShipmentId(shipmentid) {
  console.log("db findGoodsByShipmentId");
  return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM goods WHERE shipmentid = $1 ORDER BY id ASC', [shipmentid], (error, results) => {
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
    createGoods:createGoods,
    getGoods: getGoods,
    findGoodsById: findGoodsById,
    findByShipmentId: findByShipmentId,
    update: update
  };