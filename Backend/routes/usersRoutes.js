const express = require('express');
const verifyJWT = require("../middleware/verifyJWT")
const router = express.Router();
const { DeleteUser, UpdateUser, inviteUser,validateUser,getAllTeamMembersUnderManager } = require('../controllers/usersController');
const { getTopManagerOfEmployee } = require('../controllers/usersController');
const { getEmployeesByOrganization } = require('../controllers/usersController');
const { getTeamLeaders } = require('../controllers/usersController');

// router.post('/signUp', signUp);
// router.post('/AddUser', AddUser);
router.delete('/DeleteUser/:user_id', DeleteUser);
router.put('/UpdateUser/:user_id', UpdateUser);
// router.post('/validate-user',verifyJWT, validateUser);
router.post('/validate-user', validateUser);
// router.get('/getAllTeamMembersUnderManager/:managerId', verifyJWT, getAllTeamMembersUnderManager);
router.get('/getAllTeamMembersUnderManager/:managerId', getAllTeamMembersUnderManager);
router.get('/getTopManagerOfEmployee/:employeeId', getTopManagerOfEmployee);
router.get('/getEmployeesByOrg/:orgId', getEmployeesByOrganization);
router.get('/getTeamLeaders/:managerId', getTeamLeaders);

// router.get('/invite',verifyJWT, inviteUser);
// router.post('/signIn',signIn);

module.exports = router;