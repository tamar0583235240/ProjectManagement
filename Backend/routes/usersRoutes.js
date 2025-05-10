const express = require('express');
const verifyJWT = require("../middleware/verifyJWT")
const router = express.Router();
const { DeleteUser, UpdateUser, signUp } = require('../controllers/usersController');

// router.post('/signUp', signUp);
// router.post('/AddUser', AddUser);
router.delete('/DeleteUser/:user_id',verifyJWT, DeleteUser);
router.put('/UpdateUser/:user_id',verifyJWT, UpdateUser);
// router.post('/signIn',signIn);

module.exports = router;