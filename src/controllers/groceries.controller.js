const con = require("../db-config");
const queries = require("../queries/groceries.queries");

exports.getAllGroceries = function (req, res) {
  con.query(queries.ALL_GROCERIES, function (err, result, fields) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

// http://localhost:3000/groceries/1
exports.getGrocery = function (req, res) {
  con.query(
    queries.SINGLE_GROCERY,
    [req.params.groceryId],
    function (err, result) {
      if (err) {
        res.send(err);
      }
      res.json(result);
    }
  );
};

exports.createGrocery = function (req, res) {
  con.query(queries.INSERT_GROCERY, [req.body.name], function (err, result) {
    if (err) {
      res.send(err);
    }
    console.log(result);
    res.json({ message: "Number of records inserted: " + result.affectedRows });
  });
};

exports.updateGrocery = function (req, res) {
  con.query(
    queries.UPDATE_GROCERY,
    [req.body.name, req.body.status, req.params.groceryId],
    function (err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);
    }
  );
};

exports.deleteGrocery = function (req, res) {
  con.query(queries.DELETE_GROCERY, [req.params.groceryId], function (err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Deleted successfully." });
  });
};
