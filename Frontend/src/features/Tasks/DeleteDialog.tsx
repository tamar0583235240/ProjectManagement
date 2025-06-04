import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material"
import type { Task } from "./tasksApi"

interface Props {
  open: boolean
  task: Task | null
  onClose: () => void
  onConfirm: () => void
}

const DeleteDialog = ({ open, task, onClose, onConfirm }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the task{' '}
          <strong>{task?.task_name}</strong>? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={onConfirm} color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog