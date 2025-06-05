import React from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Users,
  Target,
  Award,
  Calendar,
  Shield,
  UserCheck,
  Eye,
} from 'lucide-react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
} from '@mui/material';
import { useGetOrganizationByUserIdQuery } from '../features/organizations/organizationsApi';
import useCurrentUser from '../hooks/useCurrentUser';

const OrganizationAbout = () => {
  const user = useCurrentUser();
  const { data: organization, isLoading, error } = useGetOrganizationByUserIdQuery(user._id);

  const roleCards = [
    {
      title: 'Manager',
      icon: Shield,
      color: '#06b6d4', // cyan-500
      features: [
        'Comprehensive project management',
        'Add team leaders',
        'Assign tasks to projects',
        'Full progress tracking',
        'Generate performance reports',
      ],
    },
    {
      title: 'Team Leader',
      icon: UserCheck,
      color: '#f97316', // orange-500
      features: [
        'Manage team members',
        'Assign tasks to team',
        'Track task execution',
        'Report progress to manager',
        'Manage schedules',
      ],
    },
    {
      title: 'Employee',
      icon: Eye,
      color: '#eab308', // yellow-500
      features: [
        'View personal tasks',
        'Update task status',
        'Add task notes',
        'Mark tasks as complete',
        'Track schedules',
      ],
    },
  ];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error || !organization) return <Typography>Error loading organization data.</Typography>;

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Avatar sx={{ bgcolor: 'grey.100', width: 64, height: 64, mx: 'auto', mb: 2 }}>
            <Building2 size={32} color="#4b5563" />
          </Avatar>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {organization.organization_name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {organization.organization_description}
          </Typography>
        </Container>
      </Box>

      {/* Role Cards */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Designed for Every Role
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" mb={6}>
          A flexible system that provides custom permissions for each user
        </Typography>

        <Grid container spacing={4}>
          {roleCards.map((role, index) => {
            const Icon = role.icon;
            return (
              <Grid item xs={12} md={4} key={index}>
                <Paper elevation={1} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                  <Box sx={{ height: 8, bgcolor: role.color }} />
                  <Box sx={{ p: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: role.color,
                        width: 48,
                        height: 48,
                        mb: 2,
                      }}
                    >
                      <Icon size={20} color="#fff" />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {role.title}
                    </Typography>
                    <List dense>
                      {role.features.map((feature, i) => (
                        <ListItem key={i} disableGutters sx={{ pl: 0 }}>
                          <ListItemIcon sx={{ minWidth: 20 }}>
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: 'grey.500',
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText primary={feature} primaryTypographyProps={{ variant: 'body2' }} />
                        </ListItem>
                      ))}
                    </List>
                    <Button variant="text" size="small" sx={{ mt: 2, color: role.color }}>
                      Learn More →
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Contact Info */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              We’re ready to hear from you and help you achieve your goals. Get in touch today!
            </Typography>

            <Box display="flex" alignItems="center" mb={3}>
              <Avatar sx={{ bgcolor: '#06b6d4', width: 40, height: 40, mr: 2 }}>
                <MapPin size={20} color="#fff" />
              </Avatar>
              <Box>
                <Typography fontWeight="bold">Address</Typography>
                <Typography color="text.secondary">{organization.organization_address}</Typography>
              </Box>
            </Box>

            <Box display="flex" alignItems="center">
              <Avatar sx={{ bgcolor: '#f97316', width: 40, height: 40, mr: 2 }}>
                <Phone size={20} color="#fff" />
              </Avatar>
              <Box>
                <Typography fontWeight="bold">Phone</Typography>
                <Typography color="text.secondary">{organization.organization_phone}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OrganizationAbout;
