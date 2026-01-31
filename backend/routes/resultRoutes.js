const express = require("express");
const router = express.Router();
const { getEventResults } = require("../controllers/resultController");

router.get("/:eventId", getEventResults);

module.exports = router;
