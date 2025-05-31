const express = require('express');
const verifyJWT = require("../middleware/verifyJWT")
const router = express.Router();
const { DeleteUser, UpdateUser, inviteUser,validateUser,getAllTeamMembersUnderManager } = require('../controllers/usersController');
const { getTopManagerOfEmployee } = require('../controllers/usersController');

// router.post('/signUp', signUp);
// router.post('/AddUser', AddUser);
router.delete('/DeleteUser/:user_id',verifyJWT, DeleteUser);
router.put('/UpdateUser/:user_id',verifyJWT, UpdateUser);
// router.post('/validate-user',verifyJWT, validateUser);
router.post('/validate-user', validateUser);
// router.get('/getAllTeamMembersUnderManager/:managerId', verifyJWT, getAllTeamMembersUnderManager);
router.get('/getAllTeamMembersUnderManager/:managerId', getAllTeamMembersUnderManager);
router.get('getTopManagerOfEmployee/:employeeId',getTopManagerOfEmployee);

// router.get('/invite',verifyJWT, inviteUser);
// router.post('/signIn',signIn);

module.exports = router;