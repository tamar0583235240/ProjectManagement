const express = require('express');
const router = express.Router();
const { AddUser, AllUsers, DeleteUser, UpdateUser } = require('../controllers/usersController');

router.post('/AllUsers', AllUsers);
router.post('/AddUser', AddUser);
router.delete('/DeleteUser/:user_id', DeleteUser);
router.put('/UpdateUser/:user_id', UpdateUser);

module.exports = router;