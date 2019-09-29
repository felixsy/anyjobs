const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");

router.get("/", homeController.index);
router.get("/postfreejobs", homeController.freejobs);
router.post("/postfreejobs", homeController.postfreejobs);

module.exports = router;
