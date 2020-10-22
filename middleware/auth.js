const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const bearer = req.headers.authorization;

  if (bearer === undefined) {
    res.sendStatus(401);
    return;
  }

  const token = bearer.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEYPASS);
    const { folio } = decoded;
    req.user = folio;
    next();
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = auth;