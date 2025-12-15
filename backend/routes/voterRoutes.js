const express = require('express');
const { createVoter, loginVoter, deleteVoter, logoutVoter } = require('../controllers/voterController');

const router = express.Router();

router.post('/createVoter',createVoter);
router.post('/loginVoter',loginVoter);
router.delete('/deleteVoter',deleteVoter);
router.post('/logoutVoter',logoutVoter);

module.exports = router;