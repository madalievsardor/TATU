const express = require("express")
const { register, login, getUsers } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/getUsers", getUsers);

module.exports = router;