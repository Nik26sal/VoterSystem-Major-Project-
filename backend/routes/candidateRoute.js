const express = require('express');
const { createCandidate } = require('../controllers/candidateController');
const router = express.Router();

router.post('/createCandidate',createCandidate);


module.exports = router;