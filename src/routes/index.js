const express = require("express");
const router = express.Router();

// Controllers
const { renderIndex, renderAbout } = require("../controllers/index.js");

router.get("/", renderIndex);


module.exports = router;