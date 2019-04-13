var Config = require('../config/config');

const Pool = require('pg').Pool
const pool = new Pool({
  user: Config.db.user,
  host: Config.db.host,
  database: Config.db.name,
  password: Config.db.password,
  port: Config.db.port,
})


  module.exports = {
    findClaimsById:findClaimsById,
    getClaims:getClaims,
    createClaim:createClaim
  };