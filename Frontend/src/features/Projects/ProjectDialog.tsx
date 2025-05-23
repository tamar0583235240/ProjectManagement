"use client"

import type React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material"
import type { Project } from "../../types/Project"

interface EditDialogProps {
  open: boolean
  project: Project | null
  onClose: () => void
  onSave: (e: React.FormEvent) => void
}

export const EditDialog: React.FC<EditDialogProps> = ({ open, project, onClose, onSave }) => {
  if (!project) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth disableScrollLock>
      <DialogTitle>עריכת פרויקט</DialogTitle>
      <form onSubmit={onSave}>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>עדכן את פרטי הפרויקט ולחץ על שמור כדי לשמור את השינויים</DialogContentText>
          <Stack spacing={2}>
            <TextField
              label="שם הפרויקט"
              fullWidth
              defaultValue={project.project_name}
              required
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="תיאור"
              fullWidth
              defaultValue={project.description}
              multiline
              rows={3}
              variant="outlined"
              margin="normal"
            />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>סטטוס</InputLabel>
              <Select label="סטטוס" defaultValue={project.status} inputProps={{ dir: "rtl" }}>
                <MenuItem value="IN_PROGRESS">בתהליך</MenuItem>
                <MenuItem value="COMPLETED">הושלם</MenuItem>
                <MenuItem value="DELAYED">באיחור</MenuItem>
                <MenuItem value="NOT_STARTED">טרם התחיל</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="תאריך יעד"
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
          <Button onClick={onClose}>ביטול</Button>
          <Button type="submit" variant="contained" color="primary">
            שמור שינויים
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

interface DeleteDialogProps {
  open: boolean
  project: Project | null
  onClose: () => void
  onConfirm: () => void
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, project, onClose, onConfirm }) => {
  if (!project) return null

  return (
    <Dialog open={open} onClose={onClose} disableScrollLock>
      <DialogTitle>מחיקת פרויקט</DialogTitle>
      <DialogContent>
        <DialogContentText>
          האם אתה בטוח שברצונך למחוק את הפרויקט "{project.project_name}"? פעולה זו אינה ניתנת לביטול.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ביטול</Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          מחק פרויקט
        </Button>
      </DialogActions>
    </Dialog>
  )
}

interface AddProjectDialogProps {
  open: boolean
  onClose: () => void
  onAdd: (e: React.FormEvent) => void
}

export const AddProjectDialog: React.FC<AddProjectDialogProps> = ({ open, onClose, onAdd }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth disableScrollLock>
      <DialogTitle>הוספת פרויקט חדש</DialogTitle>
      <form onSubmit={onAdd}>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>הזן את פרטי הפרויקט החדש</DialogContentText>
          <Stack spacing={2}>
            <TextField label="שם הפרויקט" fullWidth required variant="outlined" margin="normal" />
            <TextField label="תיאור" fullWidth multiline rows={3} variant="outlined" margin="normal" />
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>סטטוס</InputLabel>
              <Select label="סטטוס" defaultValue="NOT_STARTED" inputProps={{ dir: "rtl" }}>
                <MenuItem value="IN_PROGRESS">בתהליך</MenuItem>
                <MenuItem value="COMPLETED">הושלם</MenuItem>
                <MenuItem value="DELAYED">באיחור</MenuItem>
                <MenuItem value="NOT_STARTED">טרם התחיל</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="תאריך יעד"
              type="date"
              fullWidth
              defaultValue={new Date().toISOString().split("T")[0]}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              margin="normal"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>ביטול</Button>
          <Button type="submit" variant="contained" color="primary">
            הוסף פרויקט
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
