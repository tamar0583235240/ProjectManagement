// // import React from "react";
// // import {
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   TextField,
// //   Select,
// //   MenuItem,
// //   FormControl,
// //   InputLabel,
// //   Button,
// //   Grid,
// //   Box,
// //   IconButton,
// //   InputAdornment,
// //   Typography
// // } from "@mui/material";
// // import {
// //   Save,
// //   Close,
// //   Visibility,
// //   VisibilityOff
// // } from "@mui/icons-material";

import { useEffect, useState } from "react";
import type { User } from "../../types/User";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";

// // const roles = [
// //   { value: "EMPLOYEE", label: "Employee" },
// //   { value: "MANAGER", label: "Manager" },
// //   { value: "TEAMLEADER", label: "Team Leader" }
// // ];

// // export default function EmployeeDialog({ 
// //   open, 
// //   onClose, 
// //   employee, 
// //   onSave, 
// //   isLoading,
// //   allEmployees = []
// // }) {
// //   const [formData, setFormData] = React.useState({
// //     user_name: "",
// //     password: "",
// //     email: "",
// //     role: "EMPLOYEE",
// //     manager_id: "",
// //     organization_id: ""
// //   });
// //   const [showPassword, setShowPassword] = React.useState(false);

// //   // Filter potential managers (exclude current employee)
// //   const potentialManagers = allEmployees.filter(emp => 
// //     emp.id !== employee?.id && 
// //     (emp.role === "MANAGER" || emp.role === "TEAMLEADER")
// //   );

// //   React.useEffect(() => {
// //     if (employee) {
// //       setFormData({
// //         user_name: employee.user_name || "",
// //         password: "",
// //         email: employee.email || "",
// //         role: employee.role || "EMPLOYEE",
// //         manager_id: employee.manager_id || "",
// //         organization_id: employee.organization_id || ""
// //       });
// //     } else {
// //       setFormData({
// //         user_name: "",
// //         password: "",
// //         email: "",
// //         role: "EMPLOYEE",
// //         manager_id: "",
// //         organization_id: ""
// //       });
// //     }
// //   }, [employee, open]);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const dataToSave = { ...formData };
    
// //     if (employee && !dataToSave.password) {
// //       delete dataToSave.password;
// //     }
    
// //     onSave(dataToSave);
// //   };

// //   const handleChange = (field) => (event) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [field]: event.target.value
// //     }));
// //   };

// //   return (
// //     <Dialog 
// //       open={open} 
// //       onClose={onClose}
// //       maxWidth="md"
// //       fullWidth
// //       PaperProps={{
// //         sx: {
// //           borderRadius: 2,
// //           background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
// //         }
// //       }}
// //     >
// //       <DialogTitle sx={{ 
// //         display: 'flex', 
// //         justifyContent: 'space-between', 
// //         alignItems: 'center',
// //         background: 'linear-gradient(135deg, #00bcd4 0%, #26c6da 100%)',
// //         color: 'white',
// //         mb: 3
// //       }}>
// //         <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
// //           {employee ? "Edit Employee" : "Add New Employee"}
// //         </Typography>
// //         <IconButton onClick={onClose} sx={{ color: 'white' }}>
// //           <Close />
// //         </IconButton>
// //       </DialogTitle>
      
// //       <form onSubmit={handleSubmit}>
// //         <DialogContent sx={{ pb: 2 }}>
// //           <Grid container spacing={3}>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 fullWidth
// //                 label="Username *"
// //                 value={formData.user_name}
// //                 onChange={handleChange("user_name")}
// //                 required
// //                 variant="outlined"
// //                 sx={{ backgroundColor: 'white' }}
// //               />
// //             </Grid>
            
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 fullWidth
// //                 label="Email *"
// //                 type="email"
// //                 value={formData.email}
// //                 onChange={handleChange("email")}
// //                 required
// //                 variant="outlined"
// //                 sx={{ backgroundColor: 'white' }}
// //               />
// //             </Grid>
            
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 fullWidth
// //                 label={employee ? "New Password (leave empty to keep current)" : "Password *"}
// //                 type={showPassword ? "text" : "password"}
// //                 value={formData.password}
// //                 onChange={handleChange("password")}
// //                 required={!employee}
// //                 variant="outlined"
// //                 sx={{ backgroundColor: 'white' }}
// //                 InputProps={{
// //                   endAdornment: (
// //                     <InputAdornment position="end">
// //                       <IconButton
// //                         onClick={() => setShowPassword(!showPassword)}
// //                         edge="end"
// //                       >
// //                         {showPassword ? <VisibilityOff /> : <Visibility />}
// //                       </IconButton>
// //                     </InputAdornment>
// //                   ),
// //                 }}
// //               />
// //             </Grid>
            
// //             <Grid item xs={12} sm={6}>
// //               <FormControl fullWidth required sx={{ backgroundColor: 'white' }}>
// //                 <InputLabel>Role</InputLabel>
// //                 <Select
// //                   value={formData.role}
// //                   onChange={handleChange("role")}
// //                   label="Role"
// //                 >
// //                   {roles.map((role) => (
// //                     <MenuItem key={role.value} value={role.value}>
// //                       {role.label}
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>
// //             </Grid>
            
// //             <Grid item xs={12} sm={6}>
// //               <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
// //                 <InputLabel>Manager (Optional)</InputLabel>
// //                 <Select
// //                   value={formData.manager_id}
// //                   onChange={handleChange("manager_id")}
// //                   label="Manager (Optional)"
// //                 >
// //                   <MenuItem value="">No Direct Manager</MenuItem>
// //                   {potentialManagers.map((manager) => (
// //                     <MenuItem key={manager.id} value={manager.id}>
// //                       {manager.user_name} ({roles.find(r => r.value === manager.role)?.label || manager.role})
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>
// //             </Grid>
            
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 fullWidth
// //                 label="Organization ID *"
// //                 value={formData.organization_id}
// //                 onChange={handleChange("organization_id")}
// //                 required
// //                 variant="outlined"
// //                 sx={{ backgroundColor: 'white' }}
// //               />
// //             </Grid>
// //           </Grid>
// //         </DialogContent>
        
// //         <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
// //           <Button 
// //             onClick={onClose}
// //             variant="outlined"
// //             startIcon={<Close />}
// //             sx={{ 
// //               color: '#666',
// //               borderColor: '#ddd',
// //               '&:hover': {
// //                 borderColor: '#999'
// //               }
// //             }}
// //           >
// //             Cancel
// //           </Button>
// //           <Button 
// //             type="submit" 
// //             variant="contained"
// //             disabled={isLoading}
// //             startIcon={<Save />}
// //             sx={{
// //               background: 'linear-gradient(135deg, #00bcd4 0%, #26c6da 100%)',
// //               '&:hover': {
// //                 background: 'linear-gradient(135deg, #0097a7 0%, #00acc1 100%)'
// //               }
// //             }}
// //           >
// //             {isLoading ? "Saving..." : (employee ? "Update" : "Add")}
// //           </Button>
// //         </DialogActions>
// //       </form>
// //     </Dialog>
// //   );
// // }


// "use client"

// import React from "react"
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   Grid,
//   IconButton,
//   InputAdornment,
//   Typography,
// } from "@mui/material"
// import { Save, Close, Visibility, VisibilityOff } from "@mui/icons-material"
// import type { User } from "../types/user"

// const roles = [
//   { value: "EMPLOYEE", label: "Employee" },
//   { value: "MANAGER", label: "Manager" },
//   { value: "TEAMLEADER", label: "Team Leader" },
// ]

// interface EmployeeDialogProps {
//   open: boolean
//   onClose: () => void
//   employee: User | null
//   onSave: (employeeData: Partial<User>) => void
//   isLoading: boolean
//   allEmployees?: User[]
// }

// export default function EmployeeDialog({
//   open,
//   onClose,
//   employee,
//   onSave,
//   isLoading,
//   allEmployees = [],
// }: EmployeeDialogProps) {
//   const [formData, setFormData] = React.useState<Partial<User>>({
//     user_name: "",
//     password: "",
//     email: "",
//     role: "EMPLOYEE",
//     manager_id: null,
//     organization_id: "",
//   })
//   const [showPassword, setShowPassword] = React.useState(false)

//   // Filter potential managers (exclude current employee)
//   const potentialManagers = allEmployees.filter(
//     (emp) => emp._id !== employee?._id && (emp.role === "MANAGER" || emp.role === "TEAMLEADER"),
//   )

//   React.useEffect(() => {
//     if (employee) {
//       setFormData({
//         user_name: employee.user_name || "",
//         password: "",
//         email: employee.email || "",
//         role: employee.role || "EMPLOYEE",
//         manager_id: employee.manager_id || null,
//         organization_id: employee.organization_id || "",
//       })
//     } else {
//       setFormData({
//         user_name: "",
//         password: "",
//         email: "",
//         role: "EMPLOYEE",
//         manager_id: null,
//         organization_id: "",
//       })
//     }
//   }, [employee, open])

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     const dataToSave = { ...formData }

//     if (employee && !dataToSave.password) {
//       delete dataToSave.password
//     }

//     onSave(dataToSave)
//   }

//   const handleChange = (field: keyof User) => (event: any) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: event.target.value === "" ? null : event.target.value,
//     }))
//   }

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: 2,
//           background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
//         },
//       }}
//     >
//       <DialogTitle
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           background: "linear-gradient(135deg, #00bcd4 0%, #26c6da 100%)",
//           color: "white",
//           mb: 3,
//         }}
//       >
//         <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
//           {employee ? "Edit Employee" : "Add New Employee"}
//         </Typography>
//         <IconButton onClick={onClose} sx={{ color: "white" }}>
//           <Close />
//         </IconButton>
//       </DialogTitle>

//       <form onSubmit={handleSubmit}>
//         <DialogContent sx={{ pb: 2 }}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Username *"
//                 value={formData.user_name || ""}
//                 onChange={handleChange("user_name")}
//                 required
//                 variant="outlined"
//                 sx={{ backgroundColor: "white" }}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Email *"
//                 type="email"
//                 value={formData.email || ""}
//                 onChange={handleChange("email")}
//                 required
//                 variant="outlined"
//                 sx={{ backgroundColor: "white" }}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label={employee ? "New Password (leave empty to keep current)" : "Password *"}
//                 type={showPassword ? "text" : "password"}
//                 value={formData.password || ""}
//                 onChange={handleChange("password")}
//                 required={!employee}
//                 variant="outlined"
//                 sx={{ backgroundColor: "white" }}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth required sx={{ backgroundColor: "white" }}>
//                 <InputLabel>Role</InputLabel>
//                 <Select value={formData.role || "EMPLOYEE"} onChange={handleChange("role")} label="Role">
//                   {roles.map((role) => (
//                     <MenuItem key={role.value} value={role.value}>
//                       {role.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth sx={{ backgroundColor: "white" }}>
//                 <InputLabel>Manager (Optional)</InputLabel>
//                 <Select
//                   value={formData.manager_id || ""}
//                   onChange={handleChange("manager_id")}
//                   label="Manager (Optional)"
//                 >
//                   <MenuItem value="">No Direct Manager</MenuItem>
//                   {potentialManagers.map((manager) => (
//                     <MenuItem key={manager._id} value={manager._id}>
//                       {manager.user_name} ({roles.find((r) => r.value === manager.role)?.label || manager.role})
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Organization ID *"
//                 value={formData.organization_id || ""}
//                 onChange={handleChange("organization_id")}
//                 required
//                 variant="outlined"
//                 sx={{ backgroundColor: "white" }}
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>

//         <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
//           <Button
//             onClick={onClose}
//             variant="outlined"
//             startIcon={<Close />}
//             sx={{
//               color: "#666",
//               borderColor: "#ddd",
//               "&:hover": {
//                 borderColor: "#999",
//               },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             variant="contained"
//             disabled={isLoading}
//             startIcon={<Save />}
//             sx={{
//               background: "linear-gradient(135deg, #00bcd4 0%, #26c6da 100%)",
//               "&:hover": {
//                 background: "linear-gradient(135deg, #0097a7 0%, #00acc1 100%)",
//               },
//             }}
//           >
//             {isLoading ? "Saving..." : employee ? "Update" : "Add"}
//           </Button>
//         </DialogActions>
//       </form>
//     </Dialog>
//   )
// }


const EmployeeDialog = ({ open, onClose, employee, onSave, isLoading, allEmployees }: { open: boolean, onClose: () => void, employee: User | null, onSave: (employeeData: Partial<User>) => Promise<void>, isLoading: boolean, allEmployees: User[] }) => {
  const [formData, setFormData] = useState<Partial<User>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData({
        user_name: "",
        email: "",
        role: "EMPLOYEE", // Default role for new employee
        organization_id: "", // Will be set by parent component if not provided by form
      });
    }
    setErrors({}); // Clear errors when dialog opens or employee changes
  }, [employee, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
    setErrors((prev) => ({ ...prev, [name as string]: "" })); // Clear error on change
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
      <DialogTitle sx={{ background: "linear-gradient(135deg, #00BCD4 0%, #26C6DA 100%)", color: "white", fontWeight: 600, px: 3, py: 2 }}>
        {employee ? "Edit Employee" : "Add New Employee"}
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 2, pb: 3, px: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin="dense"
              name="user_name"
              label="User Name"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.user_name || ""}
              onChange={handleChange}
              error={!!errors.user_name}
              helperText={errors.user_name}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email || ""}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="dense" error={!!errors.role} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role || ""}
                label="Role"
                onChange={handleChange}
              >
                <MenuItem value="EMPLOYEE">Employee</MenuItem>
                <MenuItem value="MANAGER">Manager</MenuItem>
                <MenuItem value="TEAMLEADER">Team Leader</MenuItem>
              </Select>
              {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
            </FormControl>
          </Grid>
          {/* Removed phone_number, address, and manager_id fields as they are not in the provided User interface */}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
        <Button onClick={onClose} disabled={isLoading} sx={{ borderRadius: 1.5 }}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading}
          sx={{
            background: "linear-gradient(135deg, #00BCD4 0%, #26C6DA 100%)", // Teal gradient
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
          {isLoading ? <CircularProgress size={24} color="inherit" /> : (employee ? "Save Changes" : "Add Employee")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeDialog;