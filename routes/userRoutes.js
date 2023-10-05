const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();

router.post("/register", controller.register);
router.post("/sign_in", controller.sign_in);
router.post("/profile", controller.loginRequired, controller.profile);

module.exports = router;
