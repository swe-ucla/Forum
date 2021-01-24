const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sweforumdb',
  password: '',
  port: 5432
})

module.exports = pool