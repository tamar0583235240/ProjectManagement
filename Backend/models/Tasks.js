const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
        required: [true,"project must be complete."] 
    },
    task_name: {
        type: String,
        required: [true,"task name must be complete."] 
    },
    description: {
        type: String,
        required: [true,"Description must be complete."] 
    },
    performed_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true,"Must send the name of the task creator."] 
    },
    deadline: {
        type: Date,
        required: [true,"Deadline must be complete."] 
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
        required: [true,"status must be complete."] 
    }
}, { timestamps: true });

module.exports = mongoose.model('Tasks', TasksSchema);