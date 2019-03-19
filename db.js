const pg = require('pg')

const dbPassword = process.env.SERVER_KNEX_DEV_DB_PASSWORD;

const config = {
  user: process.env.SERVER_KNEX_DEV_DB_USERNAME,
  database: process.env.SERVER_KNEX_DEV_DB_NAME,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000
}

const pool = new pg.Pool(config);

module.exports = pool;
