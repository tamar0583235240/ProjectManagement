

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useGetTasksByProjectQuery } from '../features/Tasks/tasksApi';

type TasksGridProps = {
  projectId: string;
};

const TasksGrid: React.FC<TasksGridProps> = ({ projectId }) => {
  const {
    data: tasks = [],
    isLoading,
    isError,
    refetch,
  } = useGetTasksByProjectQuery(projectId, {
    skip: !projectId,
  });

  if (isLoading) {
    return (
      <Grid container justifyContent="center" mt={4}>
        <CircularProgress />
      </Grid>
    );
  }

  if (isError) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        שגיאה בטעינת המשימות. נסי לרענן את הדף.
      </Alert>
    );
  }

  if (!tasks.length) {
    return (
      <Typography variant="h6" align="center" mt={4}>
        אין משימות להצגה בפרויקט זה.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2} mt={2}>
      {tasks.map((task) => (
        <Grid key={task._id} item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {task.description || 'ללא תיאור'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                סטטוס: {task.status}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TasksGrid;
