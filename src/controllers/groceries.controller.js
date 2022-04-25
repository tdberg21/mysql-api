const connection = require("../db-config");
const {
  ALL_GROCERIES,
  SINGLE_GROCERIES,
  INSERT_GROCERY,
  UPDATE_GROCERY,
  DELETE_GROCERY,
} = require("../queries/groceries.queries");
const query = require("../utils/query");
const { serverError } = require('../utils/handlers');

exports.getAllGroceries = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const groceries = await query(con, ALL_GROCERIES(req.user.id)).catch(
    serverError(res)
  );

  if (!groceries.length) {
    res.status(400).json({ msg: 'No groceries available for this user.' });
  }
  res.json(groceries);
};

// http://localhost:3000/groceries/1
exports.getGrocery = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const grocery = await query(
    con,
    SINGLE_GROCERIES(req.user.id, req.params.groceryId)
  ).catch(serverError(res));

  if (!grocery.length) {
    res.status(400).json({ msg: 'No groceries available for this user.' });
  }
  res.json(grocery);
};

exports.createGrocery = async (req, res) => {
  const user = req.user;

  if (user.id) {
    const con = await connection().catch((err) => {
      throw err;
    });

    const groceryName = mysql.escape(req.body.grocery_name);
    const result = await query(con, INSERT_GROCERY(user.id, groceryName)).catch(
      serverError(res)
    );

    if (result.affectedRows !== 1) {
      res
        .status(500)
        .json({ msg: `Unable to add grocery to list: ${req.body.grocery_name}` });
    }
    res.json({ msg: 'Added grocery successfully!' });
  }
};

const _buildValuesString = (req) => {
  const body = req.body;
  const values = Object.keys(body).map(
    (key) => `${key} = ${mysql.escape(body[key])}`
  );

  values.push(`created_date = NOW()`);
  values.join(', ');
  return values;
};

exports.updateGrocery = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });
  const values = _buildValuesString(req);

  const result = await query(
    con,
    UPDATE_GROCERY(req.user.id, req.params.groceryId, values)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to update grocery list: '${req.body.grocery_name}'` });
  }
  res.json(result);
};

exports.deleteGrocery = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const result = await query(
    con,
    DELETE_GROCERY(req.user.id, req.params.groceryId)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({ msg: `Unable to delete grocery at: ${req.params.groceryId}` });
  }
  res.json({ msg: 'Deleted successfully.' });
};
