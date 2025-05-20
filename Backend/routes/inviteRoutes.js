const express = require('express');
const router = express.Router();
const { inviteUser, setPassword, login } = require('../controllers/inviteController');

router.post('/inviteUser', inviteUser);
router.post('/set-password',setPassword);
router.post('/login', login);

module.exports = router;
