import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

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
  if (isLoading) return <Typography>Loading tasks...</Typography>;
  if (error) return <Typography color="error">Error loading tasks.</Typography>;
  if (tasks.length === 0) return <Typography>No tasks for this project.</Typography>;

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h6" gutterBottom>
        Tasks for Project: {projectName}
      </Typography>
      {tasks.map(task => (
        <Paper key={task.id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1">{task.title}</Typography>
          <Typography variant="body2" color="text.secondary">{task.description}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default TasksList;
