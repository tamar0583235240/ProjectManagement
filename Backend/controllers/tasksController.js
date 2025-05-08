const Tasks = require('d:/ProjectReactNode/Backend/models/Tasks');

exports.AddTask = async (req, res) => {
    try {
        const task = await Tasks.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        console.error('Failed to add task:', error);
        res.status(500).json({ message: 'Failed to add task', error: error.message });
    }
};

exports.AllTasks = async (req, res) => {
    try {
        const tasks = await Tasks.find().populate('project_id performed_by created_by status');
        res.json(tasks);
    } catch (error) {
        console.error('Failed to get tasks:', error);
        res.status(500).json({ message: 'Failed to get tasks', error: error.message });
    }
};

exports.DeleteTask = async (req, res) => {
    const taskId = req.params.task_id;
    try {
        const deletedTask = await Tasks.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Failed to delete task:', error);
        res.status(500).json({ message: 'Failed to delete task', error: error.message });
    }
};

exports.UpdateTask = async (req, res) => {
    const taskId = req.params.task_id;
    const { project_id, task_name, description, performed_by, created_by, deadline, status } = req.body;

    try {
        const updatedTask = await Tasks.findOneAndUpdate(
            { _id: taskId },
            {
                project_id: project_id,
                task_name: task_name,
                description: description,
                performed_by: performed_by,
                created_by: created_by,
                deadline: deadline,
                status: status,
            },
            { new: true, runValidators: true }
        ).populate('project_id performed_by created_by status');

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (error) {
        console.error('Failed to update task:', error);
        res.status(500).json({ message: 'Failed to update task', error: error.message });
    }
};