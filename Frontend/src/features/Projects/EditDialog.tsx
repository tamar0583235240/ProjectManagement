// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Stack,
//   TextField
// } from "@mui/material"
// import type { Project } from "../../types/Project"

// interface EditDialogProps {
//   open: boolean
//   project: Project | null
//   onClose: () => void
//   onSave: (e: React.FormEvent) => void
// }

// const EditDialog: React.FC<EditDialogProps> = ({ open, project, onClose, onSave }) => {
//   if (!project) return null

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth disableScrollLock>
//       <DialogTitle>Edit Project</DialogTitle>
//       <form onSubmit={onSave}>
//         <DialogContent>
//           <DialogContentText sx={{ mb: 2 }}>
//             Update the project details and click "Save Changes" to apply the updates.
//           </DialogContentText>
//           <Stack spacing={2}>
//             <TextField
//               label="Project Name"
//               fullWidth
//               defaultValue={project.project_name}
//               required
//               variant="outlined"
//               margin="normal"
//             />
//             <TextField
//               label="Description"
//               fullWidth
//               defaultValue={project.description}
//               multiline
//               rows={3}
//               variant="outlined"
//               margin="normal"
//             />
//             <FormControl fullWidth variant="outlined" margin="normal">
//               <InputLabel>Status</InputLabel>
//               <Select label="Status" defaultValue={project.status}>
//                 <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
//                 <MenuItem value="COMPLETED">Completed</MenuItem>
//                 <MenuItem value="DELAYED">Delayed</MenuItem>
//                 <MenuItem value="NOT_STARTED">Not Started</MenuItem>
//               </Select>
//             </FormControl>
//             <TextField
//               label="Deadline"
//               type="date"
//               fullWidth
//               defaultValue={project.deadline.split("T")[0]}
//               InputLabelProps={{ shrink: true }}
//               variant="outlined"
//               margin="normal"
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

// EditDialog.tsx
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEffect } from "react"
import type { Project } from "../../types/Project"

const editProjectSchema = z.object({
  project_name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  status: z.enum(["IN_PROGRESS", "COMPLETED", "DELAYED", "NOT_STARTED"]),
  deadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
})

type EditProjectFormValues = z.infer<typeof editProjectSchema>

interface EditDialogProps {
  open: boolean
  project: Project | null
  onClose: () => void
  onSave: (updatedProject: Project) => void
}

const EditDialog: React.FC<EditDialogProps> = ({ open, project, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProjectFormValues>({
    resolver: zodResolver(editProjectSchema),
  })

  useEffect(() => {
    if (project) {
      reset({
        project_name: project.project_name,
        description: project.description,
        status: project.status,
        deadline: project.deadline.split("T")[0],
      })
    }
  }, [project, reset])

  const onSubmit = (data: EditProjectFormValues) => {
    if (!project) return
    onSave({ ...project, ...data })
  }

  if (!project) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Project</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Update the project details and click "Save Changes" to apply the updates.
          </DialogContentText>
          <Stack spacing={2}>
            <TextField
              label="Project Name"
              fullWidth
              {...register("project_name")}
              error={!!errors.project_name}
              helperText={errors.project_name?.message}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <TextField
              select
              label="Status"
              fullWidth
              defaultValue=""
              {...register("status")}
              error={!!errors.status}
              helperText={errors.status?.message}
            >
              <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
              <MenuItem value="DELAYED">Delayed</MenuItem>
              <MenuItem value="NOT_STARTED">Not Started</MenuItem>
            </TextField>
            <TextField
              label="Deadline"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register("deadline")}
              error={!!errors.deadline}
              helperText={errors.deadline?.message}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditDialog

