import { Add, People } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Grid, Paper, Skeleton, Typography } from "@mui/material";
import EmployeeCard from "./EmployeeCard";

const EmployeeGrid = ({ filteredEmployees, isLoading, employees, handleEditEmployee, handleDeleteEmployee, handleAddEmployee }: { filteredEmployees: User[], isLoading: boolean, employees: User[], handleEditEmployee: (employee: User) => void, handleDeleteEmployee: (employee: User) => void, handleAddEmployee: () => void }) => (
  <>
    {isLoading ? (
      <Grid container spacing={3}>
        {[...Array(6)].map((_, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card sx={{ height: 280, borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Skeleton variant="circular" width={48} height={48} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} />
                    <Skeleton variant="text" width="60%" />
                  </Box>
                </Box>
                <Skeleton variant="text" sx={{ mb: 1 }} />
                <Skeleton variant="text" width="80%" sx={{ mb: 1 }} />
                <Skeleton variant="text" width="70%" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    ) : filteredEmployees.length === 0 ? (
      <Paper sx={{ textAlign: "center", py: 8, background: "white", boxShadow: 3, borderRadius: 2 }}>
        <People sx={{ fontSize: 64, color: grey[400], mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          No employees to display
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {employees.length === 0 ? "Start by adding your first employee." : "No employees match your current search or filter criteria."}
        </Typography>
        {employees.length === 0 && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddEmployee}
            sx={{
              background: "linear-gradient(135deg, #00BCD4 0%, #26C6DA 100%)", // Teal gradient
              boxShadow: 3,
              px: 3,
              py: 1.5,
              borderRadius: 1.5,
              "&:hover": {
                background: "linear-gradient(135deg, #0097A7 0%, #00ACC1 100%)",
                boxShadow: 6,
              },
            }}
          >
            Add First Employee
          </Button>
        )}
      </Paper>
    ) : (
      <Grid container spacing={3}>
        {filteredEmployees.map((employee) => (
          <Grid item xs={12} sm={6} md={4} key={employee._id}>
            <EmployeeCard
              employee={employee}
              onEdit={handleEditEmployee}
              onDelete={handleDeleteEmployee}
              allEmployees={employees} // Pass all employees for manager lookup (though not used in current User interface)
            />
          </Grid>
        ))}
      </Grid>
    )}
  </>
);