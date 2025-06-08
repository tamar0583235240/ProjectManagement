const express = require('express');
const router = express.Router();
const { AddProject, AllProjects, DeleteProject, getProjectsByManagerId, updateProject } = require('../controllers/projectsController');
const { UpdateProject } = require('../controllers/projectsController');

router.get('/AllProjects', AllProjects);
router.post('/AddProject', AddProject);
router.delete('/DeleteProject/:project_id', DeleteProject);
// router.put('/UpdateProject/:project_id', UpdateProject);
router.get('/getProjectsByManagerId/:manager_id', getProjectsByManagerId);
router.put("/updateProject/:project_id", UpdateProject)

module.exports = router;