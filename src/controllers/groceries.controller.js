const connection = require("../db-config");
const {
  ALL_GROCERIES,
  SINGLE_GROCERIES,
  INSERT_GROCERY,
  UPDATE_GROCERY,
  DELETE_GROCERY,
} = require("../queries/groceries.queries");
const query = require("../utils/query");

exports.getAllGroceries = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const groceries = await query(con, ALL_GROCERIES).catch((err) => {
    res.send(err);
  });

  if (groceries.length) {
    res.json(groceries);
  }
};

// http://localhost:3000/groceries/1
exports.getGrocery = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const grocery = await query(con, SINGLE_GROCERIES, [req.params.groceryId]).catch(
    (err) => {
      res.send(err);
    }
  );

  if (grocery.length) {
    res.json(grocery);
  }
};

exports.createGrocery = async (req, res) => {
  const decoded = req.user;

  if (decoded.id) {
    const con = await connection().catch((err) => {
      throw err;
    });

    const result = await query(con, INSERT_GROCERY, [req.body.name]).catch(
      (err) => {
        res.send(err);
      }
    );
    console.log(result);

    if (result.affectedRows === 1) {
      res.json({ message: 'Added task successfully!' });
    }
  }
};

exports.updateGrocery = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const result = await query(con, UPDATE_GROCERY, [
    req.body.name,
    req.body.quantity,
    req.params.groceryId,
  ]).catch((err) => {
    res.send(err);
  });

  if (result.affectedRows === 1) {
    res.json(result);
  }
};


exports.deleteGrocery = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const result = await query(con, DELETE_GROCERY, [req.params.groceryId]).catch(
    (err) => {
      res.send(err);
    }
  );

  if (result.affectedRows === 1) {
    res.json({ message: 'Deleted successfully.' });
  }
};
