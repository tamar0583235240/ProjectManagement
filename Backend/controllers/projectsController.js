const Projects = require('../models/Projects');

exports.AddProject = async (req, res) => {
    try {
        const project = await Projects.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        console.error('Failed to add project:', error);
        res.status(500).json({ message: 'Failed to add project', error: error.message });
    }
};

exports.AllProjects = async (req, res) => {
    try {
        const projects = await Projects.find().populate('status project_manager_id organization_id');
        res.json(projects);
    } catch (error) {
        console.error('Failed to get projects:', error);
        res.status(500).json({ message: 'Failed to get projects', error: error.message });
    }
};

exports.DeleteProject = async (req, res) => {
    const projectId = req.params.project_id;
    try {
        const deletedProject = await Projects.findByIdAndDelete(projectId);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Failed to delete project:', error);
        res.status(500).json({ message: 'Failed to delete project', error: error.message });
    }
};

exports.UpdateProject = async (req, res) => {
    const projectId = req.params.project_id;
    const { project_name, description, start_date, deadline, status, project_manager_id, organization_id } = req.body;

    try {
        const updatedProject = await Projects.findOneAndUpdate(
            { _id: projectId },
            {
                project_name: project_name,
                description: description,
                start_date: start_date,
                deadline: deadline,
                status: status,
                project_manager_id: project_manager_id,
                organization_id: organization_id,
            },
            { new: true, runValidators: true }
        ).populate('status project_manager_id organization_id');

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(updatedProject);
    } catch (error) {
        console.error('Failed to update project:', error);
        res.status(500).json({ message: 'Failed to update project', error: error.message });
    }
};