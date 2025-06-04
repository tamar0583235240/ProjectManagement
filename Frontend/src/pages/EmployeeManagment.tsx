// // import React from 'react';
// // import {
// //   Grid,
// //   IconButton,
// //   Typography,
// //   Card,
// //   CardContent,
// //   CardActions,
// //   Tooltip,
// //   Box,
// //   Menu,
// //   MenuItem,
// //   Button,
// // } from '@mui/material';
// // import { Add, Edit, Delete, MoreVert } from '@mui/icons-material';
// // import useCurrentUser from '../hooks/useCurrentUser';
// // import { useGetEmployeesByOrganizationQuery } from '../features/User/userApi';

// // const EmployeeManagement: React.FC = () => {
// //   console.log("hi");
  
// //   const user = useCurrentUser();
// //   const { data: employees = [], isLoading, isError } = useGetEmployeesByOrganizationQuery(user?.organization_id);

// //   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
// //   const [selectedEmployee, setSelectedEmployee] = React.useState<any>(null);
// //   const open = Boolean(anchorEl);

// //   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, employee: any) => {
// //     setAnchorEl(event.currentTarget);
// //     setSelectedEmployee(employee);
// //   };

// //   const handleMenuClose = () => {
// //     setAnchorEl(null);
// //     setSelectedEmployee(null);
// //   };

// //   const handleEdit = () => {
// //     console.log('Edit', selectedEmployee);
// //     handleMenuClose();
// //     // TODO: Open edit dialog
// //   };

// //   const handleDelete = () => {
// //     console.log('Delete', selectedEmployee);
// //     handleMenuClose();
// //     // TODO: Trigger delete mutation
// //   };

// //   const handleAdd = () => {
// //     console.log('Add new employee');
// //     // TODO: Open add dialog
// //   };

// //   return (
// //     <Box sx={{ p: 3 }}>
// //       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
// //         <Typography variant="h4" fontWeight="bold">Employee Management</Typography>
// //         <Button
// //           startIcon={<Add />}
// //           variant="contained"
// //           onClick={handleAdd}
// //         >
// //           Add Employee
// //         </Button>
// //       </Box>

// //       {isLoading ? (
// //         <Typography>Loading employees...</Typography>
// //       ) : isError ? (
// //         <Typography color="error">Failed to load employees.</Typography>
// //       ) : (
// //         <Grid container spacing={3}>
// //           {employees.map((employee) => (
// //             <Grid item xs={12} sm={6} md={4} key={employee._id}>
// //               <Card
// //                 sx={{
// //                   height: '100%',
// //                   display: 'flex',
// //                   flexDirection: 'column',
// //                   justifyContent: 'space-between',
// //                   '&:hover': { boxShadow: 4 },
// //                 }}
// //               >
// //                 <CardContent>
// //                   <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
// //                     <Typography variant="h6">{employee.user_name}</Typography>
// //                     <IconButton onClick={(e) => handleMenuOpen(e, employee)}>
// //                       <MoreVert />
// //                     </IconButton>
// //                   </Box>
// //                   <Typography variant="body2" color="text.secondary">{employee.email}</Typography>
// //                   <Typography variant="body2" color="text.secondary" mt={1}>
// //                     Role: {employee.role}
// //                   </Typography>
// //                 </CardContent>
// //                 <CardActions sx={{ justifyContent: 'flex-end', px: 2 }}>
// //                   <Tooltip title="Edit">
// //                     <IconButton onClick={handleEdit}><Edit /></IconButton>
// //                   </Tooltip>
// //                   <Tooltip title="Delete">
// //                     <IconButton onClick={handleDelete}><Delete /></IconButton>
// //                   </Tooltip>
// //                 </CardActions>
// //               </Card>
// //             </Grid>
// //           ))}
// //         </Grid>
// //       )}

// //       <Menu
// //         anchorEl={anchorEl}
// //         open={open}
// //         onClose={handleMenuClose}
// //       >
// //         <MenuItem onClick={handleEdit}>Edit</MenuItem>
// //         <MenuItem onClick={handleDelete}>Delete</MenuItem>
// //       </Menu>
// //     </Box>
// //   );
// // };

// // export default EmployeeManagement;
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Grid,
//   Card,
//   CardContent,
//   Chip,
//   InputAdornment,
//   Paper,
//   Skeleton,
//   Container
// } from "@mui/material";
// import {
//   Add,
//   Search,
//   FilterList,
//   People,
//   SupervisorAccount,
//   Groups,
//   Person
// } from "@mui/icons-material";
// import EmployeeDialog from "../features/User/EmployeeDialog";
// import DeleteEmployeeDialog from "../features/User/DeleteEmployeeDialog";
// import EmployeeCard from "../features/User/EmployeeCard";
// import { useGetEmployeesByOrganizationQuery } from "../features/User/userApi";
// import useCurrentUser from "../hooks/useCurrentUser";

// const roleLabels = {
//   "EMPLOYEE": "Employee",
//   "MANAGER": "Manager",
//   "TEAMLEADER": "Team Leader"
// };

// export default function EmployeeManagement() {
  
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");
  
//   // Dialog states
//   const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false);  
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const user = useCurrentUser();

//   const employees = useGetEmployeesByOrganizationQuery(user.organization_id);

//   useEffect(() => {
//     loadEmployees();
//   }, []);

//   useEffect(() => {
//     filterEmployees();
//   }, [employees, searchTerm, roleFilter]);

//   const loadEmployees = async () => {
//     try {
//       const data = await Employee.list("-created_date");
//       setEmployees(data);
//     } catch (error) {
//       console.error("Error loading employees:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filterEmployees = () => {
//     let filtered = employees;

//     if (searchTerm) {
//       filtered = filtered.filter(employee =>
//         employee.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         employee.email?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (roleFilter !== "all") {
//       filtered = filtered.filter(employee => employee.role === roleFilter);
//     }

//     setFilteredEmployees(filtered);
//   };

//   const handleAddEmployee = () => {
//     setSelectedEmployee(null);
//     setShowEmployeeDialog(true);
//   };

//   const handleEditEmployee = (employee) => {
//     setSelectedEmployee(employee);
//     setShowEmployeeDialog(true);
//   };

//   const handleDeleteEmployee = (employee) => {
//     setSelectedEmployee(employee);
//     setShowDeleteDialog(true);
//   };

//   const handleSaveEmployee = async (employeeData) => {
//     setIsSubmitting(true);
//     try {
//       if (selectedEmployee) {
//         await Employee.update(selectedEmployee.id, employeeData);
//       } else {
//         await Employee.create(employeeData);
//       }
//       setShowEmployeeDialog(false);
//       loadEmployees();
//     } catch (error) {
//       console.error("Error saving employee:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleConfirmDelete = async (employee) => {
//     setIsSubmitting(true);
//     try {
//       await Employee.delete(employee.id);
//       setShowDeleteDialog(false);
//       loadEmployees();
//     } catch (error) {
//       console.error("Error deleting employee:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const stats = {
//     total: employees.length,
//     managers: employees.filter(emp => emp.role === "MANAGER").length,
//     teamLeaders: employees.filter(emp => emp.role === "TEAMLEADER").length,
//     employees: employees.filter(emp => emp.role === "EMPLOYEE").length
//   };

//   return (
//     <Box sx={{ 
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
//       py: 4
//     }}>
//       <Container maxWidth="xl">
//         {/* Header Section */}
//         <Box sx={{ mb: 4 }}>
//           <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             alignItems: { xs: 'flex-start', lg: 'center' },
//             flexDirection: { xs: 'column', lg: 'row' },
//             gap: 3
//           }}>
//             <Box>
//               <Typography variant="h3" component="h1" sx={{ 
//                 fontWeight: 700, 
//                 color: '#1a1a1a',
//                 mb: 1
//               }}>
//                 Employee Management
//               </Typography>
//               <Typography variant="h6" color="text.secondary">
//                 Manage your company team efficiently
//               </Typography>
//             </Box>
//             <Button 
//               variant="contained"
//               startIcon={<Add />}
//               onClick={handleAddEmployee}
//               size="large"
//               sx={{
//                 background: 'linear-gradient(135deg, #00bcd4 0%, #26c6da 100%)',
//                 boxShadow: 3,
//                 px: 3,
//                 py: 1.5,
//                 '&:hover': {
//                   background: 'linear-gradient(135deg, #0097a7 0%, #00acc1 100%)',
//                   boxShadow: 6
//                 }
//               }}
//             >
//               Add New Employee
//             </Button>
//           </Box>
//         </Box>

//         {/* Stats Cards */}
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ 
//               background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
//               boxShadow: 3
//             }}>
//               <CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Box>
//                     <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>
//                       Total Employees
//                     </Typography>
//                     <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
//                       {stats.total}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ 
//                     width: 48, 
//                     height: 48, 
//                     borderRadius: 3,
//                     background: 'linear-gradient(135deg, #00bcd4 0%, #26c6da 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                   }}>
//                     <People sx={{ color: 'white', fontSize: 24 }} />
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ 
//               background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
//               boxShadow: 3
//             }}>
//               <CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Box>
//                     <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>
//                       Managers
//                     </Typography>
//                     <Typography variant="h4" sx={{ fontWeight: 700, color: '#d32f2f' }}>
//                       {stats.managers}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ 
//                     width: 48, 
//                     height: 48, 
//                     borderRadius: 3,
//                     background: 'linear-gradient(135deg, #f44336 0%, #e57373 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                   }}>
//                     <SupervisorAccount sx={{ color: 'white', fontSize: 24 }} />
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ 
//               background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
//               boxShadow: 3
//             }}>
//               <CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Box>
//                     <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>
//                       Team Leaders
//                     </Typography>
//                     <Typography variant="h4" sx={{ fontWeight: 700, color: '#2e7d32' }}>
//                       {stats.teamLeaders}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ 
//                     width: 48, 
//                     height: 48, 
//                     borderRadius: 3,
//                     background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                   }}>
//                     <Groups sx={{ color: 'white', fontSize: 24 }} />
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <Card sx={{ 
//               background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
//               boxShadow: 3
//             }}>
//               <CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Box>
//                     <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>
//                       Employees
//                     </Typography>
//                     <Typography variant="h4" sx={{ fontWeight: 700, color: '#ff9800' }}>
//                       {stats.employees}
//                     </Typography>
//                   </Box>
//                   <Box sx={{ 
//                     width: 48, 
//                     height: 48, 
//                     borderRadius: 3,
//                     background: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                   }}>
//                     <Person sx={{ color: 'white', fontSize: 24 }} />
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Filters Section */}
//         <Paper sx={{ p: 3, mb: 4, background: 'white', boxShadow: 3 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
//             <FilterList sx={{ color: '#666' }} />
//             <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
//               Filter & Search
//             </Typography>
//           </Box>
          
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 placeholder="Search employees..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Search sx={{ color: '#666' }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{ backgroundColor: 'white' }}
//               />
//             </Grid>
            
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
//                 <InputLabel>All Roles</InputLabel>
//                 <Select
//                   value={roleFilter}
//                   onChange={(e) => setRoleFilter(e.target.value)}
//                   label="All Roles"
//                 >
//                   <MenuItem value="all">All Roles</MenuItem>
//                   <MenuItem value="EMPLOYEE">Employee</MenuItem>
//                   <MenuItem value="MANAGER">Manager</MenuItem>
//                   <MenuItem value="TEAMLEADER">Team Leader</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
          
//           {(searchTerm || roleFilter !== "all") && (
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
//               <Typography variant="body2" color="text.secondary">
//                 Active filters:
//               </Typography>
//               {searchTerm && (
//                 <Chip 
//                   label={`Search: ${searchTerm}`} 
//                   size="small"
//                   variant="outlined"
//                 />
//               )}
//               {roleFilter !== "all" && (
//                 <Chip 
//                   label={`Role: ${roleLabels[roleFilter] || roleFilter}`} 
//                   size="small"
//                   variant="outlined"
//                 />
//               )}
//             </Box>
//           )}
//         </Paper>

//         {/* Employees Grid */}
//         {isLoading ? (
//           <Grid container spacing={3}>
//             {[...Array(6)].map((_, i) => (
//               <Grid item xs={12} sm={6} md={4} key={i}>
//                 <Card sx={{ height: 280 }}>
//                   <CardContent>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
//                       <Skeleton variant="circular" width={48} height={48} />
//                       <Box sx={{ flex: 1 }}>
//                         <Skeleton variant="text" sx={{ fontSize: '1.2rem' }} />
//                         <Skeleton variant="text" width="60%" />
//                       </Box>
//                     </Box>
//                     <Skeleton variant="text" />
//                     <Skeleton variant="text" width="80%" />
//                     <Skeleton variant="text" width="70%" />
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         ) : filteredEmployees.length === 0 ? (
//           <Paper sx={{ textAlign: 'center', py: 8, background: 'white' }}>
//             <People sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
//             <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
//               No employees to display
//             </Typography>
//             <Typography color="text.secondary" sx={{ mb: 3 }}>
//               {employees.length === 0 ? "Start by adding your first employee" : "No employees match your search"}
//             </Typography>
//             {employees.length === 0 && (
//               <Button 
//                 variant="contained"
//                 startIcon={<Add />}
//                 onClick={handleAddEmployee}
//                 sx={{
//                   background: 'linear-gradient(135deg, #00bcd4 0%, #26c6da 100%)'
//                 }}
//               >
//                 Add First Employee
//               </Button>
//             )}
//           </Paper>
//         ) : (
//           <Grid container spacing={3}>
//             {filteredEmployees.map((employee) => (
//               <Grid item xs={12} sm={6} md={4} key={employee.id}>
//                 <EmployeeCard
//                   employee={employee}
//                   onEdit={handleEditEmployee}
//                   onDelete={handleDeleteEmployee}
//                   allEmployees={employees}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         )}
//       </Container>

//       {/* Dialogs */}
//       <EmployeeDialog
//         open={showEmployeeDialog}
//         onClose={() => setShowEmployeeDialog(false)}
//         employee={selectedEmployee}
//         onSave={handleSaveEmployee}
//         isLoading={isSubmitting}
//         allEmployees={employees}
//       />

//       <DeleteEmployeeDialog
//         open={showDeleteDialog}
//         onClose={() => setShowDeleteDialog(false)}
//         employee={selectedEmployee}
//         onConfirm={handleConfirmDelete}
//         isLoading={isSubmitting}
//       />
//     </Box>
//   );
// }

import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  Container
} from "@mui/material";
import {
  Add,
  People,
  SupervisorAccount,
  Groups
} from "@mui/icons-material";
import EmployeeDialog from "../features/User/EmployeeDialog";
import DeleteEmployeeDialog from "../features/User/DeleteEmployeeDialog";
import EmployeeCard from "../features/User/EmployeeCard";
import { useGetEmployeesByOrganizationQuery } from "../features/User/userApi";
import useCurrentUser from "../hooks/useCurrentUser";

const roleLabels = {
  "EMPLOYEE": "Employee",
  "MANAGER": "Manager",
  "TEAMLEADER": "Team Leader"
};

export default function EmployeeManagement() {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const user = useCurrentUser();
  const {
    data: employees = [],
    isLoading,
    refetch
  } = useGetEmployeesByOrganizationQuery(user.organization_id);

  useEffect(() => {
    let result = employees;

    if (searchTerm) {
      result = result.filter(emp =>
        emp.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      result = result.filter(emp => emp.role === roleFilter);
    }

    setFilteredEmployees(result);
  }, [employees, searchTerm, roleFilter]);

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setShowEmployeeDialog(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeDialog(true);
  };

  const handleDeleteEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteDialog(true);
  };

  const stats = useMemo(() => ({
    total: employees.length,
    managers: employees.filter(emp => emp.role === "MANAGER").length,
    teamLeaders: employees.filter(emp => emp.role === "TEAMLEADER").length,
    employees: employees.filter(emp => emp.role === "EMPLOYEE").length
  }), [employees]);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', lg: 'center' },
            flexDirection: { xs: 'column', lg: 'row' },
            gap: 3
          }}>
            <Box>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
                Employee Management
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Manage your company team efficiently
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddEmployee}
              size="large"
              sx={{
                background: 'linear-gradient(135deg, #00bcd4 0%, #26c6da 100%)',
                boxShadow: 3,
                px: 3,
                py: 1.5,
                '&:hover': {
                  background: 'linear-gradient(135deg, #0097a7 0%, #00acc1 100%)',
                  boxShadow: 6
                }
              }}
            >
              Add New Employee
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>
                      Total Employees
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                      {stats.total}
                    </Typography>
                  </Box>
                  <Box sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #00bcd4 0%, #26c6da 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <People sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>
                      Managers
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#d32f2f' }}>
                      {stats.managers}
                    </Typography>
                  </Box>
                  <Box sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #f44336 0%, #e57373 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <SupervisorAccount sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>
                      Team Leaders
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                      {stats.teamLeaders}
                    </Typography>
                  </Box>
                  <Box sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Groups sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Employees List */}
        <Grid container spacing={3}>
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card><CardContent><Typography>Loading...</Typography></CardContent></Card>
              </Grid>
            ))
          ) : (
            filteredEmployees.map((emp) => (
              <Grid item xs={12} sm={6} md={4} key={emp.email}>
                <EmployeeCard
                  employee={emp}
                  onEdit={() => handleEditEmployee(emp)}
                  onDelete={() => handleDeleteEmployee(emp)}
                />
              </Grid>
            ))
          )}
        </Grid>

        <EmployeeDialog
          open={showEmployeeDialog}
          onClose={() => setShowEmployeeDialog(false)}
          employee={selectedEmployee}
          onSave={() => {
            setShowEmployeeDialog(false);
            refetch();
          }}
        />

        <DeleteEmployeeDialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          employee={selectedEmployee}
          onConfirm={() => {
            setShowDeleteDialog(false);
            refetch();
          }}
        />
      </Container>
    </Box>
  );
}
