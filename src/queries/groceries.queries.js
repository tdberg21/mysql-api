exports.CREATE_GROCERIES_TABLE = `CREATE TABLE IF NOT EXISTS groceries(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
  quantity varchar(10) DEFAULT '1',
  PRIMARY KEY (id)
)`;

exports.CREATE_GROCERIES_TABLE = `CREATE TABLE IF NOT EXISTS groceries(
  grocery_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  grocery_name varchar(255) NOT NULL,
  created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
  quantity DEFAULT 1,
  PRIMARY KEY (grocery_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
)`;

// Get every grocery
exports.ALL_GROCERIES = (userId) => `SELECT * FROM groceries WHERE user_id = ${userId}`;

// Get a single grocery by id
exports.SINGLE_GROCERIES = (userId, groceryId) =>
  `SELECT * FROM groceries WHERE user_id = ${userId} AND grocery_id = ${groceryId}`;

//Insert grocery
exports.INSERT_GROCERY = (userId, groceryName) =>
  `INSERT INTO groceries (user_id, grocery_name) VALUES (${userId}, ${groceryName})`;

//Update existing grocery item
exports.UPDATE_GROCERY = (userId, groceryId, newValues) =>
  `UPDATE groceries SET ${newValues} WHERE user_id = ${userId} AND grocery_id = ${groceryId}`;

// Delete a grocery item by id
exports.DELETE_GROCERY = (userId, groceryId) =>
  `DELETE FROM groceries WHERE user_id = ${userId} AND grocery_id = ${groceryId}`;