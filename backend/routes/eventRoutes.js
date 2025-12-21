const express = require('express');
const authMiddleware = require('../middleware/auth');
const { allEvents, onlyOneEvent} = require('../controllers/eventController');
const router = express.Router();

router.get('/allEvents', allEvents)
router.get('/:id', authMiddleware, onlyOneEvent)
module.exports = router;