const express = require('express');
const router = express.Router();
const { AddProject, AllProjects, DeleteProject, UpdateProject, getProjectsByManagerId } = require('../controllers/projectsController');

router.get('/AllProjects', AllProjects);
router.post('/AddProject', AddProject);
router.delete('/DeleteProject/:project_id', DeleteProject);
router.put('/UpdateProject/:project_id', UpdateProject);
router.get('/getProjectsByManagerId/:manager_id', getProjectsByManagerId);

module.exports = router;