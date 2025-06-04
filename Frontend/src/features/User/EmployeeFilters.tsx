import { FilterList, Search } from "@mui/icons-material";
import { Box, Chip, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";

const EmployeeFilters = ({ searchTerm, setSearchTerm, roleFilter, setRoleFilter }: { searchTerm: string, setSearchTerm: (term: string) => void, roleFilter: string, setRoleFilter: (role: string) => void }) => (
  <Paper sx={{ p: { xs: 2, md: 3 }, mb: 4, background: "white", boxShadow: 3, borderRadius: 2 }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
      <FilterList sx={{ color: grey[600], fontSize: 28 }} />
      <Typography variant="h6" sx={{ fontWeight: 600, color: grey[900] }}>
        Filter & Search
      </Typography>
    </Box>

    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          placeholder="Search employees by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: grey[600] }} />
              </InputAdornment>
            ),
          }}
          sx={{ backgroundColor: "white", '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth sx={{ backgroundColor: "white", '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}>
          <InputLabel>All Roles</InputLabel>
          <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} label="All Roles">
            <MenuItem value="all">All Roles</MenuItem>
            <MenuItem value="EMPLOYEE">Employee</MenuItem>
            <MenuItem value="MANAGER">Manager</MenuItem>
            <MenuItem value="TEAMLEADER">Team Leader</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>

    {(searchTerm || roleFilter !== "all") && (
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mt: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          Active filters:
        </Typography>
        {searchTerm && (
          <Chip
            label={`Search: "${searchTerm}"`}
            size="small"
            variant="outlined"
            onDelete={() => setSearchTerm("")}
            sx={{ borderRadius: 1.5 }}
          />
        )}
        {roleFilter !== "all" && (
          <Chip
            label={`Role: ${roleLabels[roleFilter as keyof typeof roleLabels] || roleFilter}`}
            size="small"
            variant="outlined"
            onDelete={() => setRoleFilter("all")}
            sx={{ borderRadius: 1.5 }}
          />
        )}
      </Box>
    )}
  </Paper>
);
