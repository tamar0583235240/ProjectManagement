const express = require('express');
const verifyJWT = require("../middleware/verifyJWT")
const router = express.Router();
const { DeleteUser, UpdateUser, signUp, getTeamLeaders } = require('../controllers/usersController');
router.delete('/DeleteUser/:user_id',verifyJWT, DeleteUser);
router.put('/UpdateUser/:user_id',verifyJWT, UpdateUser);
router.get('/getTeamLeaders/:managerId',verifyJWT,getTeamLeaders);
module.exports = router;