const express = require('express');
const { createAdmin, loginAdmin, logoutAdmin, deleteAdmin, profileAdmin, verifyEmail } = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/createAdmin',createAdmin);
router.post('/loginAdmin', loginAdmin);
router.post('/logoutAdmin', logoutAdmin);
router.post('/emailverify',verifyEmail)
router.delete('/deleteAdmin/:id', deleteAdmin);
router.get('/profileAdmin/:id',authMiddleware,profileAdmin);
module.exports = router;