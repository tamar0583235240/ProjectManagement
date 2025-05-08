const express = require('express');
const router = express.Router();
const { AddRole, AllRoles, DeleteRole, UpdateRole } = require('../controllers/rolesController');

router.post('/AllRoles', AllRoles);
router.post('/AddRole', AddRole);
router.delete('/DeleteRole/:role_id', DeleteRole);
router.put('/UpdateRole/:role_id', UpdateRole);

module.exports = router;