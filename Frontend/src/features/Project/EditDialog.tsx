import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Status } from "../../types/Status";

interface Project {
  _id: string;
  project_name: string;
  description: string;
  start_date: string;
  deadline: string;
  status: string;
  project_manager_id: string | { _id: string };
  organization_id: string | { _id: string };
  authorized_Users: string[];
}

interface EditDialogProps {
  open: boolean;
  project: Project | null;
  onClose: () => void;
  onSave: (updatedProject: Project) => void;
}

interface FormValues {
  project_name: string;
  description: string;
  start_date: string;
  deadline: string;
  status: string;
}

const EditDialog: React.FC<EditDialogProps> = ({ open, project, onClose, onSave }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      project_name: "",
      description: "",
      start_date: "",
      deadline: "",
      status: Status.NOT_STARTED,
    },
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (project) {
      reset({
        project_name: project.project_name ?? "",
        description: project.description ?? "",
        start_date: project.start_date?.split("T")[0] ?? "",
        deadline: project.deadline?.split("T")[0] ?? "",
        status: project.status ?? Status.NOT_STARTED,
      });
    }
  }, [project, reset]);

  if (!project) return null;

  const normalizeIds = (p: Project): Project => ({
    ...p,
    project_manager_id:
      typeof p.project_manager_id === "object" && p.project_manager_id !== null
        ? p.project_manager_id._id
        : p.project_manager_id,
    organization_id:
      typeof p.organization_id === "object" && p.organization_id !== null
        ? p.organization_id._id
        : p.organization_id,
  });

  const onSubmit = (data: FormValues) => {
    const updatedProject: Project = {
      ...project,
      project_name: data.project_name,
      description: data.description,
      start_date: new Date(data.start_date).toISOString(),
      deadline: new Date(data.deadline).toISOString(),
      status: data.status,
      authorized_Users: project.authorized_Users || [],
    };

    onSave(normalizeIds(updatedProject));
    setSnackbarOpen(true);
    onClose(); 
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Project</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="project_name"
              control={control}
              rules={{ required: "Project name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Project Name"
                  fullWidth
                  margin="normal"
                  error={!!errors.project_name}
                  helperText={errors.project_name?.message}
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
              name="start_date"
              control={control}
              rules={{ required: "Start date is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Start Date"
                  type="date"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.start_date}
                  helperText={errors.start_date?.message}
                />
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
                  select
                  label="Status"
                  fullWidth
                  margin="normal"
                  error={!!errors.status}
                  helperText={errors.status?.message}
                >
                  <MenuItem value="NOT_STARTED">Not Started</MenuItem>
                  <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                  <MenuItem value="COMPLETED">Completed</MenuItem>
                  <MenuItem value="DELAYED">Delayed</MenuItem>
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Project updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditDialog;
