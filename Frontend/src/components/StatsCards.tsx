import React from 'react';
import { Grid, Card, CardContent, Typography, LinearProgress } from '@mui/material';

interface Stats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  avgProgress: number;
}

interface StatsCardsProps {
  stats: Stats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => (
  <Grid container spacing={3} sx={{ mb: 4 }}>
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">Total Projects</Typography>
          <Typography variant="h5">{stats.totalProjects}</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">Active Projects</Typography>
          <Typography variant="h5">{stats.activeProjects}</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">Completed Projects</Typography>
          <Typography variant="h5">{stats.completedProjects}</Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">Average Progress</Typography>
          <Typography variant="h5">{stats.avgProgress}%</Typography>
          <LinearProgress variant="determinate" value={stats.avgProgress} sx={{ mt: 1 }} />
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default StatsCards;
