const env = process.env.ENV || 'dev'; // 'dev' or 'test'

const dev = {
 app: {
   port: parseInt(process.env.DEV_APP_PORT) || 8080
 },
 db: {
   host: process.env.DEV_DB_HOST || 'localhost',
   port: parseInt(process.env.DEV_DB_PORT) || 5432,
   name: process.env.DEV_DB_NAME || 'cargo',
   user: process.env.DEV_DB_USER ||'postgres',
   password : process.env.DEV_DB_PASSWORD || '{3kmc!yr!'
 },
 waves: {
   host: process.env.DEV_WAVES_HOST|| 'https://testnodes.wavesnodes.com'
 }
};
const test = {
 app: {
   port: parseInt(process.env.TEST_APP_PORT) || 8080
 },
 db: {
    host: process.env.TEST_DB_HOST || 'localhost',
    port: parseInt(process.env.TEST_DB_PORT) || 5432,
    name: process.env.TEST_DB_NAME || 'cargo',
    user: process.env.TEST_DB_USER ||'postgres',
    password : process.env.TEST_DB_PASSWORD || '{3kmc!yr!'
 }
};

const config = {
 dev,
 test
};

module.exports = config[env];