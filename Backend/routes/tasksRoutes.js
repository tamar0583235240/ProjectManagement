const express = require('express');
const router = express.Router();
const { AddTask, AllTasks, DeleteTask, UpdateTask } = require('../controllers/tasksController');
const verifyJWT = require('../middleware/verifyJWT');

router.post('/AllTasks',verifyJWT, AllTasks);
router.post('/AddTask',verifyJWT, AddTask);
router.delete('/DeleteTask/:task_id',verifyJWT, DeleteTask);
router.put('/UpdateTask/:task_id',verifyJWT, UpdateTask);

module.exports = router;