import { useEffect, useState } from "react";
import type { User } from "../../types/User";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { grey } from "@mui/material/colors";

const EditEmployeeDialog = ({
  open,
  onClose,
  employee,
  onSave,
  isLoading,
}: {
  open: boolean;
  onClose: () => void;
  employee: User;
  onSave: (employeeData: Partial<User>) => Promise<void>;
  isLoading: boolean;
}) => {
  const [formData, setFormData] = useState<Partial<User>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
    setErrors({});
  }, [employee, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
    setErrors((prev) => ({ ...prev, [name as string]: "" }));
  };

  const validate = () => {
    let tempErrors: Record<string, string> = {};
    if (!formData.user_name || formData.user_name.trim() === "") tempErrors.user_name = "User Name is required.";
    if (!formData.email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is not valid.";
    }
    if (!formData.role) tempErrors.role = "Role is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 3 } }} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          background: "white",
          color: grey[900],
          fontWeight: 600,
          px: 3,
          py: 2,
          borderBottom: `1px solid ${grey[200]}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="span" sx={{ fontWeight: 600, color: grey[900] }}>
          Edit Employee
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: grey[500],
            "&:hover": {
              color: grey[700],
              backgroundColor: grey[100],
            },
            borderRadius: "50%",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ pt: 2, pb: 3, px: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth margin="dense" variant="outlined" sx={{ mb: 2 }}>
              <InputLabel shrink htmlFor="user-name-input" sx={{ position: 'relative', transform: 'none', fontSize: '0.8rem', fontWeight: 500, color: grey[700] }}>
                User Name
              </InputLabel>
              <TextField
                id="user-name-input"
                margin="dense"
                name="user_name"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.user_name || ""}
                onChange={handleChange}
                error={!!errors.user_name}
                helperText={errors.user_name}
                InputLabelProps={{ shrink: false }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 }, mt: 0 }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="dense" variant="outlined" sx={{ mb: 2 }}>
              <InputLabel shrink htmlFor="email-input" sx={{ position: 'relative', transform: 'none', fontSize: '0.8rem', fontWeight: 500, color: grey[700] }}>
                Email Address
              </InputLabel>
              <TextField
                id="email-input"
                margin="dense"
                name="email"
                type="email"
                fullWidth
                variant="outlined"
                value={formData.email || ""}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputLabelProps={{ shrink: false }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 }, mt: 0 }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="dense" variant="outlined" error={!!errors.role} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 }, mb: 2 }}>
              <InputLabel shrink htmlFor="role-select" sx={{ position: 'relative', transform: 'none', fontSize: '0.8rem', fontWeight: 500, color: grey[700] }}>
                Role
              </InputLabel>
              <Select
                id="role-select"
                name="role"
                value={formData.role || ""}
                label="Role"
                onChange={handleChange}
                sx={{ mt: 0 }}
              >
                <MenuItem value="EMPLOYEE">Employee</MenuItem>
                <MenuItem value="MANAGER">Manager</MenuItem>
                <MenuItem value="TEAMLEADER">Team Leader</MenuItem>
              </Select>
              {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2, justifyContent: 'flex-end', borderTop: `1px solid ${grey[200]}` }}>
        <Button onClick={onClose} disabled={isLoading} sx={{ borderRadius: 1.5, color: grey[700], '&:hover': { backgroundColor: grey[100] } }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading}
          sx={{
            background: "linear-gradient(135deg, #00BCD4 0%, #26C6DA 100%)",
            boxShadow: 3,
            px: 3,
            py: 1,
            borderRadius: 1.5,
            "&:hover": {
              background: "linear-gradient(135deg, #0097A7 0%, #00ACC1 100%)",
              boxShadow: 6,
            },
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployeeDialog;
