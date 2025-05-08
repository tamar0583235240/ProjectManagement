const express = require('express');
const router = express.Router();
const { AddTask, AllTasks, DeleteTask, UpdateTask } = require('../controllers/tasksController');

router.post('/AllTasks', AllTasks);
router.post('/AddTask', AddTask);
router.delete('/DeleteTask/:task_id', DeleteTask);
router.put('/UpdateTask/:task_id', UpdateTask);

module.exports = router;