const express = require('express');
const router = express.Router();
const { inviteUser, setPassword, login } = require('../controllers/inviteController');

router.post('/inviteUser', inviteUser);
router.post('/setPassword',setPassword);
router.post('/login', login);

module.exports = router;
