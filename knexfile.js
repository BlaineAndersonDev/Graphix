// REQUIRED for dotenv to work properly in knex.
require('dotenv').config();
// const pg = require('pg')
// pg.defaults.ssl = true
// Check this for heroku setup:
// https://elements.heroku.com/addons/heroku-postgresql

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : process.env.SERVER_KNEX_DEV_DB_USERNAME,
      password : process.env.SERVER_KNEX_DEV_DB_PASSWORD,
      database : process.env.SERVER_KNEX_DEV_DB_NAME,
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: {
      user : process.env.SERVER_KNEX_PROD_DB_USERNAME,
      password : process.env.SERVER_KNEX_PROD_DB_PASSWORD,
      database : process.env.SERVER_KNEX_PROD_DB_NAME,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
