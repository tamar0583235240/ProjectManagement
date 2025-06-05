import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

interface Project {
  id: string;
  name: string;
  status: string;
  progress: number;
}

interface ProjectCardProps {
  project: Project;
  selected: boolean;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, selected, onClick }) => {
  return (
    <Card
      variant={selected ? 'outlined' : undefined}
      sx={{
        borderColor: selected ? 'primary.main' : undefined,
        boxShadow: selected ? 3 : 1,
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {project.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Status: {project.status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Progress: {project.progress}%
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;
