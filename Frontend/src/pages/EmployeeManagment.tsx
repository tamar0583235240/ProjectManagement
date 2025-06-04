import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
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

const EmployeeManagement = () => {
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
            <Typography>Loading...</Typography>
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

export default EmployeeManagement;
