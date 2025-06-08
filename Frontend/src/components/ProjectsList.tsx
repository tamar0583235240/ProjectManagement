import React from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
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
  onSelectProject,
}) => {
  const theme = useTheme();

  if (isLoading) {
    return (
      <Typography color={theme.palette.text.secondary} align="center" sx={{ mt: 4 }}>
        Loading projects...
      </Typography>
    );
  }
  if (error) {
    return (
      <Typography color={theme.palette.error.main} align="center" sx={{ mt: 4 }}>
        Error loading projects: {error.toString()}
      </Typography>
    );
  }
  if (projects.length === 0) {
    return (
      <Typography color={theme.palette.text.secondary} align="center" sx={{ mt: 4 }}>
        No projects available.
      </Typography>
    );
  }

  return (
    <Grid container spacing={4} sx={{ mb: theme.spacing(8), px: { xs: 2, md: 4 } }}>
      {projects.map((project) => (
        <Grid item xs={12} sm={6} md={4} key={project.id}>
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
