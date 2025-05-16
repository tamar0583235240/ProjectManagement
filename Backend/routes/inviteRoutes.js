const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/invite', authController.inviteUser);
router.post('/set-password', authController.setPassword);
router.post('/login', authController.login);

module.exports = router;
