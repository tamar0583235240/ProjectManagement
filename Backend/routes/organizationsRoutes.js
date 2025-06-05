const express = require('express');
const router = express.Router();
const { AddOrganization, AllOrganization, DeleteOrganization, UpdateOrganization, getOrganizationByUserId } = require('../controllers/organizationsController');
const verifyJWT = require('../middleware/verifyJWT');

router.post('/AllOrganization',verifyJWT, AllOrganization);
router.post('/AddOrganization',AddOrganization);
router.delete('/DeleteOrganization/:organization_id',verifyJWT, DeleteOrganization);
router.put('/UpdateOrganization/:organization_id',verifyJWT, UpdateOrganization);
router.get('/getOrganizationByUserId/:userId', getOrganizationByUserId);

module.exports = router;