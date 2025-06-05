import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';

interface Task {
  id: string;
  title: string;
  description?: string;
}

interface TasksListProps {
  projectName: string;
  tasks: Task[];
  isLoading: boolean;
  error: any;
}

const TasksList: React.FC<TasksListProps> = ({ projectName, tasks, isLoading, error }) => {
  const theme = useTheme();

  if (isLoading)
    return (
      <Typography color={theme.palette.text.secondary} align="center" sx={{ mt: 4 }}>
        Loading tasks...
      </Typography>
    );
  if (error)
    return (
      <Typography color={theme.palette.error.main} align="center" sx={{ mt: 4 }}>
        Error loading tasks.
      </Typography>
    );
  if (tasks.length === 0)
    return (
      <Typography color={theme.palette.text.secondary} align="center" sx={{ mt: 4 }}>
        No tasks for this project.
      </Typography>
    );

  return (
    <Box sx={{ mt: 6, px: { xs: 2, md: 4 } }}>
      <Typography
        variant="h5"
        gutterBottom
        color={theme.palette.primary.main}
        sx={{ fontWeight: 'bold', mb: 3 }}
      >
        Tasks for Project: {projectName}
      </Typography>
      {tasks.map((task) => (
        <Paper
          key={task.id}
          elevation={3}
          sx={{
            p: 2,
            mb: 2,
            borderLeft: `6px solid ${theme.palette.secondary.main}`,
            backgroundColor: '#fafafa',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#f0f4f8',
            },
          }}
        >
          <Typography variant="subtitle1" color={theme.palette.text.primary} sx={{ fontWeight: 600 }}>
            {task.title}
          </Typography>
          <Typography variant="body2" color={theme.palette.text.secondary}>
            {task.description}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default TasksList;
