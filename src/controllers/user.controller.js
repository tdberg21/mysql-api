const bcrypt = require("bcryptjs");

const connection = require("../db-config");
const query = require("../utils/query");
const {
  GET_ME_BY_USER_ID,
  GET_ME_BY_USER_ID_WITH_PASSWORD,
  UPDATE_USER,
} = require("../queries/user.queries");

exports.getUser = async (req, res) => {
  const user = req.user;

  if (user.id) {
    const con = await connection().catch((err) => {
      throw err;
    });

    const user = await query(con, GET_ME_BY_USER_ID, [user.id]).catch((err) => {
      res.status(500).json({ msg: "Could not find the user." });
    });

    if (!user.length) {
      res.status(400).json({ msg: "No user found." });
    }
    res.status(200).send(user);
  }
};

exports.updateUser = async function (req, res) {
  const con = await connection().catch((err) => {
    throw err;
  });

  const user = await query(con, GET_ME_BY_USER_ID_WITH_PASSWORD, [
    req.user.id,
  ]).catch((err) => {
    res.status(500);
    res.json({ msg: "Could not retrieve user." });
  });

  const passwordUnchanged = await bcrypt
    .compare(req.body.password, user[0].password)
    .catch((err) => {
      res.json(500).json({ msg: "Invalid password!" });
    });

  if (!passwordUnchanged) {
    const passwordHash = bcrypt.hashSync(req.body.password);

    const result = await query(con, UPDATE_USER, [
      req.body.username,
      req.body.email,
      passwordHash,
      user[0].id,
    ]).catch((err) => {
      res.status(500).json({ msg: "Could not update user settings." });
    });

    if (result.affectedRows === 1) {
      res.json({ msg: "Updated succesfully!" });
    }
    res.json({ msg: "Nothing to update..." });
  }
};
