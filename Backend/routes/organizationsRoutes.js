const express = require('express');
const router = express.Router();
const { AddOrganization, AllOrganization, DeleteOrganization, UpdateOrganization } = require('../controllers/organizationsController');

router.post('/AllOrganization', AllOrganization);
router.post('/AddOrganization', AddOrganization);
router.delete('/DeleteOrganization/:organization_id', DeleteOrganization);
router.put('/UpdateOrganization/:organization_id', UpdateOrganization);

module.exports = router;