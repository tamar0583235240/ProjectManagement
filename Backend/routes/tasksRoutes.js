const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const { AddTask, AllTasks, DeleteTask, UpdateTask, getTasksByProject } = require('../controllers/tasksController');


router.post('/AllTasks',verifyJWT, AllTasks);
router.post('/AddTask',verifyJWT, AddTask);
router.delete('/DeleteTask/:task_id',verifyJWT, DeleteTask);
router.put('/UpdateTask/:task_id',verifyJWT, UpdateTask);
router.get('/getTasksByProject/:projectId',verifyJWT, getTasksByProject);


module.exports = router;