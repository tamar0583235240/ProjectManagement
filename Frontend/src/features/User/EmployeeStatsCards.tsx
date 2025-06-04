import { Group, People, Person, SupervisorAccount } from "@mui/icons-material";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

const EmployeeStatsCards = ({ stats }: { stats: { total: number, managers: number, teamLeaders: number, employees: number } }) => (
  <Grid container spacing={3} sx={{ mb: 4}}>
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          boxShadow: 3,
          borderRadius: 2,
          height: '100%',
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>
                Total Employees
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color:"rgb(0, 188, 212)" }}>
                {stats.total}
              </Typography>
            </Box>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 3,
                background: "linear-gradient(135deg, #00BCD4 0%, #26C6DA 100%)", // Teal gradient
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <People sx={{ color: "white", fontSize: 24 }} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          boxShadow: 3,
          borderRadius: 2,
          height: '100%',
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>
                Managers
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#D32F2F" }}> {/* Red for managers */}
                {stats.managers}
              </Typography>
            </Box>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 3,
                background: "linear-gradient(135deg, #D32F2F 0%, #EF5350 100%)", // Red gradient
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SupervisorAccount sx={{ color: "white", fontSize: 24 }} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          boxShadow: 3,
          borderRadius: 2,
          height: '100%',
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>
                Team Leaders
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#2E7D32" }}> {/* Green for team leaders */}
                {stats.teamLeaders}
              </Typography>
            </Box>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 3,
                background: "linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)", // Green gradient
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Group sx={{ color: "white", fontSize: 24 }} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          boxShadow: 3,
          borderRadius: 2,
          height: '100%',
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography color="text.secondary" variant="body2" sx={{ fontWeight: 500 }}>
                Employees
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#FFA000" }}> {/* Orange for employees */}
                {stats.employees}
              </Typography>
            </Box>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 3,
                background: "linear-gradient(135deg, #FFC107 0%, #FFD54F 100%)", // Orange/Yellow gradient
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Person sx={{ color: "white", fontSize: 24 }} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default EmployeeStatsCards;
