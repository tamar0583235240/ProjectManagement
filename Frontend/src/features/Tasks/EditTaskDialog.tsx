import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Status } from "../../types/Status";
import type { User } from "../../types/Project";
import { useGetEmployeesByOrganizationQuery } from "../User/userApi";
import useCurrentUser from "../../hooks/useCurrentUser";

interface Task {
  _id: string;
  project_id: string;
  task_name: string;
  description: string;
  performed_by: string | null;
  created_by: string;
  deadline: string;
  status: string;
}

interface EditTaskDialogProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
  availableUsers: User[];
}

interface FormValues {
  task_name: string;
  description: string;
  performed_by: string | null;
  deadline: string;
  status: string;
}

type Employee = {
  _id: string;
  full_name?: string;
  user_name: string;
  email: string;
};

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
  open,
  task,
  onClose,
  onSave,
  availableUsers,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      task_name: "",
      description: "",
      performed_by: null,
      deadline: "",
      status: Status.NOT_STARTED,
    },


    values: task
      ? {
        task_name: task.task_name,
        description: task.description,
        performed_by: task.performed_by || "",
        deadline: task.deadline?.split("T")[0] ?? "",
        status: task.status,
      }
      : undefined,
  });
  const user = useCurrentUser();
  const {
    data: employees = [],
    isLoading: isEmployeesLoading,
    isError: isEmployeesError,
  } = useGetEmployeesByOrganizationQuery(user?.organization_id!, {
    skip: !user?.organization_id,
  });


  if (!task) return null;

  const onSubmit = (data: FormValues) => {
    const updatedTask: Task = {
      ...task,
      task_name: data.task_name,
      description: data.description,
      performed_by: data.performed_by,
      deadline: new Date(data.deadline).toISOString(),
      status: data.status,
    };

    onSave(updatedTask);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Task</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="task_name"
            control={control}
            rules={{ required: "Task name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Task Name"
                fullWidth
                margin="normal"
                error={!!errors.task_name}
                helperText={errors.task_name?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
          <Controller
            name="performed_by"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Assign To"
                select
                fullWidth
                margin="normal"
                disabled={isEmployeesLoading || isEmployeesError}
              >
                {isEmployeesLoading ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Loading employees...
                  </MenuItem>
                ) : isEmployeesError ? (
                  <MenuItem disabled>Error loading employees</MenuItem>
                ) : employees.length === 0 ? (
                  <MenuItem disabled>No employees found</MenuItem>
                ) : (
                  employees.map((emp: Employee) => (
                    <MenuItem key={emp._id} value={emp._id}>
                      {emp.full_name || emp.user_name}
                    </MenuItem>
                  ))
                )}
              </TextField>
            )}
          />
          <Controller
            name="deadline"
            control={control}
            rules={{ required: "Deadline is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Deadline"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                error={!!errors.deadline}
                helperText={errors.deadline?.message}
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Status"
                select
                fullWidth
                margin="normal"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditTaskDialog;