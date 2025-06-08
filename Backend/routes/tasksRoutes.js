const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const { AddTask, AllTasks, DeleteTask, UpdateTask, getTasksByProject } = require('../controllers/tasksController');


router.post('/AllTasks', AllTasks);
router.post('/AddTask', AddTask);
router.delete('/DeleteTask/:task_id', DeleteTask);
router.put('/UpdateTask/:task_id', UpdateTask);
router.get('/getTasksByProject/:projectId', getTasksByProject);


module.exports = router;