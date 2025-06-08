import { useMemo, useState } from "react";
import {
  useDeleteUserMutation,
  useGetEmployeesByOrganizationQuery,
  useUpdateUserMutation,
} from "../features/User/userApi";
import useCurrentUser from "../hooks/useCurrentUser";
import type { User } from "../types/User";
import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import EmployeeStatsCards from "../features/User/EmployeeStatsCards";
import EmployeeGrid from "../features/User/EmployeeGrid";
import DeleteEmployeeDialog from "../features/User/DeleteEmployeeDialog";
import { grey } from "@mui/material/colors";
import type { InviteUserInput } from "../schemas/inviteUserSchema";
import InviteUserDialog from "../features/User/InviteUserDialog";
import EditEmployeeDialog from "../features/User/EditEmployeeDialog";

const EmployeeManagement = () => {
  const user = useCurrentUser();

  const {
    data: employees = [],
    isLoading,
    error,
    refetch,
  } = useGetEmployeesByOrganizationQuery(user.organization_id);

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [showInviteUserDialog, setShowInviteUserDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

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

  const stats = useMemo(
    () => ({
      total: employees.length,
      managers: employees.filter((emp) => emp.role === "MANAGER").length,
      teamLeaders: employees.filter((emp) => emp.role === "TEAMLEADER").length,
      employees: employees.filter((emp) => emp.role === "EMPLOYEE").length,
    }),
    [employees]
  );

  const handleAddEmployee = () => {
    setShowInviteUserDialog(true);
  };

  const handleEditEmployee = (employee: User) => {
    setSelectedEmployee(employee);
    setShowEditDialog(true);
  };

  const handleDeleteEmployee = (employee: User) => {
    setSelectedEmployee(employee);
    setShowDeleteDialog(true);
  }
  const handleInviteNewEmployee = (inviteData: InviteUserInput) => {
    refetch(); 
    setShowInviteUserDialog(false); 
  };

  const handleConfirmDelete = async (employee: User) => {
    if (!employee._id) return;

    if (employee._id === user._id) {
      setShowDeleteDialog(false);
      setErrorSnackbarOpen(true);
      return;
    }

    setIsSubmitting(true); 
    try {
      await deleteUser(employee._id).unwrap();
      refetch();
      setShowDeleteDialog(false);
    } catch (err) {
      console.error("Error deleting employee:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveEdit = async (updatedData: Partial<User>) => {
    if (!selectedEmployee?._id) return;

    setIsSubmitting(true); 
    try {
      await updateUser({ userId: selectedEmployee._id, data: updatedData }).unwrap();
      refetch();
      setShowEditDialog(false);
      setSelectedEmployee(null); 
    } catch (err) {
      console.error("Error updating employee:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={refetch}
              sx={{ borderRadius: 1.5 }}
            >
              Retry
            </Button>
          }
          sx={{ borderRadius: 2 }}
        >
          Failed to load employee data.
        </Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F5F7FA 0%, #E0E6EE 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="xl">
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
              <Typography
                variant="h3"
                component="h1"
                sx={{ fontWeight: 700, color: grey[900], mb: 1 }}
              >
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
                background: "linear-gradient(135deg, #00BCD4 0%, #26C6DA 100%)",
                boxShadow: 3,
                px: 3,
                py: 1.5,
                borderRadius: 2,
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #0097A7 0%, #00ACC1 100%)",
                  boxShadow: 6,
                },
              }}
            >
              Add New Employee
            </Button>
          </Box>
        </Box>

        <EmployeeStatsCards stats={stats} />

        <EmployeeGrid
          filteredEmployees={filteredEmployees}
          isLoading={isLoading}
          employees={employees}
          handleEditEmployee={handleEditEmployee}
          handleDeleteEmployee={handleDeleteEmployee}
          handleAddEmployee={handleAddEmployee}
        />
      </Container>

      <InviteUserDialog
        open={showInviteUserDialog}
        onClose={() => setShowInviteUserDialog(false)}
        onSave={handleInviteNewEmployee}
        isLoading={isSubmitting} 
      />

      <DeleteEmployeeDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        employee={selectedEmployee}
        onConfirm={handleConfirmDelete}
        isLoading={isSubmitting}
      />

      <EditEmployeeDialog
        open={showEditDialog}
        onClose={() => {
          setShowEditDialog(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
        onSave={handleSaveEdit}
        isLoading={isSubmitting}
      />

      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={4000}
        onClose={() => setErrorSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="error"
          onClose={() => setErrorSnackbarOpen(false)}
          sx={{ width: "100%" }}
        >
          You cannot delete your own account.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployeeManagement;
