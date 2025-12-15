const express = require('express');
const { createAdmin, loginAdmin, logoutAdmin, deleteAdmin } = require('../controllers/adminController');

const router = express.Router();

router.post('/createAdmin',createAdmin);
router.post('/loginAdmin', loginAdmin);
router.post('/logoutAdmin', logoutAdmin);
router.delete('/deleteAdmin/:id', deleteAdmin);

module.exports = router;