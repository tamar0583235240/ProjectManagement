import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert
} from "@mui/material";
import {
  Delete,
  Warning,
  Close
} from "@mui/icons-material";

const DeleteEmployeeDialog = ({ 
  open, 
  onClose, 
  employee, 
  onConfirm, 
  isLoading 
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 2,
        color: '#d32f2f'
      }}>
        <Warning />
        Delete Employee
      </DialogTitle>
      
      <DialogContent>
        <Alert 
          severity="warning" 
          sx={{ mb: 2 }}
        >
          This action cannot be undone
        </Alert>
        
        <Typography variant="body1" sx={{ mb: 2 }}>
          Are you sure you want to delete employee{" "}
          <Typography component="span" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
            {employee?.user_name}
          </Typography>
          ?
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          All information related to this employee will be permanently removed from the system.
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button 
          onClick={onClose}
          disabled={isLoading}
          variant="outlined"
          startIcon={<Close />}
        >
          Cancel
        </Button>
        <Button
          onClick={() => onConfirm(employee)}
          disabled={isLoading}
          variant="contained"
          color="error"
          startIcon={<Delete />}
        >
          {isLoading ? "Deleting..." : "Delete Employee"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteEmployeeDialog;
