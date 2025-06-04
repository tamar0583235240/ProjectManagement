// import React from 'react'
// import { Outlet } from 'react-router'

// const EmployeeManagment = () => {
//   return (
//     <div>
//       <h1>Employee Managment</h1>
//       <Outlet />
//     </div>
//   )
// }

// export default EmployeeManagment
import React from 'react';
import {
  Grid,
  IconButton,
  Typography,
  Card,
  CardContent,
  CardActions,
  Tooltip,
  Box,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import { Add, Edit, Delete, MoreVert } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import useCurrentUser from '../hooks/useCurrentUser';
import { useGetEmployeesByOrganizationQuery } from '../features/User/userApi';

const EmployeeManagement: React.FC = () => {
  const user = useCurrentUser();
  const { data: employees = [], isLoading, isError } = useGetEmployeesByOrganizationQuery(user?.organization_id);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedEmployee, setSelectedEmployee] = React.useState<any>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, employee: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEmployee(null);
  };

  const handleEdit = () => {
    console.log('Edit', selectedEmployee);
    handleMenuClose();
    // TODO: Open edit dialog
  };

  const handleDelete = () => {
    console.log('Delete', selectedEmployee);
    handleMenuClose();
    // TODO: Trigger delete mutation
  };

  const handleAdd = () => {
    console.log('Add new employee');
    // TODO: Open add dialog
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Employee Management</Typography>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={handleAdd}
        >
          Add Employee
        </Button>
      </Box>

      {isLoading ? (
        <Typography>Loading employees...</Typography>
      ) : isError ? (
        <Typography color="error">Failed to load employees.</Typography>
      ) : (
        <Grid container spacing={3}>
          {employees.map((employee) => (
            <Grid item xs={12} sm={6} md={4} key={employee._id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  '&:hover': { boxShadow: 4 },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">{employee.user_name}</Typography>
                    <IconButton onClick={(e) => handleMenuOpen(e, employee)}>
                      <MoreVert />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary">{employee.email}</Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Role: {employee.role}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', px: 2 }}>
                  <Tooltip title="Edit">
                    <IconButton onClick={handleEdit}><Edit /></IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={handleDelete}><Delete /></IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Menu for more actions */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default EmployeeManagement;
