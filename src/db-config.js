const mysql = require("mysql");
const { CREATE_USERS_TABLE } = require("./queries/auth.queries");
const { CREATE_GROCERIES_TABLE } = require("./queries/groceries.queries");
const query = require("./utils/query");

const host = process.env.DB_HOST || "localhost";

const user = process.env.DB_USER || "root";

const password = process.env.DB_PASS || "password";

const database = process.env.DB_DATABASE || "grocerydb";

const connection = async () =>
  new Promise((resolve, reject) => {
    const con = mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    con.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
    });

    resolve(con);
  });

(async () => {
  const _con = await connection().catch((err) => {
    throw err;
  });

  const userTableCreated = await query(_con, CREATE_USERS_TABLE).catch(
    (err) => {
      console.log(err);
      reject(err);
    }
  );

  const groceriesTableCreated = await query(_con, CREATE_GROCERIES_TABLE).catch(
    (err) => {
      console.log(err);
      reject(err);
    }
  );

  if (!!userTableCreated && !!groceriesTableCreated) {
    console.log('Tables have been created!');
    // resolve(_con);
  }
})();

module.exports = connection;
