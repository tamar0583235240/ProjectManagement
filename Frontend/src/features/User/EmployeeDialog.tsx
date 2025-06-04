import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Box,
  IconButton,
  InputAdornment,
  Typography
} from "@mui/material";
import {
  Save,
  Close,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";

const roles = [
  { value: "EMPLOYEE", label: "Employee" },
  { value: "MANAGER", label: "Manager" },
  { value: "TEAMLEADER", label: "Team Leader" }
];

export default function EmployeeDialog({ 
  open, 
  onClose, 
  employee, 
  onSave, 
  isLoading,
  allEmployees = []
}) {
  const [formData, setFormData] = React.useState({
    user_name: "",
    password: "",
    email: "",
    role: "EMPLOYEE",
    manager_id: "",
    organization_id: ""
  });
  const [showPassword, setShowPassword] = React.useState(false);

  // Filter potential managers (exclude current employee)
  const potentialManagers = allEmployees.filter(emp => 
    emp.id !== employee?.id && 
    (emp.role === "MANAGER" || emp.role === "TEAMLEADER")
  );

  React.useEffect(() => {
    if (employee) {
      setFormData({
        user_name: employee.user_name || "",
        password: "",
        email: employee.email || "",
        role: employee.role || "EMPLOYEE",
        manager_id: employee.manager_id || "",
        organization_id: employee.organization_id || ""
      });
    } else {
      setFormData({
        user_name: "",
        password: "",
        email: "",
        role: "EMPLOYEE",
        manager_id: "",
        organization_id: ""
      });
    }
  }, [employee, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = { ...formData };
    
    if (employee && !dataToSave.password) {
      delete dataToSave.password;
    }
    
    onSave(dataToSave);
  };

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'linear-gradient(135deg, #00bcd4 0%, #26c6da 100%)',
        color: 'white',
        mb: 3
      }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          {employee ? "Edit Employee" : "Add New Employee"}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pb: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username *"
                value={formData.user_name}
                onChange={handleChange("user_name")}
                required
                variant="outlined"
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email *"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                required
                variant="outlined"
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={employee ? "New Password (leave empty to keep current)" : "Password *"}
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange("password")}
                required={!employee}
                variant="outlined"
                sx={{ backgroundColor: 'white' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required sx={{ backgroundColor: 'white' }}>
                <InputLabel>Role</InputLabel>
                <Select
                  value={formData.role}
                  onChange={handleChange("role")}
                  label="Role"
                >
                  {roles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      {role.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
                <InputLabel>Manager (Optional)</InputLabel>
                <Select
                  value={formData.manager_id}
                  onChange={handleChange("manager_id")}
                  label="Manager (Optional)"
                >
                  <MenuItem value="">No Direct Manager</MenuItem>
                  {potentialManagers.map((manager) => (
                    <MenuItem key={manager.id} value={manager.id}>
                      {manager.user_name} ({roles.find(r => r.value === manager.role)?.label || manager.role})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Organization ID *"
                value={formData.organization_id}
                onChange={handleChange("organization_id")}
                required
                variant="outlined"
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button 
            onClick={onClose}
            variant="outlined"
            startIcon={<Close />}
            sx={{ 
              color: '#666',
              borderColor: '#ddd',
              '&:hover': {
                borderColor: '#999'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={isLoading}
            startIcon={<Save />}
            sx={{
              background: 'linear-gradient(135deg, #00bcd4 0%, #26c6da 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #0097a7 0%, #00acc1 100%)'
              }
            }}
          >
            {isLoading ? "Saving..." : (employee ? "Update" : "Add")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}