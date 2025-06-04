
// import { useSelector } from 'react-redux';
// import { Box, Typography, CircularProgress, Alert, Paper } from '@mui/material';
// import { selectCurrentManagerId } from '../features/auth/userSlice';
// import useLoadProjectsOnInit from '../hooks/useLoadProjectsOnInit';
// import type { RootState } from '../app/store';
// import ProjectsDashboard from '../features/Project/ProjectsDashboard';

// const Projects = () => {
//   useLoadProjectsOnInit();

//   const currentManagerId = useSelector(selectCurrentManagerId);
//   const projects = useSelector((state: RootState) => state.projects.projects);
//   const isLoading = useSelector((state: RootState) => state.projects.isLoading);
//   const error = useSelector((state: RootState) => state.projects.error);

//   if (!currentManagerId) {
//     return (
//       <Box mt={4} display="flex" justifyContent="center">
//         <Alert severity="warning">No current manager</Alert>
//       </Box>
//     );
//   }

//   if (isLoading) {
//     return (
//       <Box mt={4} display="flex" justifyContent="center">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box mt={4} display="flex" justifyContent="center">
//         <Alert severity="error">{error}</Alert>
//       </Box>
//     );
//   }

//   return (
//     <Box p={3}>
//       <Typography variant="h2" gutterBottom>
//         Projects
//       </Typography>
//       <Paper elevation={1} sx={{ p: 2 }}>
//         <ProjectsDashboard initialProjects={projects || []} />
//       </Paper>
//     </Box>
//   );
// };

// export default Projects;
import { useSelector } from 'react-redux';
import { Box, Typography, CircularProgress, Alert, Paper, Button } from '@mui/material';
import { selectCurrentManagerId } from '../features/auth/userSlice';
import useLoadProjectsOnInit from '../hooks/useLoadProjectsOnInit';
import type { RootState } from '../app/store';
import ProjectsDashboard from '../features/Project/ProjectsDashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd'; // אתה יכול להחליף לאייקון של פרויקט אם צריך
import GroupIcon from '@mui/icons-material/Group'; // זה האייקון כמו בתמונה
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import AddProjectDialog from '../features/Project/AddProjectDialog';
import type { Project } from '../types/Project';

const Projects = () => {
  useLoadProjectsOnInit();

  const currentManagerId = useSelector(selectCurrentManagerId);
  const projects = useSelector((state: RootState) => state.projects.projects);
  const isLoading = useSelector((state: RootState) => state.projects.isLoading);
  const error = useSelector((state: RootState) => state.projects.error);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const handleAddProject = (newProject: Project) => {
    const projectToAdd = {
      ...newProject,
      status: Status.NOT_STARTED,
    }
    setProjects((prev) => [projectToAdd, ...prev])
    setFilteredProjects((prev) => [projectToAdd, ...prev])
    setIsAddDialogOpen(false)
    setSnackbar({ open: true, message: "Project added successfully.", severity: "success" })
  }

  if (!currentManagerId) {
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <Alert severity="warning">No current manager</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h2" gutterBottom>
        Projects
      </Typography>
      <Paper elevation={1} sx={{ p: 4, minHeight: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {projects.length === 0 ? (
          <Box textAlign="center">
            <GroupIcon sx={{ fontSize: 50, color: 'grey.500', mb: 2 }} />
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              No projects to display
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Start by adding your first project.
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ mb: 2 }}
              onClick={() => setIsAddDialogOpen(true)}
            >
              Add Project
            </Button>
          </Box>
        ) : (
          <ProjectsDashboard initialProjects={projects} />
        )}
      </Paper>
      <AddProjectDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddProject}
      />
    </Box>
  );
};

export default Projects;
