// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Container,
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Badge,
//   useTheme,
//   alpha,
//   Grid,
//   Paper,
//   Fade,
//   LinearProgress
// } from '@mui/material';
// import {
//   Dashboard as DashboardIcon,
//   Notifications,
//   Settings,
//   Business
// } from '@mui/icons-material';

// import { useSelector } from 'react-redux';
import useLoadProjectsOnInit from '../hooks/useLoadProjectsOnInit';
import { selectCurrentManagerId } from '../features/auth/userSlice';
import type { RootState } from '../app/store';
import useCurrentUser from '../hooks/useCurrentUser';
import { useGetTasksByProjectQuery } from '../features/Tasks/tasksApi';
import { Status } from '../types/Status';
import TasksList from '../components/TasksList';
import ProjectsList from '../components/ProjectsList';
import StatsCards from '../components/StatsCards';
import UserInfo from '../components/UserInfo';

// const HomePage = () => {
//   const theme = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useLoadProjectsOnInit();

//   const currentManagerId = useSelector(selectCurrentManagerId);
//   const projects = useSelector((state: RootState) => state.projects.projects);
//   const isProjectsLoading = useSelector((state: RootState) => state.projects.isLoading);
//   const projectsError = useSelector((state: RootState) => state.projects.error);

//   const user = useCurrentUser();

//   const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

//   useEffect(() => {
//     if (projects.length > 0 && !selectedProjectId) {
//       setSelectedProjectId(projects[0]._id);
//     }
//   }, [projects, selectedProjectId]);

//   const { data: tasks = [], isLoading: isTasksLoading, isError: tasksError } = useGetTasksByProjectQuery(selectedProjectId || '');

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const stats = {
//     totalProjects: projects.length,
//     activeProjects: projects.filter(p => p.status === Status.IN_PROGRESS).length,
//     completedProjects: projects.filter(p => p.status === Status.COMPLETED).length,
//     avgProgress: projects.length > 0 ? Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length) : 0,
//   };

//   return (
//     <Box sx={{
//       minHeight: '100vh',
//       background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 50%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
//       position: 'relative',
//       '&::before': {
//         content: '""',
//         position: 'absolute',
//         top: 0, left: 0, right: 0, bottom: 0,
//         background: 'radial-gradient(circle at 20% 30%, rgba(25, 118, 210, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(156, 39, 176, 0.1) 0%, transparent 50%)',
//         pointerEvents: 'none'
//       }
//     }}>
//       <AppBar position="static" elevation={0}
//         sx={{
//           background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.95)} 0%, ${alpha(theme.palette.secondary.main, 0.95)} 100%)`,
//           backdropFilter: 'blur(20px)',
//           borderBottom: `1px solid ${alpha('#fff', 0.1)}`
//         }}
//       >
//         <Toolbar sx={{ py: 1 }}>
//           <DashboardIcon sx={{ mr: 2, fontSize: 28 }} />
//           <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
//             Project Dashboard
//           </Typography>
//           <IconButton color="inherit" sx={{ mr: 1 }}>
//             <Badge badgeContent={3} color="error">
//               <Notifications />
//             </Badge>
//           </IconButton>
//           <IconButton color="inherit">
//             <Settings />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="xl" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
//         <Fade in={mounted} timeout={1000}>
//           <Paper
//             elevation={0}
//             sx={{
//               p: 3,
//               mb: 4,
//               background: `linear-gradient(135deg, ${alpha('#fff', 0.9)} 0%, ${alpha('#fff', 0.7)} 100%)`,
//               backdropFilter: 'blur(20px)',
//               border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//               borderRadius: 3
//             }}
//           >
//             <UserInfo user={user} />
//           </Paper>
//         </Fade>

//         <StatsCards stats={stats} />

//         <ProjectsList
//           projects={projects}
//           isLoading={isProjectsLoading}
//           error={projectsError}
//           selectedProjectId={selectedProjectId}
//           onSelectProject={setSelectedProjectId}
//         />

//         {selectedProjectId && (
//           <TasksList
//             projectName={projects.find(p => p.id === selectedProjectId)?.name || ''}
//             tasks={tasks}
//             isLoading={isTasksLoading}
//             error={tasksError}
//           />
//         )}
//       </Container>
//     </Box>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  useTheme,
  alpha,
  Paper,
  Fade,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Notifications,
  Settings,
} from '@mui/icons-material';

import { useSelector } from 'react-redux';
// import { RootState } from '../store'; 
// import { useLoadProjectsOnInit, selectCurrentManagerId } from '../features/projects/projectsSlice'; 
// import { useGetTasksByProjectQuery } from '../features/tasks/tasksApi'; 
// import { useCurrentUser } from '../features/auth/hooks';

// import UserInfo from './UserInfo';
// import StatsCards from './StatsCards';
// import ProjectsList from './ProjectsList';
// import TasksList from './TasksList';

const HomePage= () => {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useLoadProjectsOnInit();

  const currentManagerId = useSelector(selectCurrentManagerId);
  const projects = useSelector((state: RootState) => state.projects.projects);
  const isProjectsLoading = useSelector((state: RootState) => state.projects.isLoading);
  const projectsError = useSelector((state: RootState) => state.projects.error);

  const user = useCurrentUser();

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    if (projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  const { data: tasks = [], isLoading: isTasksLoading, isError: tasksError } = useGetTasksByProjectQuery(selectedProjectId || '');

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === Status.IN_PROGRESS).length,
    completedProjects: projects.filter(p => p.status === Status.COMPLETED).length,
    avgProgress: projects.length > 0 ? Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length) : 0,
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 50%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(circle at 20% 30%, rgba(25, 118, 210, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(156, 39, 176, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }
    }}>
      <AppBar position="static" elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.95)} 0%, ${alpha(theme.palette.secondary.main, 0.95)} 100%)`,
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${alpha('#fff', 0.1)}`
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <DashboardIcon sx={{ mr: 2, fontSize: 28 }} />
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Project Dashboard
          </Typography>
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Settings />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <Fade in={mounted} timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              background: `linear-gradient(135deg, ${alpha('#fff', 0.9)} 0%, ${alpha('#fff', 0.7)} 100%)`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              borderRadius: 3
            }}
          >
            <UserInfo user={user} />
          </Paper>
        </Fade>

        <StatsCards stats={stats} />

        <ProjectsList
          projects={projects}
          isLoading={isProjectsLoading}
          error={projectsError}
          selectedProjectId={selectedProjectId}
          onSelectProject={setSelectedProjectId}
        />

        {selectedProjectId && (
          <TasksList
            projectName={projects.find(p => p.id === selectedProjectId)?.name || ''}
            tasks={tasks}
            isLoading={isTasksLoading}
            error={tasksError}
          />
        )}
      </Container>
    </Box>
  );
};

export default HomePage;

