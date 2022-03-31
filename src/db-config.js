const mysql = require('mysql');
const queries = require('./queries/groceries.queries');

const host = process.env.DB_HOST || 'localhost';

const user = process.env.DB_USER || 'root';

const password = process.env.DB_PASS || 'password';

const database = process.env.DB_DATABASE || 'grocerydb';

const con = mysql.createConnection({
  host,
  user,
  password,
  database
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');

  con.query(queries.CREATE_GROCERIES_TABLE, function(err, result) {
    if (err) throw err;
    console.log('Table created or exists already!');
  });
});

module.exports = con;