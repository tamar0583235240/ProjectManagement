import { useMemo, useState } from "react";
import {
  useDeleteUserMutation,
  useGetEmployeesByOrganizationQuery,
  useUpdateUserMutation,
} from "../features/User/userApi";
import useCurrentUser from "../hooks/useCurrentUser";
import type { User } from "../types/User";
import { Alert, Box, Button, Container, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import EmployeeStatsCards from "../features/User/EmployeeStatsCards";
import EmployeeFilters from "../features/User/EmployeeFilters";
import EmployeeGrid from "../features/User/EmployeeGrid";
import DeleteEmployeeDialog from "../features/User/DeleteEmployeeDialog";
import EditEmployeeDialog from "../features/User/EditEmployeeDialog";
import { grey } from "@mui/material/colors";
import type { InviteUserInput } from "../schemas/inviteUserSchema";
import { Role } from "../types/Role";
import InviteUserDialog from "../features/User/InviteUserDialog";

const EmployeeManagement = () => {
  // Get current user information (mocked)
  const user = useCurrentUser();

  // Fetch employees data using the mocked RTK Query hook
  const { data: employees = [], isLoading, error, refetch } = useGetEmployeesByOrganizationQuery(user.organization_id);

  // State for search and filter inputs
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Dialog states
  const [showInviteUserDialog, setShowInviteUserDialog] = useState(false); // Changed from showEmployeeDialog
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
    // setSelectedEmployee(null); // No longer needed as InviteUserDialog is only for adding
    setShowInviteUserDialog(true); // Changed to showInviteUserDialog
  };

  const handleEditEmployee = (employee: User) => {
    // This functionality is currently removed as EmployeeDialog is now InviteUserDialog
    // If editing is still desired, a separate dialog/component would be needed.
    setSelectedEmployee(employee);
    // setShowEmployeeDialog(true); // This would open the old dialog
    console.warn("Edit employee functionality is currently not implemented with the new InviteUserForm.");
  };

  const handleDeleteEmployee = (employee: User) => {
    setSelectedEmployee(employee);
    setShowDeleteDialog(true);
  };

  // Handler for inviting a new employee (replaces old handleSaveEmployee for adding)
  const handleInviteNewEmployee = async (inviteData: InviteUserInput) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...inviteData,
        manager_id: inviteData.role === Role.EMPLOYEE ? inviteData.teamLeadId : user._id,
        organization_id: user.organization_id,
      };
      // Call the mock inviteUser mutation
      // await useInviteUserMutation()[0](payload);
      refetch(); // Refetch data after successful invitation
      setShowInviteUserDialog(false);
    } catch (err) {
      console.error("Error inviting employee:", err);
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
      // await mockDeleteEmployee(employee._id);
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
      <InviteUserDialog // Changed to InviteUserDialog
        open={showInviteUserDialog} // Changed state variable
        onClose={() => setShowInviteUserDialog(false)} // Changed state variable
        onSave={handleInviteNewEmployee} // New handler for inviting
        isLoading={isSubmitting}
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
