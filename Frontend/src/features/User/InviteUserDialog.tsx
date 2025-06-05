import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import InviteUserForm from "./InviteUserForm";

const InviteUserDialog = ({ open, onClose, onSave, isLoading }: { open: boolean, onClose: () => void, onSave: (employeeData: Partial<User>) => Promise<void>, isLoading: boolean }) => {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 3 } }} maxWidth="sm" fullWidth>
      <DialogTitle sx={{
        background: "white",
        color: grey[900],
        fontWeight: 600,
        px: 3,
        py: 2,
        borderBottom: `1px solid ${grey[200]}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography variant="h6" component="span" sx={{ fontWeight: 600, color: grey[900] }}>
          Invite New Employee
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
      <DialogContent sx={{ pt: 2, pb: 3, px: 3 }}>
        <InviteUserForm onClose={onClose} onSave={onSave} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
};

export default InviteUserDialog