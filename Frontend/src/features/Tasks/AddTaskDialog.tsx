import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useCreateTaskMutation } from './tasksApi';
import { Status } from '../../types/Status';

interface AddTaskDialogProps {
  open: boolean;
  projectId: string;
  onClose: () => void;
}

interface TaskFormValues {
  task_name: string;
  description: string;
  deadline: string;
  status: string;
  performed_by?: string;
}

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({
  open,
  projectId,
  onClose,
}) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    defaultValues: {
      task_name: '',
      description: '',
      deadline: '',
      status: Status.NOT_STARTED,
      performed_by: '',
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: TaskFormValues) => {
    try {
      const newTask = {
        ...data,
        project_id: projectId,
        deadline: new Date(data.deadline).toISOString(),
        performed_by: data.performed_by || null,
        // created_by יתמלא בשרת בהתאם למשתמש המחובר
      };

      await createTask(newTask).unwrap();
      handleClose();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Add New Task</Typography>
      </DialogTitle>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            <Controller
              name="task_name"
              control={control}
              rules={{ 
                required: 'Task name is required',
                minLength: { value: 3, message: 'Task name must be at least 3 characters' }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Task Name"
                  fullWidth
                  error={!!errors.task_name}
                  helperText={errors.task_name?.message}
                  placeholder="Enter a descriptive task name"
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              rules={{ 
                required: 'Description is required',
                minLength: { value: 10, message: 'Description must be at least 10 characters' }
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  placeholder="Provide detailed description of the task"
                />
              )}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Controller
                name="deadline"
                control={control}
                rules={{ required: 'Deadline is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Deadline"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.deadline}
                    helperText={errors.deadline?.message}
                    inputProps={{
                      min: new Date().toISOString().split('T')[0], // מונע בחירת תאריך עבר
                    }}
                  />
                )}
              />

              <Controller
                name="status"
                control={control}
                rules={{ required: 'Status is required' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Status"
                    fullWidth
                    error={!!errors.status}
                    helperText={errors.status?.message}
                  >
                    <MenuItem value={Status.NOT_STARTED}>Not Started</MenuItem>
                    <MenuItem value={Status.IN_PROGRESS}>In Progress</MenuItem>
                    <MenuItem value={Status.COMPLETED}>Completed</MenuItem>
                    <MenuItem value={Status.DELAYED}>Delayed</MenuItem>
                  </TextField>
                )}
              />
            </Box>

            <Controller
              name="performed_by"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Assigned To (Optional)"
                  fullWidth
                  placeholder="User ID or leave empty for unassigned"
                  helperText="Leave empty if not assigning to anyone yet"
                />
              )}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{ minWidth: 120 }}
          >
            {isLoading ? 'Creating...' : 'Create Task'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTaskDialog;