import React, { useState } from 'react';
import {
  Box, Container, Grid, Paper, Typography,
  Tabs, Tab, Button, IconButton, Menu, MenuItem,
  Chip, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Divider
} from '@mui/material';
import {
  CalendarToday, AccessTime, MoreHoriz, Edit, Delete,
  Apartment, Person, Email, Phone, Place
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { useGetOrganizationByUserIdQuery } from '../features/organizations/organizationsApi';
import useCurrentUser from '../hooks/useCurrentUser';
import useLoadProjectsOnInit from '../hooks/useLoadProjectsOnInit';

const Status = {
  NOT_STARTED: 'Not Started',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  DELAYED: 'Delayed'
};

function getStatusColor(status: string): 'default' | 'primary' | 'success' | 'warning' | 'error' {
  switch (status) {
    case Status.COMPLETED: return 'success';
    case Status.IN_PROGRESS: return 'warning';
    case Status.DELAYED: return 'error';
    case Status.NOT_STARTED: return 'default';
    default: return 'default';
  }
}

const calculateDaysRemaining = (deadline: string) => {
  const diffTime = new Date(deadline).getTime() - Date.now();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays < 0
    ? `${Math.abs(diffDays)} days overdue`
    : `${diffDays} days remaining`;
};

const StatCard = ({ title, value, color }: { title: string; value: number; color: string }) => (
  <Paper elevation={2} sx={{ borderLeft: `4px solid ${color}`, p: 2 }}>
    <Typography variant="caption" color="textSecondary">{title}</Typography>
    <Typography variant="h4" color={color}>{value}</Typography>
  </Paper>
);

const ProjectCard = ({ project }: { project: any }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  return (
    <Paper elevation={2} sx={{ p: 2, position: 'relative' }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{project.project_name}</Typography>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreHoriz />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem><Edit fontSize="small" sx={{ mr: 1 }} />Edit</MenuItem>
          <MenuItem><Delete fontSize="small" sx={{ mr: 1 }} color="error" />Delete</MenuItem>
        </Menu>
      </Grid>
      <Chip label={project.status} color={getStatusColor(project.status)} sx={{ mt: 1 }} />
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={6} display="flex" alignItems="center">
            <CalendarToday fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">
              Deadline: {new Date(project.deadline).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={6} display="flex" alignItems="center">
            <AccessTime fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">{calculateDaysRemaining(project.deadline)}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Grid container justifyContent="space-between">
          <Typography variant="body2">Progress: {project.progress}%</Typography>
          <Typography variant="body2">{project.progress}%</Typography>
        </Grid>
        <Box sx={{ bgcolor: 'grey.200', borderRadius: 1, height: 8, mt: 1 }}>
          <Box sx={{ width: `${project.progress}%`, bgcolor: 'primary.main', height: '100%', borderRadius: 1 }} />
        </Box>
      </Box>
    </Paper>
  );
};

const HomePage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'table' | 'list'>('grid');
  const user = useCurrentUser();
  const projects = useSelector((s: RootState) => s.projects.projects);
  const { data: organization, isLoading: orgLoading } = useGetOrganizationByUserIdQuery(user._id);
    useLoadProjectsOnInit();
  
  if (orgLoading) return <Typography>Loading...</Typography>;

  const totalProjects = projects.length;
  const inProgressProjects = projects.filter(p => p.status === Status.IN_PROGRESS).length;
  const completedProjects = projects.filter(p => p.status === Status.COMPLETED).length;
  const delayedProjects = projects.filter(p => p.status === Status.DELAYED).length;

  return (
    <Container maxWidth={false} sx={{ mt: '120px', py: 4 }}>
      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, display: 'flex', gap: 2 }}>
            <Apartment color="primary" fontSize="large" />
            <Box>
              <Typography variant="h6">{organization.organization_name}</Typography>
              <Typography color="textSecondary">{organization.description}</Typography>
              <Box display="flex" gap={2} mt={1}>
                <Box display="flex" alignItems="center"><Place fontSize="small" sx={{ mr: 0.5 }} />{organization.organization_address}</Box>
                <Box display="flex" alignItems="center"><Phone fontSize="small" sx={{ mr: 0.5 }} />{organization.organization_phone}</Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, display: 'flex', gap: 2 }}>
            <Person color="primary" fontSize="large" />
            <Box>
              <Typography variant="h6">{user.user_name}</Typography>
              <Typography color="textSecondary">{user.role}</Typography>
              <Box display="flex" gap={1} alignItems="center" mt={0.5}>
                <Email fontSize="small" /><Typography variant="body2">{user.email}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {[ 
          { title: 'Total Projects', value: totalProjects, color: '#06b6d4' },
          { title: 'In Progress', value: inProgressProjects, color: '#eab308' },
          { title: 'Completed', value: completedProjects, color: '#22c55e' },
          { title: 'Delayed', value: delayedProjects, color: '#ef4444' }
        ].map((stat) =>
          <Grid key={stat.title} item xs={12} sm={6} md={3}>
            <StatCard title={stat.title} value={stat.value} color={stat.color} />
          </Grid>
        )}
      </Grid>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={viewMode} onChange={(_, val) => setViewMode(val)}>
          <Tab label="Grid View" value="grid" />
          <Tab label="Table View" value="table" />
          <Tab label="List View" value="list" />
        </Tabs>
      </Box>

      {viewMode === 'grid' && (
        <Grid container spacing={2}>
          {projects.map(p => <Grid key={p._id} item xs={12} sm={6} md={4}><ProjectCard project={p} /></Grid>)}
        </Grid>
      )}

      {viewMode === 'table' && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {['Name', 'Status', 'Deadline', 'Days Remaining', 'Actions'].map(h => (
                  <TableCell key={h}><Typography variant="subtitle2" color="textSecondary">{h}</Typography></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map(p => (
                <TableRow key={p._id} hover>
                  <TableCell>{p.project_name}</TableCell>
                  <TableCell><Chip label={p.status} color={getStatusColor(p.status)} size="small" /></TableCell>
                  <TableCell>{new Date(p.deadline).toLocaleDateString()}</TableCell>
                  <TableCell>{calculateDaysRemaining(p.deadline)}</TableCell>
                  <TableCell>
                    <IconButton size="small"><Edit /></IconButton>
                    <IconButton size="small" color="error"><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {viewMode === 'list' && (
        <Grid container spacing={2} direction="column">
          {projects.map(p => (
            <Grid key={p._id} item>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">{p.project_name}</Typography>
                  <Box>
                    <Chip label={p.status} color={getStatusColor(p.status)} size="small" sx={{ mr: 1 }} />
                    <IconButton size="small"><Edit /></IconButton>
                    <IconButton size="small" color="error"><Delete /></IconButton>
                  </Box>
                </Grid>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" gap={3}>
                  <Box display="flex" alignItems="center">
                    <CalendarToday fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">{new Date(p.deadline).toLocaleDateString()}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <AccessTime fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body2">{calculateDaysRemaining(p.deadline)}</Typography>
                  </Box>
                  <Typography variant="body2">Progress: {p.progress}%</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default HomePage;
