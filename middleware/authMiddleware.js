const jwt = require("jsonwebtoken");

const secreto =
  "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7";

const requireAuth = (req, res, next) => {
  // const token = req.headers.authorization;
  let token = req.get("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Acceso no autorizado, no existe token" });
  }

  jwt.verify(token, secreto, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Acceso no autorizado, token no verificado", error: err });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { requireAuth };
