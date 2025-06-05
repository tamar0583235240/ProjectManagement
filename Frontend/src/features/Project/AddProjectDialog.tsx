import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addProjectSchema,
  type AddProjectFormData,
} from "../../schemas/SchemaAddProject";
import {
  useAddProjectMutation,
  useGetAllTeamMembersUnderManagerQuery,
} from "./projectApi";
import { setProjects } from "./projectSlice";
import AuthorizedUsersList from "./AuthorizedUsersList";
import AddAuthorizedUserForm from "./AddAuthorizedUserForm";
import useCurrentUser from "../../hooks/useCurrentUser";
import { selectCurrentManagerId } from "../auth/userSlice";
import { Status } from "../../types/Status";

interface ValidatedUser {
  _id: string;
  user_name: string;
  email: string;
}
interface AddProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: AddProjectFormData) => void;
}
const AddProjectDialog: React.FC<AddProjectDialogProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<ValidatedUser | undefined>();
  const [authorizedUsers, setAuthorizedUsers] = useState<ValidatedUser[]>([]);
  const dispatch = useDispatch();
  const projectsFromState = useSelector((state: any) => state.projects.projects);
  const currentUser = useCurrentUser();
  const currentManagerId = useSelector(selectCurrentManagerId);
  const [addProject, { isLoading: isAddingProject, error: addProjectError }] =
    useAddProjectMutation();
  const {
    data: teamMembersData,
    isLoading: isLoadingTeamMembers,
    error: teamMembersError,
  } = useGetAllTeamMembersUnderManagerQuery(currentUser?._id || "");
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddProjectFormData>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      project_name: "",
      description: "",
      project_manager_id: "",
      organization_id: currentUser?.organization_id || "",
      start_date: today,
      deadline: today,
      authorized_Users: [],
      status: "NOT_STARTED",
    },
  });

  const selectedManagerId = watch("project_manager_id");

  useEffect(() => {
    if (teamMembersData?.teamLeaders && teamMembersData.teamLeaders.length > 0 && !selectedManagerId) {
      const defaultManager = teamMembersData.teamLeaders.find(
        manager => manager._id === currentManagerId
      ) || teamMembersData.teamLeaders[0];

      if (defaultManager) {
        setValue("project_manager_id", defaultManager._id);
      }
    }
  }, [teamMembersData, currentManagerId, selectedManagerId, setValue]);
  useEffect(() => {
    setValue("authorized_Users", authorizedUsers.map(user => user._id));
  }, [authorizedUsers, setValue]);

  const handleAddUser = useCallback(
    (validatedUser: ValidatedUser) => {
      if (!authorizedUsers.find(user => user._id === validatedUser._id)) {
        setAuthorizedUsers(prev => [...prev, validatedUser]);
      }
    },
    [authorizedUsers]
  );
  const handleEditUser = useCallback(
    (validatedUser: ValidatedUser) => {
      if (!editingUser) return;
      const updatedUsers = authorizedUsers.map((user) =>
        user._id === editingUser._id ? validatedUser : user
      );
      setAuthorizedUsers(updatedUsers);
      setEditingUser(undefined);
    },
    [authorizedUsers, editingUser]
  );
  const handleDeleteUser = useCallback(
    (userId: string) => {
      setAuthorizedUsers(prev => prev.filter(user => user._id !== userId));
    },
    []
  );
  const handleOpenUserForm = () => {
    setEditingUser(undefined);
    setUserFormOpen(true);
  };
  const handleStartEditUser = (user: ValidatedUser) => {
    setEditingUser(user);
    setUserFormOpen(true);
  };
  const handleClose = () => {
    reset();
    setEditingUser(undefined);
    setUserFormOpen(false);
    setAuthorizedUsers([]);
    onClose();
  };
  const onSubmit: SubmitHandler<AddProjectFormData> = async (data) => {
    console.log("Submitting project data:", data);
    try {
      const finalData = {
        project_name: data.project_name,
        description: data.description,
        project_manager_id: data.project_manager_id || currentManagerId,
        organization_id: currentUser?.organization_id || "",
        start_date: data.start_date,
        deadline: data.deadline,
        authorized_Users: data.authorized_Users,
        status:  "NOT_STARTED",
      };
      console.log("Final project data with user IDs:", finalData);

      const addedProject = await addProject(finalData).unwrap();
      console.log("Project added successfully:", addedProject);
      dispatch(setProjects([...projectsFromState, addedProject]));
      onAdd(addedProject);
      reset();
      setEditingUser(undefined);
      setUserFormOpen(false);
      setAuthorizedUsers([]);
      onClose();
    } catch (err) {
      console.error("Failed to add project:", err);
    }
  };

  if (isLoadingTeamMembers) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Stack spacing={2} alignItems="center" sx={{ py: 4 }}>
            <CircularProgress />
            <Typography>Loading team members...</Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Project</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Fill in the details below to create a new project.
          </DialogContentText>

          {(addProjectError || teamMembersError) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Error loading data. Please try again.
            </Alert>
          )}

          <Stack spacing={2}>
            <Controller
              name="project_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Project Name"
                  fullWidth
                  required
                  error={!!errors.project_name}
                  helperText={errors.project_name?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            <Controller
              name="project_manager_id"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.project_manager_id}>
                  <InputLabel>Project Manager</InputLabel>
                  <Select {...field} label="Project Manager">
                    <MenuItem value="">
                      <em>Select a manager</em>
                    </MenuItem>
                    {teamMembersData?.teamLeaders?.map((manager) => (
                      <MenuItem key={manager._id} value={manager._id}>
                        {manager.user_name} - {manager.email}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {errors.project_manager_id?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />

            <Stack direction="row" spacing={2}>
              <Controller
                name="start_date"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Start Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.start_date}
                    helperText={errors.start_date?.message}
                  />
                )}
              />
              <Controller
                name="deadline"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Deadline"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.deadline}
                    helperText={errors.deadline?.message}
                  />
                )}
              />
            </Stack>

            <Divider sx={{ my: 1 }} />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1">Authorized Users</Typography>
              <Button variant="outlined" size="small" onClick={handleOpenUserForm}>
                Add User
              </Button>
            </Stack>

            <AuthorizedUsersList
              users={authorizedUsers}
              onEdit={handleStartEditUser}
              onDelete={handleDeleteUser}
            />

            {selectedManagerId && teamMembersData && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Team Members under selected manager:
                </Typography>
                <Typography variant="body2">
                  Team Leaders:{" "}
                  {teamMembersData.teamLeaders
                    .map((tl) => tl.user_name)
                    .join(", ") || "None"}
                </Typography>
                <Typography variant="body2">
                  Employees:{" "}
                  {teamMembersData.employees
                    .map((emp) => emp.user_name)
                    .join(", ") || "None"}
                </Typography>
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" disabled={isAddingProject}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isAddingProject}>
            {isAddingProject && <CircularProgress size={20} sx={{ mr: 1 }} />}
            Add Project
          </Button>
        </DialogActions>
      </form>

      {userFormOpen && (
        <AddAuthorizedUserForm
          open={userFormOpen}
          onClose={() => {
            setUserFormOpen(false);
            setEditingUser(undefined);
          }}
          onSave={editingUser ? handleEditUser : handleAddUser}
          editUser={editingUser}
        />
      )}
    </Dialog>
  );
};

export default AddProjectDialog;