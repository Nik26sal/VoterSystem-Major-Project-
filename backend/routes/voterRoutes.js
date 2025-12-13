const express = require('express');
const { createVoter } = require('../controllers/voterController');

const router = express.Router();

router.post('/createVoter',createVoter)

module.exports = router;