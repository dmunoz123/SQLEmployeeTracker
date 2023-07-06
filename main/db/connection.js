const mysql = require('mysql2');

const con mysql.createConnection({
  host: 'locahost',
  user: 'root',
  password: 'password',
  database: 'employees'
});

con.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;