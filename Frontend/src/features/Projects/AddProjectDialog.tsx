
import {
  Button,
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
} from "@mui/material"
import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { addProjectSchema, type AddProjectFormData, type AuthorizedUser } from "../../schemas/SchemaAddProject"
import { v4 as uuidv4 } from "uuid"
import AuthorizedUsersList from "./AuthorizedUsersList"
import AddAuthorizedUserForm from "./AddAuthorizedUserForm"
import { useAddProjectMutation } from "./projectApi"
import { useDispatch } from "react-redux"
import { setProjects } from "./projectSlice"
import { useSelector } from "react-redux"

interface AddProjectDialogProps {
  open: boolean
  onClose: () => void
  onAdd: (data: AddProjectFormData) => void
}

const AddProjectDialog: React.FC<AddProjectDialogProps> = ({ open, onClose, onAdd }) => {
  const today = new Date().toISOString().split("T")[0]
  const [userFormOpen, setUserFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<AuthorizedUser | undefined>(undefined)

  const [addProject, { isLoading, isError }] = useAddProjectMutation();

  const dispatch = useDispatch();
  const projectsFromState = useSelector((state) => state.projects.projects)
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
      projectName: "",
      description: "",
      manager: "",
      startDate: today,
      deadline: today,
      authorizedUsers: [],
    },
  })

  const authorizedUsers = watch("authorizedUsers") || []

  const handleAddUser = (userData: { name: string; email: string }) => {
    const newUser: AuthorizedUser = {
      id: uuidv4(),
      ...userData,
    }
    setValue("authorizedUsers", [...authorizedUsers, newUser])
  }

  const handleEditUser = (userData: { name: string; email: string }) => {
    if (!editingUser) return

    const updatedUsers = authorizedUsers.map(user =>
      user.id === editingUser.id ? { ...user, ...userData } : user
    )
    setValue("authorizedUsers", updatedUsers)
    setEditingUser(undefined)
  }

  const handleDeleteUser = (userId: string) => {
    setValue(
      "authorizedUsers",
      authorizedUsers.filter(user => user.id !== userId)
    )
  }

  const openUserForm = () => {
    setEditingUser(undefined)
    setUserFormOpen(true)
  }

  const startEditUser = (user: AuthorizedUser) => {
    setEditingUser(user)
    setUserFormOpen(true)
  }
  const onSubmit: SubmitHandler<AddProjectFormData> = async (data) => {
    try {
      const addedProject = await addProject(data).unwrap()
      dispatch(setProjects([...projectsFromState, addedProject]))
      const response = await addProject(data).unwrap();
      console.log("Project created:", response);
      onAdd(response);
      reset();
      onClose();
    } catch (err) {
      console.error("Failed to add project:", err);
    }
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth disableScrollLock>
        <DialogTitle>Add New Project</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              Enter the details of the new project
            </DialogContentText>
            <Stack spacing={2}>
              <Controller
                name="projectName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Project Name"
                    fullWidth
                    required
                    variant="outlined"
                    margin="normal"
                    error={!!errors.projectName}
                    helperText={errors.projectName?.message}
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
                    variant="outlined"
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="manager"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.manager}>
                    <InputLabel>Project Manager</InputLabel>
                    <Select {...field} label="Project Manager">
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="tamar">Tamar</MenuItem>
                      <MenuItem value="daniel">Daniel</MenuItem>
                      <MenuItem value="lior">Lior</MenuItem>
                    </Select>
                    {errors.manager && <FormHelperText>{errors.manager.message}</FormHelperText>}
                  </FormControl>
                )}
              />
              <Stack direction="row" spacing={2}>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Start Date"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      margin="normal"
                      error={!!errors.startDate}
                      helperText={errors.startDate?.message}
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
                      variant="outlined"
                      margin="normal"
                      error={!!errors.deadline}
                      helperText={errors.deadline?.message}
                    />
                  )}
                />
              </Stack>

              <Divider sx={{ my: 1 }} />

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1">Authorized Users</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={openUserForm}
                >
                  Add User
                </Button>
              </Stack>

              <AuthorizedUsersList
                users={authorizedUsers}
                onEdit={startEditUser}
                onDelete={handleDeleteUser}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Add Project
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <AddAuthorizedUserForm
        open={userFormOpen}
        onClose={() => setUserFormOpen(false)}
        onSave={editingUser ? handleEditUser : handleAddUser}
        editUser={editingUser}
      />
    </>
  )
}

export default AddProjectDialog
