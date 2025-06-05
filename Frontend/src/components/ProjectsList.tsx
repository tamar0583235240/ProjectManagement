import React from 'react';
import { Grid, Typography } from '@mui/material';
import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  name: string;
  status: string;
  progress: number;
}

interface ProjectsListProps {
  projects: Project[];
  isLoading: boolean;
  error: any;
  selectedProjectId: string | null;
  onSelectProject: (id: string) => void;
}

const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  isLoading,
  error,
  selectedProjectId,
  onSelectProject
}) => {
  if (isLoading) {
    return <Typography>Loading projects...</Typography>;
  }
  if (error) {
    return <Typography color="error">Error loading projects: {error.toString()}</Typography>;
  }
  if (projects.length === 0) {
    return <Typography>No projects available.</Typography>;
  }

  return (
    <Grid container spacing={3} sx={{ mb: 6 }}>
      {projects.map(project => (
        <Grid item xs={12} md={6} lg={4} key={project.id}>
          <ProjectCard
            project={project}
            onClick={() => onSelectProject(project.id)}
            selected={project.id === selectedProjectId}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectsList;
