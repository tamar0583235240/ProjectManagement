import React from 'react';
import { Box, Typography, Avatar, Grid } from '@mui/material';
import { Business } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface UserInfoProps {
  user: {
    username?: string;
    role?: string;
    email?: string;
    organizationName?: string;
    industry?: string;
  } | null;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const theme = useTheme();
  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={6}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mr: 3,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              fontSize: '2rem',
              fontWeight: 700
            }}
          >
            {user?.username ? user.username.split(' ').map(n => n[0]).join('') : 'NA'}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              {user?.username || 'Unknown User'}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
              {user?.role || 'No Role'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email || ''}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
          <Business sx={{ mr: 2, fontSize: 32, color: theme.palette.primary.main }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {user?.organizationName || 'Organization Name'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.industry || 'Industry'}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserInfo;
