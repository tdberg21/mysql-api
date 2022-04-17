exports.CREATE_GROCERIES_TABLE = `CREATE TABLE IF NOT EXISTS groceries(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
  quantity varchar(10) DEFAULT '1',
  PRIMARY KEY (id)
)`;

// Get every grocery
exports.ALL_GROCERIES = `SELECT * FROM groceries`;

// Get a single grocery by id
exports.SINGLE_GROCERIES = `SELECT * FROM groceries WHERE id = ?`;

//Insert grocery
exports.INSERT_GROCERY = `INSERT INTO groceries (name, quantity) VALUES (?, ?)`;

//Update existing grocery item
exports.UPDATE_GROCERY = `UPDATE groceries SET name = ?, quantity = ? WHERE id = ?`;

// Delete a grocery item by id
exports.DELETE_GROCERY = `DELETE FROM groceries WHERE id = ?`;