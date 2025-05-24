import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from "@mui/material"
import type { Project } from "../../types/Project"

interface EditDialogProps {
  open: boolean
  project: Project | null
  onClose: () => void
  onSave: (e: React.FormEvent) => void
}

const EditDialog: React.FC<EditDialogProps> = ({ open, project, onClose, onSave }) => {
  if (!project) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth disableScrollLock>
      <DialogTitle>Edit Project</DialogTitle>
      <form onSubmit={onSave}>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Update the project details and click "Save Changes" to apply the updates.
          </DialogContentText>
          <Stack spacing={2}>
            <TextField
              label="Project Name"
              fullWidth
              defaultValue={project.project_name}
              required
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Description"
              fullWidth
              defaultValue={project.description}
              multiline
              rows={3}
              variant="outlined"
              margin="normal"
            />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Status</InputLabel>
              <Select label="Status" defaultValue={project.status}>
                <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                <MenuItem value="COMPLETED">Completed</MenuItem>
                <MenuItem value="DELAYED">Delayed</MenuItem>
                <MenuItem value="NOT_STARTED">Not Started</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Deadline"
              type="date"
              fullWidth
              defaultValue={project.deadline.split("T")[0]}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              margin="normal"
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
