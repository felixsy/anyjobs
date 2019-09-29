const express = require("express");
const router = express.Router();

const employerController = require("../controllers/employerController");

router.get("/login", employerController.login);
router.post("/login", employerController.postLogin);

router.get("/signup", employerController.signup);
router.post("/signup", employerController.postSignup);

module.exports = router;
