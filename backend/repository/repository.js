var Config = require('../config/config');

const Pool = require('pg').Pool
const pool = new Pool({
  user: Config.db.user,
  host: Config.db.host,
  database: Config.db.name,
  password: Config.db.password,
  port: Config.db.port,
})

async function getUsers() {
  console.log("getUsers")
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  })
}

async function createUser (contact) {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [contact.name, contact.email], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result.insertId);
    })
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

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
async function createClaim (claim) {
  console.log("createClaim")
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO claims (createrid, description, shipmentid, location, createdate) VALUES ($1, $2, $3, $4, $5)', 
        [claim.createrId, claim.description, claim.shipmentId, claim.location, claim.createData], (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(result);
      })
    })
  }
  
  async function getClaims() {
    console.log("getClaims")
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM claims ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      });
    })
  }
  
  async function findClaimByid (claimId) {
    console.log("findClaimsById")
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM claims WHERE id = $1', [claimId], (error, results) => {
        if (error) {
          reject(error);
        }
        console.log(results)
        resolve(results.rows);
      })
    })
  }



module.exports = {
  getUsers: getUsers,
  createUser: createUser,
  createMetrics: createMetrics,
  getMetrics:getMetrics,
  createGoods:createGoods,
  getGoods: getGoods,
  findGoodsById: findGoodsById,
  createClaim:createClaim,
  findClaimByid:findClaimByid,
  getClaims:getClaims
};