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
    pool.query('INSERT INTO metrics (deviceid, type, value) VALUES ($1, $2, $3)', [metrics.deviceId, metrics.type, metrics.value], (error, result) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      resolve();
    })
  })
}


module.exports = {
  getUsers: getUsers,
  createUser: createUser,
  createMetrics: createMetrics
};