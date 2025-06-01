// // import {
// //   Button,
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogContentText,
// //   DialogTitle,
// //   FormControl,
// //   InputLabel,
// //   MenuItem,
// //   Select,
// //   Stack,
// //   TextField
// // } from "@mui/material"
// // import type { Project } from "../../types/Project"

// // interface EditDialogProps {
// //   open: boolean
// //   project: Project | null
// //   onClose: () => void
// //   onSave: (e: React.FormEvent) => void
// // }

// // const EditDialog: React.FC<EditDialogProps> = ({ open, project, onClose, onSave }) => {
// //   if (!project) return null

// //   return (
// //     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth disableScrollLock>
// //       <DialogTitle>Edit Project</DialogTitle>
// //       <form onSubmit={onSave}>
// //         <DialogContent>
// //           <DialogContentText sx={{ mb: 2 }}>
// //             Update the project details and click "Save Changes" to apply the updates.
// //           </DialogContentText>
// //           <Stack spacing={2}>
// //             <TextField
// //               label="Project Name"
// //               fullWidth
// //               defaultValue={project.project_name}
// //               required
// //               variant="outlined"
// //               margin="normal"
// //             />
// //             <TextField
// //               label="Description"
// //               fullWidth
// //               defaultValue={project.description}
// //               multiline
// //               rows={3}
// //               variant="outlined"
// //               margin="normal"
// //             />
// //             <FormControl fullWidth variant="outlined" margin="normal">
// //               <InputLabel>Status</InputLabel>
// //               <Select label="Status" defaultValue={project.status}>
// //                 <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
// //                 <MenuItem value="COMPLETED">Completed</MenuItem>
// //                 <MenuItem value="DELAYED">Delayed</MenuItem>
// //                 <MenuItem value="NOT_STARTED">Not Started</MenuItem>
// //               </Select>
// //             </FormControl>
// //             <TextField
// //               label="Deadline"
// //               type="date"
// //               fullWidth
// //               defaultValue={project.deadline.split("T")[0]}
// //               InputLabelProps={{ shrink: true }}
// //               variant="outlined"
// //               margin="normal"
// //             />
// //           </Stack>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={onClose}>Cancel</Button>
// //           <Button type="submit" variant="contained" color="primary">
// //             Save Changes
// //           </Button>
// //         </DialogActions>
// //       </form>
// //     </Dialog>
// //   )
// // }

// // export default EditDialog

// // EditDialog.tsx
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Stack,
//   TextField,
//   MenuItem,
// } from "@mui/material"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"
// import { useEffect } from "react"
// import type { Project } from "../../types/Project"

// const editProjectSchema = z.object({
//   project_name: z.string().min(1, "Project name is required"),
//   description: z.string().optional(),
//   status: z.enum(["IN_PROGRESS", "COMPLETED", "DELAYED", "NOT_STARTED"]),
//   deadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
//     message: "Invalid date format",
//   }),

// })

// type EditProjectFormValues = z.infer<typeof editProjectSchema>

// interface EditDialogProps {
//   open: boolean
//   project: Project | null
//   onClose: () => void
//   onSave: (updatedProject: Project) => void
// }

// const EditDialog: React.FC<EditDialogProps> = ({ open, project, onClose, onSave }) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<EditProjectFormValues>({
//     resolver: zodResolver(editProjectSchema),
//   })

//   useEffect(() => {
//     if (project) {
//       reset({
//         project_name: project.project_name,
//         description: project.description,
//         status: project.status,
//         deadline: project.deadline.split("T")[0],
//       })
//     }
//   }, [project, reset])

//   // const onSubmit = (data: EditProjectFormValues) => {
//   //   if (!project) return
//   //   onSave({ ...project, ...data })
//   // }

// //   const onSubmit = (data: EditProjectFormValues) => {
// //   if (!project) return;
  
// //   // כאן אנו מוודאים ש-project_manager_id הוא מזהה בלבד (string)
// //   const projectManagerId =
// //     typeof project.project_manager_id === "object" && project.project_manager_id !== null
// //       ? project.project_manager_id._id
// //       : project.project_manager_id;

// //   onSave({ ...project, ...data, project_manager_id: projectManagerId });
// // };

// const onSubmit = (data: EditProjectFormValues) => {
//   if (!project) return;

//   // וידוא שמזהי שדות כמו project_manager_id ו-organization הם רק המזהה (string)
//   const projectManagerId =
//     typeof project.project_manager_id === "object" && project.project_manager_id !== null
//       ? project.project_manager_id._id
//       : project.project_manager_id;

//   const organizationId =
//     typeof project.organization === "object" && project.organization !== null
//       ? project.organization._id
//       : project.organization;

//   onSave({
//     ...project,
//     ...data,
//     project_manager_id: projectManagerId,
//     organization: organizationId,
//   });
// };


//   if (!project) return null

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Edit Project</DialogTitle>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <DialogContent>
//           <DialogContentText sx={{ mb: 2 }}>
//             Update the project details and click "Save Changes" to apply the updates.
//           </DialogContentText>
//           <Stack spacing={2}>
//             <TextField
//               label="Project Name"
//               fullWidth
//               {...register("project_name")}
//               error={!!errors.project_name}
//               helperText={errors.project_name?.message}
//             />
//             <TextField
//               label="Description"
//               fullWidth
//               multiline
//               rows={3}
//               {...register("description")}
//               error={!!errors.description}
//               helperText={errors.description?.message}
//             />
//             <TextField
//               select
//               label="Status"
//               fullWidth
//               defaultValue=""
//               {...register("status")}
//               error={!!errors.status}
//               helperText={errors.status?.message}
//             >
//               <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
//               <MenuItem value="COMPLETED">Completed</MenuItem>
//               <MenuItem value="DELAYED">Delayed</MenuItem>
//               <MenuItem value="NOT_STARTED">Not Started</MenuItem>
//             </TextField>
//             <TextField
//               label="Deadline"
//               type="date"
//               fullWidth
//               InputLabelProps={{ shrink: true }}
//               {...register("deadline")}
//               error={!!errors.deadline}
//               helperText={errors.deadline?.message}
//             />
//           </Stack>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={onClose}>Cancel</Button>
//           <Button type="submit" variant="contained" color="primary">
//             Save Changes
//           </Button>
//         </DialogActions>
//       </form>
//     </Dialog>
//   )
// }

// export default EditDialog

import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

interface Project {
  _id: string;
  project_name: string;
  description: string;
  start_date: string;      // ISO string
  deadline: string;        // ISO string
  status: string;
  project_manager_id: string | { _id: string; [key: string]: any };
  organization_id: string | { _id: string; [key: string]: any };
  authorized_Users: string[];  // או אובייקטים בהתאם לצורך
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
  project_manager_id: string;
  organization_id: string;
}

const EditDialog: React.FC<EditDialogProps> = ({ open, project, onClose, onSave }) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      project_name: "",
      description: "",
      start_date: "",
      deadline: "",
      status: "NOT_STARTED",
      project_manager_id: "",
      organization_id: "",
    },
  });

  useEffect(() => {
    if (project) {
      reset({
        project_name: project.project_name || "",
        description: project.description || "",
        start_date: project.start_date ? project.start_date.split("T")[0] : "",
        deadline: project.deadline ? project.deadline.split("T")[0] : "",
        status: project.status || "NOT_STARTED",
        project_manager_id:
          typeof project.project_manager_id === "object" && project.project_manager_id !== null
            ? project.project_manager_id._id
            : project.project_manager_id || "",
        organization_id:
          typeof project.organization_id === "object" && project.organization_id !== null
            ? project.organization_id._id
            : project.organization_id || "",
      });
    }
  }, [project, reset]);

  if (!project) return null;

  // לפני שליחה לשרת - נורמליזציה - לוודא שמזהים הם מחרוזות בלבד (ObjectId)
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
      start_date: data.start_date ? new Date(data.start_date).toISOString() : "",
      deadline: data.deadline ? new Date(data.deadline).toISOString() : "",
      status: data.status,
      project_manager_id: data.project_manager_id,
      organization_id: data.organization_id,
      authorized_Users: project.authorized_Users || [],
    };

    onSave(normalizeIds(updatedProject));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Project</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="project_name"
            control={control}
            rules={{ required: "Project name is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Project Name"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="start_date"
            control={control}
            rules={{ required: "Start date is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Start Date"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="deadline"
            control={control}
            rules={{ required: "Deadline is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Deadline"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <TextField select label="Status" fullWidth margin="normal" {...field}>
                <MenuItem value="NOT_STARTED">Not Started</MenuItem>
                <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                <MenuItem value="COMPLETED">Completed</MenuItem>
                <MenuItem value="DELAYED">Delayed</MenuItem>
              </TextField>
            )}
          />
          <Controller
            name="project_manager_id"
            control={control}
            rules={{ required: "Project manager is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Project Manager ID"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="organization_id"
            control={control}
            rules={{ required: "Organization ID is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Organization ID"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
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

export default EditDialog;
