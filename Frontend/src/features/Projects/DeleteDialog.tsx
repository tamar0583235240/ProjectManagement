import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import type { Project } from "../../types/Project"

interface DeleteDialogProps {
  open: boolean
  project: Project | null
  onClose: () => void
  onConfirm: () => void
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, project, onClose, onConfirm }) => {
  if (!project) return null

  return (
    <Dialog open={open} onClose={onClose} disableScrollLock>
      <DialogTitle>Delete Project</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the project "{project.project_name}"? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Delete Project
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
