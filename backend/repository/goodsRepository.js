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
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO goods (description, type, value, quantity, wight, shipmentid) VALUES ($1, $2, $3, $4, $5, $6)', 
      [goods.description, goods.type, goods.value, goods.quantity, goods.wight, goods.shipmentId], (error, result) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      resolve();
    })
  })
}

async function updateGoods (goods) {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE goods SET description = $2, type = $3, value = $4, quantity = $5, wight = $6, shipmentid = $7 WHERE id = $1',
        [goods.id, goods.description, goods.type, goods.value, goods.quantity, goods.wight, goods.shipmentId], (error, result) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          resolve();
        })
  })
}

async function getGoods() {
  console.log("getGoods")
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM goods ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  })
}

async function findGoodsById (goodsId) {
  console.log("findGoodsById")
  return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM goods WHERE id = $1', [goodsId], (error, results) => {
      if (error) {
        reject(error);
      }
      console.log(results)
      resolve(results.rows);
    })
  })
}

  module.exports = {
    createGoods:createGoods,
    getGoods: getGoods,
    findGoodsById: findGoodsById,
  };