const express = require('express');
const { createAdmin, loginAdmin, logoutAdmin, deleteAdmin, profileAdmin, createEvent, onlyAdminEvents} = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/createAdmin',createAdmin);
router.post('/loginAdmin', loginAdmin);
router.post('/logoutAdmin', logoutAdmin);
router.post('/createEvent',authMiddleware, createEvent);
router.delete('/deleteAdmin/:id', deleteAdmin);
router.get('/profileAdmin/:id',authMiddleware,profileAdmin);
router.get('/event/:id',authMiddleware,onlyAdminEvents);

module.exports = router;