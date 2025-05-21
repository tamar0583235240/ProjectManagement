// client/features/tasks/components/CreateTaskForm.tsx
import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, TaskFormValues } from '../schemas/taskSchema';
import { useGetProjectsQuery } from '@/features/projects/api/projectsApi';
import { useGetUsersByProjectQuery } from '@/features/users/api/usersApi';
import { useCreateTaskMutation } from '../api/tasksApi';

export const CreateTaskForm = () => {
  const [projectId, setProjectId] = useState('');
  const { data: projects = [] } = useGetProjectsQuery();
  const { data: users = [] } = useGetUsersByProjectQuery(projectId, { skip: !projectId });
  const [createTask] = useCreateTaskMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = async (data: TaskFormValues) => {
    await createTask(data);
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 500,
        mx: 'auto',
        my: 4,
        p: 4,
        backgroundColor: '#f0f4ff',
        borderRadius: 3,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="#1a237e" textAlign="center">
        הוספת משימה
      </Typography>

      {/* פרויקט */}
      <FormControl fullWidth error={!!errors.projectId}>
        <InputLabel>בחר פרויקט</InputLabel>
        <Select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          label="בחר פרויקט"
        >
          {projects.map((p) => (
            <MenuItem key={p._id} value={p._id}>
              {p.project_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="שם משימה"
        {...register('task_name')}
        error={!!errors.task_name}
        helperText={errors.task_name?.message}
      />

      <TextField
        fullWidth
        label="תיאור"
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description?.message}
      />

      {/* הקצאת עובד */}
      <FormControl fullWidth error={!!errors.performed_by}>
        <InputLabel>הקצה לעובד</InputLabel>
        <Select
          {...register('performed_by')}
          label="הקצה לעובד"
          disabled={!projectId}
        >
          {users.map((u) => (
            <MenuItem key={u._id} value={u._id}>
              {u.user_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        type="date"
        label="תאריך יעד"
        InputLabelProps={{ shrink: true }}
        {...register('deadline')}
        error={!!errors.deadline}
        helperText={errors.deadline?.message}
      />

      <TextField
        fullWidth
        label="סטטוס"
        {...register('status')}
        error={!!errors.status}
        helperText={errors.status?.message}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          backgroundColor: '#1a237e',
          color: '#fff',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#0d1333',
          },
        }}
      >
        שמור משימה
      </Button>
    </Box>
  );
};
