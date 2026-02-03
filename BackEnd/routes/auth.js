const express = require('express');
const router = express.Router();


const authController = require("../controllers/authCont");

router.post("/register", authController.register);
router.post("/login", authController.login);













module.exports = router;