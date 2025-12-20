const express = require('express');
const authMiddleware = require('../middleware/auth');
const { allEvents } = require('../controllers/eventController');
const router = express.Router();

router.get('/allEvents', allEvents)
module.exports = router;