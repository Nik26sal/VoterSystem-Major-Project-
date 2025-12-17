const express = require('express');
const { createVoter, loginVoter, deleteVoter, logoutVoter, profileVoter,verifyEmail } = require('../controllers/voterController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/createVoter',createVoter);
router.post('/loginVoter',loginVoter);
router.post('/emailverify',verifyEmail)
router.delete('/deleteVoter',deleteVoter);
router.post('/logoutVoter',logoutVoter);
router.get('/profileVoter/:id',authMiddleware,profileVoter);

module.exports = router;