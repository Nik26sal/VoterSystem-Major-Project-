const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteController");
const authMiddleware = require('../middleware/auth');

router.post("/vote", voteController.castVote);
router.get("/my-votes", authMiddleware,voteController.getMyVotes);

module.exports = router;
