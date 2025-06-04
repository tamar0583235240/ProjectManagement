// import { useState, useMemo, useEffect } from "react"
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
//   Container,
//   Alert,
// } from "@mui/material"
// import { Add, Search, FilterList, People, SupervisorAccount, Groups, Person } from "@mui/icons-material"
// import type { User } from "../types/Project"
// import useCurrentUser from "../hooks/useCurrentUser"
// import EmployeeCard from "../features/User/EmployeeCard"
// import EmployeeDialog from "../features/User/EmployeeDialog"
// import DeleteEmployeeDialog from "../features/User/DeleteEmployeeDialog"
// import { useGetEmployeesByOrganizationQuery } from "../features/User/userApi"

// const roleLabels = {
//   EMPLOYEE: "Employee",
//   MANAGER: "Manager",
//   TEAMLEADER: "Team Leader",
// }

// const EmployeeManagement = () => {

//   const user = useCurrentUser();
//   const { data: employees = [], isLoading } = useGetEmployeesByOrganizationQuery(user.organization_id)

//   const [error, setError] = useState<string | null>(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [roleFilter, setRoleFilter] = useState("all")

//   // Dialog states
//   const [showEmployeeDialog, setShowEmployeeDialog] = useState(false)
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false)
//   const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null)
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   // Load employees on component mount
//   useEffect(() => {
//     loadEmployees()
//   }, [])

//   const loadEmployees = async () => {
//     setIsLoading(true)
//     setError(null)

//     try {
//       // Replace this with your actual API call
//       // const response = await fetch(`/api/Users/getEmployeesByOrg/${user.organization_id}`)
//       // const data = await response.json()

//       // For now, using mock data
//       await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay
//       setEmployees(mockEmployees.filter((emp) => emp.organization_id === user.organization_id))
//     } catch (err) {
//       setError("Failed to load employees")
//       console.error("Error loading employees:", err)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Filter employees based on search and role
//   const filteredEmployees = useMemo(() => {
//     let filtered = employees

//     if (searchTerm) {
//       filtered = filtered.filter(
//         (employee) =>
//           employee.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           employee.email?.toLowerCase().includes(searchTerm.toLowerCase()),
//       )
//     }

//     if (roleFilter !== "all") {
//       filtered = filtered.filter((employee) => employee.role === roleFilter)
//     }

//     return filtered
//   }, [employees, searchTerm, roleFilter])

//   // Calculate stats
//   const stats = useMemo(
//     () => ({
//       total: employees.length,
//       managers: employees.filter((emp) => emp.role === "MANAGER").length,
//       teamLeaders: employees.filter((emp) => emp.role === "TEAMLEADER").length,
//       employees: employees.filter((emp) => emp.role === "EMPLOYEE").length,
//     }),
//     [employees],
//   )

//   const handleAddEmployee = () => {
//     setSelectedEmployee(null)
//     setShowEmployeeDialog(true)
//   }

//   const handleEditEmployee = (employee: User) => {
//     setSelectedEmployee(employee)
//     setShowEmployeeDialog(true)
//   }

//   const handleDeleteEmployee = (employee: User) => {
//     setSelectedEmployee(employee)
//     setShowDeleteDialog(true)
//   }

//   const handleSaveEmployee = async (employeeData: Partial<User>) => {
//     setIsSubmitting(true)

//     try {
//       if (selectedEmployee && selectedEmployee._id) {
//         // Update existing employee
//         // await fetch(`/api/Users/${selectedEmployee._id}`, {
//         //   method: 'PUT',
//         //   headers: { 'Content-Type': 'application/json' },
//         //   body: JSON.stringify(employeeData)
//         // })

//         // Mock update
//         setEmployees((prev) =>
//           prev.map((emp) => (emp._id === selectedEmployee._id ? { ...emp, ...employeeData } : emp)),
//         )
//       } else {
//         const newEmployee: User = {
//           _id: Date.now().toString(),
//           ...employeeData,
//           organization_id: user.organization_id,
//           created_date: new Date().toISOString(),
//         } as User

//         setEmployees((prev) => [...prev, newEmployee])
//       }

//       setShowEmployeeDialog(false)
//     } catch (error) {
//       console.error("Error saving employee:", error)
//       setError("Failed to save employee")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleConfirmDelete = async (employee: User) => {
//     if (!employee._id) return

//     setIsSubmitting(true)

//     try {
//       // await fetch(`/api/Users/${employee._id}`, { method: 'DELETE' })

//       // Mock delete
//       setEmployees((prev) => prev.filter((emp) => emp._id !== employee._id))
//       setShowDeleteDialog(false)
//     } catch (error) {
//       console.error("Error deleting employee:", error)
//       setError("Failed to delete employee")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   if (error) {
//     return (
//       <Container maxWidth="xl" sx={{ py: 4 }}>
//         <Alert
//           severity="error"
//           action={
//             <Button color="inherit" size="small" onClick={loadEmployees}>
//               Retry
//             </Button>
//           }
//         >
//           {error}
//         </Alert>
//       </Container>
//     )
//   }

//   return (
//     <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", py: 4 }}>
//       <Container maxWidth="xl">
//         {/* Header Section */}
//         <Box sx={{ mb: 4 }}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: { xs: "flex-start", lg: "center" },
//               flexDirection: { xs: "column", lg: "row" },
//               gap: 3,
//             }}
//           >
//             <Box>
//               <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: "#1a1a1a", mb: 1 }}>
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
//                 background: "linear-gradient(135deg, #00bcd4 0%, #26c6da 100%)",
//                 boxShadow: 3,
//                 px: 3,
//                 py: 1.5,
//                 "&:hover": {
//                   background: "linear-gradient(135deg, #0097a7 0%, #00acc1 100%)",
//                   boxShadow: 6,
//                 },
//               }}
//             >
//               Add New Employee
//             </Button>
//           </Box>
//         </Box>

//         {/* Stats Cards */}
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           <Grid item xs={12} sm={6} md={3}>
//             <Card
//               sx={{
//                 background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
//                 boxShadow: 3,
//               }}
//             >
//               <CardContent>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <Box>
//                     <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>
//                       Total Employees
//                     </Typography>
//                     <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a1a1a" }}>
//                       {stats.total}
//                     </Typography>
//                   </Box>
//                   <Box
//                     sx={{
//                       width: 48,
//                       height: 48,
//                       borderRadius: 3,
//                       background: "linear-gradient(135deg, #00bcd4 0%, #26c6da 100%)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <People sx={{ color: "white", fontSize: 24 }} />
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <Card
//               sx={{
//                 background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
//                 boxShadow: 3,
//               }}
//             >
//               <CardContent>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <Box>
//                     <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>
//                       Managers
//                     </Typography>
//                     <Typography variant="h4" sx={{ fontWeight: 700, color: "#d32f2f" }}>
//                       {stats.managers}
//                     </Typography>
//                   </Box>
//                   <Box
//                     sx={{
//                       width: 48,
//                       height: 48,
//                       borderRadius: 3,
//                       background: "linear-gradient(135deg, #f44336 0%, #e57373 100%)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <SupervisorAccount sx={{ color: "white", fontSize: 24 }} />
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <Card
//               sx={{
//                 background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
//                 boxShadow: 3,
//               }}
//             >
//               <CardContent>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <Box>
//                     <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>
//                       Team Leaders
//                     </Typography>
//                     <Typography variant="h4" sx={{ fontWeight: 700, color: "#2e7d32" }}>
//                       {stats.teamLeaders}
//                     </Typography>
//                   </Box>
//                   <Box
//                     sx={{
//                       width: 48,
//                       height: 48,
//                       borderRadius: 3,
//                       background: "linear-gradient(135deg, #4caf50 0%, #81c784 100%)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Groups sx={{ color: "white", fontSize: 24 }} />
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} sm={6} md={3}>
//             <Card
//               sx={{
//                 background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
//                 boxShadow: 3,
//               }}
//             >
//               <CardContent>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <Box>
//                     <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>
//                       Employees
//                     </Typography>
//                     <Typography variant="h4" sx={{ fontWeight: 700, color: "#ff9800" }}>
//                       {stats.employees}
//                     </Typography>
//                   </Box>
//                   <Box
//                     sx={{
//                       width: 48,
//                       height: 48,
//                       borderRadius: 3,
//                       background: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     <Person sx={{ color: "white", fontSize: 24 }} />
//                   </Box>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Filters Section */}
//         <Paper sx={{ p: 3, mb: 4, background: "white", boxShadow: 3 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
//             <FilterList sx={{ color: "#666" }} />
//             <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a1a1a" }}>
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
//                       <Search sx={{ color: "#666" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{ backgroundColor: "white" }}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth sx={{ backgroundColor: "white" }}>
//                 <InputLabel>All Roles</InputLabel>
//                 <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} label="All Roles">
//                   <MenuItem value="all">All Roles</MenuItem>
//                   <MenuItem value="EMPLOYEE">Employee</MenuItem>
//                   <MenuItem value="MANAGER">Manager</MenuItem>
//                   <MenuItem value="TEAMLEADER">Team Leader</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>

//           {(searchTerm || roleFilter !== "all") && (
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
//               <Typography variant="body2" color="text.secondary">
//                 Active filters:
//               </Typography>
//               {searchTerm && <Chip label={`Search: ${searchTerm}`} size="small" variant="outlined" />}
//               {roleFilter !== "all" && (
//                 <Chip
//                   label={`Role: ${roleLabels[roleFilter as keyof typeof roleLabels] || roleFilter}`}
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
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
//                       <Skeleton variant="circular" width={48} height={48} />
//                       <Box sx={{ flex: 1 }}>
//                         <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} />
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
//           <Paper sx={{ textAlign: "center", py: 8, background: "white" }}>
//             <People sx={{ fontSize: 64, color: "#ccc", mb: 2 }} />
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
//                   background: "linear-gradient(135deg, #00bcd4 0%, #26c6da 100%)",
//                 }}
//               >
//                 Add First Employee
//               </Button>
//             )}
//           </Paper>
//         ) : (
//           <Grid container spacing={3}>
//             {filteredEmployees.map((employee) => (
//               <Grid item xs={12} sm={6} md={4} key={employee._id}>
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
//   )
// }

// export default EmployeeManagement

const EmployeeManagement = () => {
  // Get current user information (mocked)
  const user = useCurrentUser();

  // Fetch employees data using the mocked RTK Query hook
  const { data: employees = [], isLoading, error, refetch } = useGetEmployeesByOrganizationQuery(user.organization_id);

  // State for search and filter inputs
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Dialog states
  const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // For dialog submission loading

  // Filter employees based on search and role
  const filteredEmployees = useMemo(() => {
    let filtered = employees;

    if (searchTerm) {
      filtered = filtered.filter(
        (employee) =>
          employee.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((employee) => employee.role === roleFilter);
    }

    return filtered;
  }, [employees, searchTerm, roleFilter]);

  // Calculate statistics about employees
  const stats = useMemo(
    () => ({
      total: employees.length,
      managers: employees.filter((emp) => emp.role === "MANAGER").length,
      teamLeaders: employees.filter((emp) => emp.role === "TEAMLEADER").length,
      employees: employees.filter((emp) => emp.role === "EMPLOYEE").length,
    }),
    [employees]
  );

  // Handlers for opening dialogs
  const handleAddEmployee = () => {
    setSelectedEmployee(null); // Clear selected employee for add mode
    setShowEmployeeDialog(true);
  };

  const handleEditEmployee = (employee: User) => {
    setSelectedEmployee(employee);
    setShowEmployeeDialog(true);
  };

  const handleDeleteEmployee = (employee: User) => {
    setSelectedEmployee(employee);
    setShowDeleteDialog(true);
  };

  // Handler for saving (adding/editing) an employee
  const handleSaveEmployee = async (employeeData: Partial<User>) => {
    setIsSubmitting(true);
    try {
      if (selectedEmployee && selectedEmployee._id) {
        // Simulate update operation
        await mockUpdateEmployee({ ...selectedEmployee, ...employeeData } as User);
      } else {
        // Simulate add operation
        const newEmployee: User = {
          _id: Date.now().toString(), // Unique ID for mock
          ...employeeData,
          organization_id: user.organization_id, // Ensure organization_id is set for new employees
          // created_date is not in User interface, so not included here
        } as User;
        await mockAddEmployee(newEmployee);
      }
      // After successful mutation, refetch data to update the list
      refetch();
      setShowEmployeeDialog(false);
    } catch (err) {
      console.error("Error saving employee:", err);
      // In a real app, you might set a user-facing error state here
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler for confirming employee deletion
  const handleConfirmDelete = async (employee: User) => {
    if (!employee._id) return;

    setIsSubmitting(true);
    try {
      // Simulate delete operation
      await mockDeleteEmployee(employee._id);
      // After successful mutation, refetch data to update the list
      refetch();
      setShowDeleteDialog(false);
    } catch (err) {
      console.error("Error deleting employee:", err);
      // In a real app, you might set a user-facing error state here
    } finally {
      setIsSubmitting(false);
    }
  };

  // Display error message if data fetching fails
  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={refetch} sx={{ borderRadius: 1.5 }}> {/* Use refetch here */}
              Retry
            </Button>
          }
          sx={{ borderRadius: 2 }}
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #F5F7FA 0%, #E0E6EE 100%)", py: 4 }}> {/* Light grey/off-white background */}
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", lg: "center" },
              flexDirection: { xs: "column", lg: "row" },
              gap: 3,
            }}
          >
            <Box>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 700, color: grey[900], mb: 1 }}>
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
                background: "linear-gradient(135deg, #00BCD4 0%, #26C6DA 100%)", // Teal gradient
                boxShadow: 3,
                px: 3,
                py: 1.5,
                borderRadius: 2,
                "&:hover": {
                  background: "linear-gradient(135deg, #0097A7 0%, #00ACC1 100%)",
                  boxShadow: 6,
                },
              }}
            >
              Add New Employee
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <EmployeeStatsCards stats={stats} />

        {/* Filters Section */}
        <EmployeeFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
        />

        {/* Employees Grid */}
        <EmployeeGrid
          filteredEmployees={filteredEmployees}
          isLoading={isLoading}
          employees={employees}
          handleEditEmployee={handleEditEmployee}
          handleDeleteEmployee={handleDeleteEmployee}
          handleAddEmployee={handleAddEmployee}
        />
      </Container>

      {/* Dialogs */}
      <EmployeeDialog
        open={showEmployeeDialog}
        onClose={() => setShowEmployeeDialog(false)}
        employee={selectedEmployee}
        onSave={handleSaveEmployee}
        isLoading={isSubmitting}
        allEmployees={employees} // Pass all employees for manager dropdown (though not used in current User interface)
      />

      <DeleteEmployeeDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        employee={selectedEmployee}
        onConfirm={handleConfirmDelete}
        isLoading={isSubmitting}
      />
    </Box>
  );
};

export default EmployeeManagement;

