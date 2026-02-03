const jwt = require("jsonwebtoken");
const { Utilisateur } = require("../models");
const { JWT_SECRET } = require("../utils/jwt");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await Utilisateur.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; //  important
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
