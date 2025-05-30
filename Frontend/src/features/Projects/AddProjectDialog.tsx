
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Divider,
//   FormControl,
//   FormHelperText,
//   InputLabel,
//   MenuItem,
//   Select,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material"
// import { useForm, Controller, type SubmitHandler } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useState } from "react"
// import { addProjectSchema, type AddProjectFormData, type AuthorizedUser } from "../../schemas/SchemaAddProject"
// import { v4 as uuidv4 } from "uuid"
// import AuthorizedUsersList from "./AuthorizedUsersList"
// import AddAuthorizedUserForm from "./AddAuthorizedUserForm"
// import { useAddProjectMutation } from "./projectApi"
// import { useDispatch } from "react-redux"
// import { setProjects } from "./projectSlice"
// import { useSelector } from "react-redux"

// interface AddProjectDialogProps {
//   open: boolean
//   onClose: () => void
//   onAdd: (data: AddProjectFormData) => void
// }

// const AddProjectDialog: React.FC<AddProjectDialogProps> = ({ open, onClose, onAdd }) => {
//   const today = new Date().toISOString().split("T")[0]
//   const [userFormOpen, setUserFormOpen] = useState(false)
//   const [editingUser, setEditingUser] = useState<AuthorizedUser | undefined>(undefined)

//   const [addProject, { isLoading, isError }] = useAddProjectMutation();

//   const dispatch = useDispatch();
//   const projectsFromState = useSelector((state) => state.projects.projects)
//   const {
//     handleSubmit,
//     control,
//     reset,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm<AddProjectFormData>({
//     resolver: zodResolver(addProjectSchema),
//     defaultValues: {
//       projectName: "",
//       description: "",
//       manager: "",
//       startDate: today,
//       deadline: today,
//       authorizedUsers: [],
//     },
//   })

//   const authorizedUsers = watch("authorizedUsers") || []

//   const handleAddUser = (userData: { name: string; email: string }) => {
//     const newUser: AuthorizedUser = {
//       id: uuidv4(),
//       ...userData,
//     }
//     setValue("authorizedUsers", [...authorizedUsers, newUser])
//   }

//   const handleEditUser = (userData: { name: string; email: string }) => {
//     if (!editingUser) return

//     const updatedUsers = authorizedUsers.map(user =>
//       user.id === editingUser.id ? { ...user, ...userData } : user
//     )
//     setValue("authorizedUsers", updatedUsers)
//     setEditingUser(undefined)
//   }

//   const handleDeleteUser = (userId: string) => {
//     setValue(
//       "authorizedUsers",
//       authorizedUsers.filter(user => user.id !== userId)
//     )
//   }

//   const openUserForm = () => {
//     setEditingUser(undefined)
//     setUserFormOpen(true)
//   }

//   const startEditUser = (user: AuthorizedUser) => {
//     setEditingUser(user)
//     setUserFormOpen(true)
//   }
//   const onSubmit: SubmitHandler<AddProjectFormData> = async (data) => {
//     try {
//       const addedProject = await addProject(data).unwrap()
//       dispatch(setProjects([...projectsFromState, addedProject]))
//       const response = await addProject(data).unwrap();
//       console.log("Project created:", response);
//       onAdd(response);
//       reset();
//       onClose();
//     } catch (err) {
//       console.error("Failed to add project:", err);
//     }
//   }

//   return (
//     <>
//       <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth disableScrollLock>
//         <DialogTitle>Add New Project</DialogTitle>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <DialogContent>
//             <DialogContentText sx={{ mb: 2 }}>
//               Enter the details of the new project
//             </DialogContentText>
//             <Stack spacing={2}>
//               <Controller
//                 name="projectName"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Project Name"
//                     fullWidth
//                     required
//                     variant="outlined"
//                     margin="normal"
//                     error={!!errors.projectName}
//                     helperText={errors.projectName?.message}
//                   />
//                 )}
//               />
//               <Controller
//                 name="description"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Description"
//                     fullWidth
//                     multiline
//                     rows={3}
//                     variant="outlined"
//                     margin="normal"
//                   />
//                 )}
//               />
//               <Controller
//                 name="manager"
//                 control={control}
//                 render={({ field }) => (
//                   <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.manager}>
//                     <InputLabel>Project Manager</InputLabel>
//                     <Select {...field} label="Project Manager">
//                       <MenuItem value=""><em>None</em></MenuItem>
//                       <MenuItem value="tamar">Tamar</MenuItem>
//                       <MenuItem value="daniel">Daniel</MenuItem>
//                       <MenuItem value="lior">Lior</MenuItem>
//                     </Select>
//                     {errors.manager && <FormHelperText>{errors.manager.message}</FormHelperText>}
//                   </FormControl>
//                 )}
//               />
//               <Stack direction="row" spacing={2}>
//                 <Controller
//                   name="startDate"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label="Start Date"
//                       type="date"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                       variant="outlined"
//                       margin="normal"
//                       error={!!errors.startDate}
//                       helperText={errors.startDate?.message}
//                     />
//                   )}
//                 />
//                 <Controller
//                   name="deadline"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label="Deadline"
//                       type="date"
//                       fullWidth
//                       InputLabelProps={{ shrink: true }}
//                       variant="outlined"
//                       margin="normal"
//                       error={!!errors.deadline}
//                       helperText={errors.deadline?.message}
//                     />
//                   )}
//                 />
//               </Stack>

//               <Divider sx={{ my: 1 }} />

//               <Stack direction="row" justifyContent="space-between" alignItems="center">
//                 <Typography variant="subtitle1">Authorized Users</Typography>
//                 <Button
//                   variant="outlined"
//                   size="small"
//                   onClick={openUserForm}
//                 >
//                   Add User
//                 </Button>
//               </Stack>

//               <AuthorizedUsersList
//                 users={authorizedUsers}
//                 onEdit={startEditUser}
//                 onDelete={handleDeleteUser}
//               />
//             </Stack>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={onClose}>Cancel</Button>
//             <Button type="submit" variant="contained" color="primary">
//               Add Project
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>

//       <AddAuthorizedUserForm
//         open={userFormOpen}
//         onClose={() => setUserFormOpen(false)}
//         onSave={editingUser ? handleEditUser : handleAddUser}
//         editUser={editingUser}
//       />
//     </>
//   )
// }

// export default AddProjectDialog
// src/components/Projects/AddProjectDialog.tsx
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
  CircularProgress,
  Alert,
} from "@mui/material";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import {
  addProjectSchema,
  type AddProjectFormData,
  type AuthorizedUserFormData,
} from "../../schemas/SchemaAddProject";
import {
  useAddProjectMutation,
  useGetProjectManagersQuery,
  useGetProjectsByManagerIdQuery,
  // useGetOrganizationsQuery,
} from "./projectApi";
import { setProjects } from "./projectSlice";
import AuthorizedUsersList from "./AuthorizedUsersList";
import AddAuthorizedUserForm from "./AddAuthorizedUserForm";
import useCurrentUser from "../../hooks/useCurrentUser";

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
  const [editingUser, setEditingUser] = useState<AuthorizedUserFormData>();

  const dispatch = useDispatch();
  const projectsFromState = useSelector((state: any) => state.projects.projects);
  const currentUser = useCurrentUser();

  const [addProject, { isLoading: isAddingProject, error: addProjectError }] = useAddProjectMutation();
  const { data: projectManagers = [], isLoading: isLoadingManagers, error: managersError } = useGetProjectsByManagerIdQuery(currentUser?._id);
  // const { data: organizations = [], isLoading: isLoadingOrganizations, error: organizationsError } = useGetOrganizationsQuery();

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
    },
  });

  const authorizedUsers = watch("authorized_Users") || [];

  useEffect(() => {
    if (currentUser?.organization_id) {
      setValue("organization_id", currentUser.organization_id);
    }
  }, [currentUser, setValue]);

  const handleAddUser = useCallback((userData: { user_name: string; email: string; _id?: string }) => {
    const newUser: AuthorizedUserFormData = {
      id: uuidv4(),
      ...userData,
    };
    setValue("authorized_Users", [...authorizedUsers, newUser]);
  }, [authorizedUsers, setValue]);

  const handleEditUser = useCallback((userData: { user_name: string; email: string; _id?: string }) => {
    if (!editingUser) return;

    const updatedUsers = authorizedUsers.map(user =>
      user.id === editingUser.id ? { ...user, ...userData } : user
    );
    setValue("authorized_Users", updatedUsers);
    setEditingUser(undefined);
  }, [authorizedUsers, editingUser, setValue]);

  const handleDeleteUser = useCallback((userId: string) => {
    setValue("authorized_Users", authorizedUsers.filter(user => user.id !== userId));
  }, [authorizedUsers, setValue]);

  const handleOpenUserForm = () => {
    setEditingUser(undefined);
    setUserFormOpen(true);
  };

  const handleStartEditUser = (user: AuthorizedUserFormData) => {
    setEditingUser(user);
    setUserFormOpen(true);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit: SubmitHandler<AddProjectFormData> = async (data) => {
    try {
      const addedProject = await addProject(data).unwrap();
      dispatch(setProjects([...projectsFromState, addedProject]));
      onAdd(addedProject);
      reset();
      onClose();
    } catch (err) {
      console.error("Failed to add project:", err);
    }
  };

  const isLoading = isLoadingManagers 
  // || isLoadingOrganizations;

  if (isLoading) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Stack spacing={2} alignItems="center" sx={{ py: 4 }}>
            <CircularProgress />
            <Typography>טוען נתונים...</Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth disableScrollLock>
        <DialogTitle>הוספת פרויקט חדש</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText sx={{ mb: 2 }}>
              הזן את פרטי הפרויקט החדש
            </DialogContentText>

            {(addProjectError || managersError
            //  || organizationsError
          ) && (
              <Alert severity="error" sx={{ mb: 2 }}>
                שגיאה בטעינת הנתונים. אנא נסה שוב.
              </Alert>
            )}

            <Stack spacing={2}>
              <Controller
                name="project_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="שם הפרויקט"
                    fullWidth
                    required
                    variant="outlined"
                    margin="normal"
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
                    label="תיאור"
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    margin="normal"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />

              <Controller
                name="project_manager_id"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.project_manager_id}>
                    <InputLabel>מנהל פרויקט</InputLabel>
                    <Select {...field} label="מנהל פרויקט">
                      <MenuItem value="">
                        <em>בחר מנהל פרויקט</em>
                      </MenuItem>
                      {projectManagers.map((manager) => (
                        <MenuItem key={manager._id} value={manager._id}>
                          {manager.user_name} - {manager.email}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{errors.project_manager_id?.message}</FormHelperText>
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
                      label="תאריך התחלה"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      margin="normal"
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
                      label="תאריך יעד"
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
                <Typography variant="subtitle1">משתמשים מורשים</Typography>
                <Button variant="outlined" size="small" onClick={handleOpenUserForm}>
                  הוסף משתמש
                </Button>
              </Stack>

              <AuthorizedUsersList
                users={authorizedUsers}
                onEdit={handleStartEditUser}
                onDelete={handleDeleteUser}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={isAddingProject}>
              ביטול
            </Button>
            <Button type="submit" variant="contained" color="primary" disabled={isAddingProject}>
              {isAddingProject ? <CircularProgress size={20} /> : "הוסף פרויקט"}
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
  );
};

export default AddProjectDialog;
