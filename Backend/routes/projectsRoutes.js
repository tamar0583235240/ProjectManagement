const express = require('express');
const router = express.Router();
const { AddProject, AllProjects, DeleteProject, UpdateProject } = require('../controllers/projectsController');

router.post('/AllProjects', AllProjects);
router.post('/AddProject', AddProject);
router.delete('/DeleteProject/:project_id', DeleteProject);
router.put('/UpdateProject/:project_id', UpdateProject);

module.exports = router;