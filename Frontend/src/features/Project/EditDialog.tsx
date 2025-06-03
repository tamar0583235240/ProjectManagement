// import React, { useEffect, useRef } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   MenuItem,
// } from "@mui/material";
// import { useForm, Controller } from "react-hook-form";
// import { Status } from "../../types/Status";

// // === Type Declarations ===

// interface Project {
//   _id: string;
//   project_name: string;
//   description: string;
//   start_date: string;
//   deadline: string;
//   status: string;
//   project_manager_id: string | { _id: string };
//   organization_id: string | { _id: string };
//   authorized_Users: string[];
// }

// interface EditDialogProps {
//   open: boolean;
//   project: Project | null;
//   onClose: () => void;
//   onSave: (updatedProject: Project) => void;
// }

// interface FormValues {
//   project_name: string;
//   description: string;
//   start_date: string;
//   deadline: string;
//   status: string;
//   project_manager_id: string;
//   organization_id: string;
// }

// // === Custom Hook to track previous value ===
// function usePrevious<T>(value: T): T | undefined {
//   const ref = useRef<T>();
//   useEffect(() => {
//     ref.current = value;
//   }, [value]);
//   return ref.current;
// }

// // === Main Component ===
// const EditDialog: React.FC<EditDialogProps> = ({ open, project, onClose, onSave }) => {
//   const {
//     control,
//     handleSubmit,
//     reset,
//   } = useForm<FormValues>({
//     defaultValues: {
//       project_name: "",
//       description: "",
//       start_date: "",
//       deadline: "",
//       status: Status.NOT_STARTED,
//       project_manager_id: "",
//       organization_id: "",
//     },
//   });

//   const prevProjectId = usePrevious(project?._id);

//   useEffect(() => {
//     if (project && project._id !== prevProjectId) {
//       reset({
//         project_name: project.project_name || "",
//         description: project.description || "",
//         start_date: project.start_date ? project.start_date.split("T")[0] : "",
//         deadline: project.deadline ? project.deadline.split("T")[0] : "",
//         status: project.status || "NOT_STARTED",
//         project_manager_id:
//           typeof project.project_manager_id === "object"
//             ? project.project_manager_id._id
//             : project.project_manager_id || "",
//         organization_id:
//           typeof project.organization_id === "object"
//             ? project.organization_id?._id
//             : project?.organization_id || "",
//       });
//     }
//   }, [project, prevProjectId, reset]);

//   if (!project) return null;

//   const normalizeIds = (p: Project): Project => ({
//     ...p,
//     project_manager_id:
//       typeof p.project_manager_id === "object" && p.project_manager_id !== null
//         ? p.project_manager_id._id
//         : p.project_manager_id,
//     organization_id:
//       typeof p.organization_id === "object" && p.organization_id !== null
//         ? p.organization_id._id
//         : p.organization_id,
//   });

//   const onSubmit = (data: FormValues) => {
//     const updatedProject: Project = {
//       ...project,
//       project_name: data.project_name,
//       description: data.description,
//       start_date: data.start_date ? new Date(data.start_date).toISOString() : "",
//       deadline: data.deadline ? new Date(data.deadline).toISOString() : "",
//       status: data.status,
//       project_manager_id: data.project_manager_id,
//       organization_id: data.organization_id,
//       authorized_Users: project.authorized_Users || [],
//     };

//     onSave(normalizeIds(updatedProject));
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Edit Project</DialogTitle>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <DialogContent>
//           <Controller
//             name="project_name"
//             control={control}
//             rules={{ required: "Project name is required" }}
//             render={({ field, fieldState }) => (
//               <TextField
//                 {...field}
//                 label="Project Name"
//                 fullWidth
//                 margin="normal"
//                 error={!!fieldState.error}
//                 helperText={fieldState.error?.message}
//               />
//             )}
//           />
//           <Controller
//             name="description"
//             control={control}
//             rules={{ required: "Description is required" }}
//             render={({ field, fieldState }) => (
//               <TextField
//                 {...field}
//                 label="Description"
//                 fullWidth
//                 multiline
//                 rows={4}
//                 margin="normal"
//                 error={!!fieldState.error}
//                 helperText={fieldState.error?.message}
//               />
//             )}
//           />
//           <Controller
//             name="start_date"
//             control={control}
//             rules={{ required: "Start date is required" }}
//             render={({ field, fieldState }) => (
//               <TextField
//                 {...field}
//                 label="Start Date"
//                 type="date"
//                 fullWidth
//                 margin="normal"
//                 InputLabelProps={{ shrink: true }}
//                 error={!!fieldState.error}
//                 helperText={fieldState.error?.message}
//               />
//             )}
//           />
//           <Controller
//             name="deadline"
//             control={control}
//             rules={{ required: "Deadline is required" }}
//             render={({ field, fieldState }) => (
//               <TextField
//                 {...field}
//                 label="Deadline"
//                 type="date"
//                 fullWidth
//                 margin="normal"
//                 InputLabelProps={{ shrink: true }}
//                 error={!!fieldState.error}
//                 helperText={fieldState.error?.message}
//               />
//             )}
//           />
//           <Controller
//             name="status"
//             control={control}
//             rules={{ required: "Status is required" }}
//             render={({ field }) => (
//               <TextField select label="Status" fullWidth margin="normal" {...field}>
//                 <MenuItem value="NOT_STARTED">Not Started</MenuItem>
//                 <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
//                 <MenuItem value="COMPLETED">Completed</MenuItem>
//                 <MenuItem value="DELAYED">Delayed</MenuItem>
//               </TextField>
//             )}
//           />
//           <Controller
//             name="project_manager_id"
//             control={control}
//             rules={{ required: "Project manager is required" }}
//             render={({ field, fieldState }) => (
//               <TextField
//                 {...field}
//                 label="Project Manager ID"
//                 fullWidth
//                 margin="normal"
//                 error={!!fieldState.error}
//                 helperText={fieldState.error?.message}
//               />
//             )}
//           />
//           <Controller
//             name="organization_id"
//             control={control}
//             rules={{ required: "Organization ID is required" }}
//             render={({ field, fieldState }) => (
//               <TextField
//                 {...field}
//                 label="Organization ID"
//                 fullWidth
//                 margin="normal"
//                 error={!!fieldState.error}
//                 helperText={fieldState.error?.message}
//               />
//             )}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={onClose}>Cancel</Button>
//           <Button type="submit" variant="contained" color="primary">
//             Save Changes
//           </Button>
//         </DialogActions>
//       </form>
//     </Dialog>
//   );
// };

// export default EditDialog;


import React, { useEffect, useRef } from "react";
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
import { Status } from "../../types/Status";

// === Type Declarations ===

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

// === Custom Hook to track previous value ===
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// === Main Component ===
const EditDialog: React.FC<EditDialogProps> = ({ open, project, onClose, onSave }) => {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      project_name: "",
      description: "",
      start_date: "",
      deadline: "",
      status: Status.NOT_STARTED,
    },
  });

  const prevProjectId = usePrevious(project?._id);

  useEffect(() => {
    if (project && project._id !== prevProjectId) {
      reset({
        project_name: project.project_name || "",
        description: project.description || "",
        start_date: project.start_date ? project.start_date.split("T")[0] : "",
        deadline: project.deadline ? project.deadline.split("T")[0] : "",
        status: project.status || "NOT_STARTED",
      });
    }
  }, [project, prevProjectId, reset]);

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
      start_date: data.start_date ? new Date(data.start_date).toISOString() : "",
      deadline: data.deadline ? new Date(data.deadline).toISOString() : "",
      status: data.status,
      // שמירה על הערכים המקוריים של המזהים
      project_manager_id: project.project_manager_id,
      organization_id: project.organization_id,
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
