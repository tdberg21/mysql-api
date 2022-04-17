const jwt = require('jsonwebtoken');

const jwtconfig = {
  access: 'secretaccesssecret',
  refresh: 'secretrefreshsecret',
};

const refreshTokens = [];

const generateAccessToken = (id, expiresIn) =>
  jwt.sign({ id }, jwtconfig.access, expiresIn);

const generateRefreshToken = (id, expiresIn) =>
  jwt.sign({ id }, jwtconfig.refresh, expiresIn);

const verifyToken = (token, secret, req, res) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    res.status(500).send({ auth: false, message: 'Token is not valid.' });
  }
};

module.exports = {
  jwtconfig,
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};