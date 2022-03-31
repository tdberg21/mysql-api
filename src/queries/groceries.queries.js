exports.CREATE_GROCERIES_TABLE = `CREATE TABLE IF NOT EXISTS groceries(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
  status varchar(10) DEFAULT 'pending',
  PRIMARY KEY (id)
)`;

// Get every grocery
exports.ALL_GROCERIES = `SELECT * FROM groceries`;

// Get a single grocery by id
exports.SINGLE_GROCERIES = `SELECT * FROM groceries WHERE id = ?`;

//Insert grocery
exports.INSERT_GROCERY = `INSERT INTO groceries (name) VALUES (?)`;

//Update existing grocery item
exports.UPDATE_GROCERY = `UPDATE groceries SET name = ?, status = ? WHERE id = ?`;

// Delete a grocery item by id
exports.DELETE_GROCERY = `DELETE FROM groceries WHERE id = ?`;