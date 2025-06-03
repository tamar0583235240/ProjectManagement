// const { log } = require('node:console');
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


exports.getProjectsByManagerId = async (req, res) => {
    console.log('Fetching projects for manager ID:', req.params.manager_id);

    try {
        const managerId = req.params.manager_id;
        const projects = await Projects.find({
             project_manager_id: managerId 
            }).populate('status project_manager_id organization_id');

        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: 'No projects found for this manager' });
        }

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

// exports.updateProject = async (req, res) => {
//     const projectId = req.params.project_id;
//     console.log('Updating project with ID:', projectId);
//     console.log('Request body:', req.body);
//     const { project_name, description, start_date, deadline, status, project_manager_id, organization_id } = req.body;
//     console.log('Update data:', {
//         project_name,
//         description,
//         start_date,
//         deadline,
//         status,
//         project_manager_id,
//         organization_id
//     });

//     try {
//         const updatedProject = await Projects.findOneAndUpdate(
//             { _id: projectId },
//             {
//                 project_name: project_name,
//                 description: description,
//                 start_date: start_date,
//                 deadline: deadline,
//                 status: status,
//                 project_manager_id: project_manager_id,
//                 organization_id: organization_id,
//             },
//             { new: true, runValidators: true }
//         ).populate('status project_manager_id organization_id');

//         if (!updatedProject) {
//             return res.status(404).json({ message: 'Project not found' });
//         }

//         res.json(updatedProject);
//     } catch (error) {
//         console.error('Failed to update project:', error);
//         res.status(500).json({ message: 'Failed to update project', error: error.message });
//     }
// };

exports.updateProject = async (req, res) => {
  const projectId = req.params.project_id;
  console.log('Updating project with ID:', projectId);
  console.log('Request body:', req.body);

  const {
    project_name,
    description,
    start_date,
    deadline,
    status,
    project_manager_id,
    organization_id
  } = req.body;

  console.log('Update data:', {
    project_name,
    description,
    start_date,
    deadline,
    status,
    project_manager_id,
    organization_id,
  });

  try {
    const updatedProject = await Projects.findOneAndUpdate(
      { _id: projectId },
      {
        project_name,
        description,
        start_date,
        deadline,
        status,
        project_manager_id,
        organization_id,
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


// exports.updateProject = async (req, res) => {
//   const { id } = req.params
//   const updateData = req.body

//   try {
//     const updatedProject = await Projects.findByIdAndUpdate(id, updateData, {
//       new: true,
//       runValidators: true,
//     })

//     if (!updatedProject) {
//       return res.status(404).json({ message: "Project not found" })
//     }

//     res.status(200).json(updatedProject)
//   } catch (error) {
//     console.error("Error updating project:", error)
//     res.status(500).json({ message: "Failed to update project", error })
//   }
// }