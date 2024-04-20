const mysql = require('mysql2')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'D6_Aadesh_84030',
  password: 'AADESH',
  port: 3306,
  database: 'pune',
  connectionLimit: 10,
})

module.exports = {
  pool,
}
