<<<<<<< HEAD
import React from 'react'


const Projects = () => {
  return (
    <>
    <h1>Projects</h1>

    </>
  )
}
=======
import { useSelector } from 'react-redux';
import { Box, Typography, CircularProgress, Alert, Paper } from '@mui/material';
import { selectCurrentManagerId } from '../features/auth/userSlice';
import useLoadProjectsOnInit from '../hooks/useLoadProjectsOnInit';
import type { RootState } from '../app/store';
import ProjectsDashboard from '../features/Project/ProjectsDashboard';

const Projects = () => {
  useLoadProjectsOnInit();
>>>>>>> Frontend/Projects

  const currentManagerId = useSelector(selectCurrentManagerId);
  const projects = useSelector((state: RootState) => state.projects.projects);
  const isLoading = useSelector((state: RootState) => state.projects.isLoading);
  const error = useSelector((state: RootState) => state.projects.error);

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
      <Paper elevation={1} sx={{ p: 2 }}>
        <ProjectsDashboard initialProjects={projects || []} />
      </Paper>
    </Box>
  );
};

export default Projects;
