import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const DeleteEmployeeDialog = ({ open, onClose, employee, onConfirm, isLoading }: { open: boolean, onClose: () => void, employee: User | null, onConfirm: (employee: User) => Promise<void>, isLoading: boolean }) => {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 3 } }} maxWidth="xs" fullWidth>
      <DialogTitle sx={{
        background: "white", // White background for title
        color: grey[900], // Dark text color
        fontWeight: 600,
        px: 3,
        py: 2,
        borderBottom: `1px solid ${grey[200]}`, // Subtle border at the bottom
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography variant="h6" component="span" sx={{ fontWeight: 600, color: grey[900] }}>
          Delete Project {/* Changed title to "Delete Project" as per image */}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: grey[500],
            '&:hover': {
              color: grey[700],
              backgroundColor: grey[100],
            },
            borderRadius: '50%',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 2, pb: 3, px: 3, textAlign: 'center' }}> {/* Added textAlign: 'center' */}
        <Typography variant="body1" sx={{ mb: 1 }}> {/* Reduced mb for tighter spacing */}
          Are you sure you want to delete the project{" "} {/* Changed text to "delete the project" */}
          <Typography component="span" sx={{ fontWeight: 600, color: grey[900] }}>
            {employee?.user_name} {/* Using user_name as project name for consistency */}
          </Typography>
          ?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, justifyContent: 'flex-end', borderTop: `1px solid ${grey[200]}` }}>
        <Button onClick={onClose} disabled={isLoading} sx={{ borderRadius: 1.5, color: grey[700], '&:hover': { backgroundColor: grey[100] } }}>
          Cancel
        </Button>
        <Button
          onClick={() => employee && onConfirm(employee)}
          variant="contained"
          color="error"
          disabled={isLoading}
          sx={{
            background: "linear-gradient(135deg, #D32F2F 0%, #EF5350 100%)", // Red gradient
            boxShadow: 3,
            px: 3,
            py: 1,
            borderRadius: 1.5,
            "&:hover": {
              background: "linear-gradient(135deg, #C62828 0%, #D84315 100%)",
              boxShadow: 6,
            },
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default DeleteEmployeeDialog