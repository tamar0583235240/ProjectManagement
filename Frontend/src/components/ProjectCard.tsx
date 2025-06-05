import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  useTheme,
  LinearProgress,
  Box,
} from '@mui/material';

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

const statusColors: Record<string, string> = {
  'Active': '#00bcd4',        // cyan from theme primary.main
  'Completed': '#4caf50',     // green from theme secondary.main
  'Delayed': '#ed6c02',       // orange warning color
  'On Hold': '#9e9e9e',       // greyish
  // הוסף לפי הצורך
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, selected, onClick }) => {
  const theme = useTheme();
  const statusColor = statusColors[project.status] || theme.palette.info.main;

  return (
    <Card
      variant={selected ? 'outlined' : undefined}
      sx={{
        borderColor: selected ? theme.palette.primary.main : 'transparent',
        boxShadow: selected
          ? '0 8px 16px rgba(0,188,212,0.3)'
          : '0 4px 8px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        borderRadius: theme.shape.borderRadius,
        background: selected ? '#e0f7fa' : '#fff',
        '&:hover': {
          boxShadow: '0 12px 24px rgba(0,188,212,0.4)',
          transform: 'scale(1.02)',
        },
        p: 1,
      }}
    >
      <CardActionArea onClick={onClick} sx={{ borderRadius: theme.shape.borderRadius }}>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
          >
            {project.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: statusColor,
                mr: 1,
                boxShadow: `0 0 6px ${statusColor}`,
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 600, color: statusColor }}>
              {project.status}
            </Typography>
          </Box>
          <Typography variant="body2" color={theme.palette.text.secondary} sx={{ mb: 1 }}>
            Progress:
          </Typography>
          <LinearProgress
            variant="determinate"
            value={project.progress}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          />
          <Typography
            variant="body2"
            sx={{
              mt: 0.5,
              fontWeight: 'bold',
              color: project.progress === 100 ? theme.palette.success.main : theme.palette.primary.main,
              textAlign: 'right',
            }}
          >
            {project.progress}%
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;
