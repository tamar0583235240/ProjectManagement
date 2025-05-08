const express = require('express');
const router = express.Router();
const { AddStatus, AllStatuses, DeleteStatus, UpdateStatus } = require('../controllers/statusesController');

router.post('/AllStatuses', AllStatuses);
router.post('/AddStatus', AddStatus);
router.delete('/DeleteStatus/:status_id', DeleteStatus);
router.put('/UpdateStatus/:status_id', UpdateStatus);

module.exports = router;