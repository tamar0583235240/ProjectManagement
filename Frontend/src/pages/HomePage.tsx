// // import React, { useState, useEffect } from 'react';
// // import {
// //   Box,
// //   Container,
// //   AppBar,
// //   Toolbar,
// //   Typography,
// //   IconButton,
// //   Badge,
// //   useTheme,
// //   alpha,
// //   Grid,
// //   Paper,
// //   Fade,
// //   LinearProgress
// // } from '@mui/material';
// // import {
// //   Dashboard as DashboardIcon,
// //   Notifications,
// //   Settings,
// //   Business
// // } from '@mui/icons-material';

// // import { useSelector } from 'react-redux';
// import useLoadProjectsOnInit from '../hooks/useLoadProjectsOnInit';
// import { selectCurrentManagerId } from '../features/auth/userSlice';
// import type { RootState } from '../app/store';
// import useCurrentUser from '../hooks/useCurrentUser';
// import { useGetTasksByProjectQuery } from '../features/Tasks/tasksApi';
// import { Status } from '../types/Status';
// import TasksList from '../components/TasksList';
// import ProjectsList from '../components/ProjectsList';
// import StatsCards from '../components/StatsCards';
// import UserInfo from '../components/UserInfo';

// // const HomePage = () => {
// //   const theme = useTheme();
// //   const [mounted, setMounted] = useState(false);

// //   useLoadProjectsOnInit();

// //   const currentManagerId = useSelector(selectCurrentManagerId);
// //   const projects = useSelector((state: RootState) => state.projects.projects);
// //   const isProjectsLoading = useSelector((state: RootState) => state.projects.isLoading);
// //   const projectsError = useSelector((state: RootState) => state.projects.error);

// //   const user = useCurrentUser();

// //   const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

// //   useEffect(() => {
// //     if (projects.length > 0 && !selectedProjectId) {
// //       setSelectedProjectId(projects[0]._id);
// //     }
// //   }, [projects, selectedProjectId]);

// //   const { data: tasks = [], isLoading: isTasksLoading, isError: tasksError } = useGetTasksByProjectQuery(selectedProjectId || '');

// //   useEffect(() => {
// //     setMounted(true);
// //   }, []);

// //   const stats = {
// //     totalProjects: projects.length,
// //     activeProjects: projects.filter(p => p.status === Status.IN_PROGRESS).length,
// //     completedProjects: projects.filter(p => p.status === Status.COMPLETED).length,
// //     avgProgress: projects.length > 0 ? Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length) : 0,
// //   };

// //   return (
// //     <Box sx={{
// //       minHeight: '100vh',
// //       background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 50%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
// //       position: 'relative',
// //       '&::before': {
// //         content: '""',
// //         position: 'absolute',
// //         top: 0, left: 0, right: 0, bottom: 0,
// //         background: 'radial-gradient(circle at 20% 30%, rgba(25, 118, 210, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(156, 39, 176, 0.1) 0%, transparent 50%)',
// //         pointerEvents: 'none'
// //       }
// //     }}>
// //       <AppBar position="static" elevation={0}
// //         sx={{
// //           background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.95)} 0%, ${alpha(theme.palette.secondary.main, 0.95)} 100%)`,
// //           backdropFilter: 'blur(20px)',
// //           borderBottom: `1px solid ${alpha('#fff', 0.1)}`
// //         }}
// //       >
// //         <Toolbar sx={{ py: 1 }}>
// //           <DashboardIcon sx={{ mr: 2, fontSize: 28 }} />
// //           <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
// //             Project Dashboard
// //           </Typography>
// //           <IconButton color="inherit" sx={{ mr: 1 }}>
// //             <Badge badgeContent={3} color="error">
// //               <Notifications />
// //             </Badge>
// //           </IconButton>
// //           <IconButton color="inherit">
// //             <Settings />
// //           </IconButton>
// //         </Toolbar>
// //       </AppBar>

// //       <Container maxWidth="xl" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
// //         <Fade in={mounted} timeout={1000}>
// //           <Paper
// //             elevation={0}
// //             sx={{
// //               p: 3,
// //               mb: 4,
// //               background: `linear-gradient(135deg, ${alpha('#fff', 0.9)} 0%, ${alpha('#fff', 0.7)} 100%)`,
// //               backdropFilter: 'blur(20px)',
// //               border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
// //               borderRadius: 3
// //             }}
// //           >
// //             <UserInfo user={user} />
// //           </Paper>
// //         </Fade>

// //         <StatsCards stats={stats} />

// //         <ProjectsList
// //           projects={projects}
// //           isLoading={isProjectsLoading}
// //           error={projectsError}
// //           selectedProjectId={selectedProjectId}
// //           onSelectProject={setSelectedProjectId}
// //         />

// //         {selectedProjectId && (
// //           <TasksList
// //             projectName={projects.find(p => p.id === selectedProjectId)?.name || ''}
// //             tasks={tasks}
// //             isLoading={isTasksLoading}
// //             error={tasksError}
// //           />
// //         )}
// //       </Container>
// //     </Box>
// //   );
// // };

// // export default HomePage;

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
//   Paper,
//   Fade,
// } from '@mui/material';
// import {
//   Dashboard as DashboardIcon,
//   Notifications,
//   Settings,
// } from '@mui/icons-material';

// import { useSelector } from 'react-redux';
// // import { RootState } from '../store'; 
// // import { useLoadProjectsOnInit, selectCurrentManagerId } from '../features/projects/projectsSlice'; 
// // import { useGetTasksByProjectQuery } from '../features/tasks/tasksApi'; 
// // import { useCurrentUser } from '../features/auth/hooks';

// // import UserInfo from './UserInfo';
// // import StatsCards from './StatsCards';
// // import ProjectsList from './ProjectsList';
// // import TasksList from './TasksList';

// const HomePage= () => {
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

import React, { useState } from 'react';
import { Calendar, Clock, User, Grid, List, BarChart3, Plus, Edit, Trash2, MoreHorizontal, Building2, Mail, Phone, MapPin } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { useGetOrganizationByUserIdQuery } from '../features/organizations/organizationsApi';
import useCurrentUser from '../hooks/useCurrentUser';

// Status enum simulation
const Status = {
  NOT_STARTED: 'Not Started',
  IN_PROGRESS: 'In Progress', 
  COMPLETED: 'Completed',
  DELAYED: 'Delayed'
};

const HomePage = () => {
  const [viewMode, setViewMode] = useState('grid');
    const user = useCurrentUser();

   const projects = useSelector((state: RootState) => state.projects.projects);
  const isProjectsLoading = useSelector((state: RootState) => state.projects.isLoading);
  const projectsError = useSelector((state: RootState) => state.projects.error);

  const totalProjects = projects.length;
  const inProgressProjects = projects.filter(p => p.status === Status.IN_PROGRESS).length;
  const completedProjects = projects.filter(p => p.status === Status.COMPLETED).length;
  const delayedProjects = projects.filter(p => p.status === Status.DELAYED).length;

  const organization= useGetOrganizationByUserIdQuery(user._id);

  const getStatusColor = (status) => {
    switch (status) {
      case Status.COMPLETED:
        return 'bg-green-500 text-white';
      case Status.IN_PROGRESS:
        return 'bg-yellow-500 text-white';
      case Status.DELAYED:
        return 'bg-red-500 text-white';
      case Status.NOT_STARTED:
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-300 text-gray-700';
    }
  };

  const calculateDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} days overdue`;
    }
    return `${diffDays} days remaining`;
  };

  const StatCard = ({ title, value, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
      <div className="text-3xl font-bold" style={{ color }}>
        {value}
      </div>
    </div>
  );

  const ProjectCard = ({ project }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {project.project_name}
        </h3>
        <div className="relative group">
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal size={20} />
          </button>
          <div className="absolute right-0 top-8 bg-white shadow-lg rounded-md py-2 px-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 mb-1">
              <Edit size={14} />
              Edit
            </button>
            <button className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700">
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      </div>
      
      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${getStatusColor(project.status)}`}>
        {project.status}
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={14} className="mr-2" />
          Deadline: {new Date(project.deadline).toLocaleDateString()}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={14} className="mr-2" />
          {calculateDaysRemaining(project.deadline)}
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress:</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  const TableView = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Project Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deadline
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Days Remaining
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => (
            <tr key={project._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {project.project_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(project.deadline).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {calculateDaysRemaining(project.deadline)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-cyan-600 hover:text-cyan-900 mr-2">
                  <Edit size={16} />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const ListView = () => (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {project.project_name}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <button className="text-cyan-600 hover:text-cyan-900">
                <Edit size={16} />
              </button>
              <button className="text-red-600 hover:text-red-900">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {new Date(project.deadline).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              {calculateDaysRemaining(project.deadline)}
            </div>
            <div className="text-sm text-gray-600">
              Progress: {project.progress}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Organization Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="bg-cyan-100 p-3 rounded-lg">
            <Building2 size={32} className="text-cyan-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{organization.organization_name}</h2>
            <p className="text-gray-600 mb-4">{organization.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-gray-400" />
                {organization.organization_address}
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2 text-gray-400" />
                {organization.organization_phone}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <User size={32} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{mockUser.user_name}</h3>
            <p className="text-gray-600">{mockUser.role}</p>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Mail size={14} className="mr-2" />
              {mockUser.email}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Projects" value={totalProjects} color="#06b6d4" />
        <StatCard title="In Progress" value={inProgressProjects} color="#eab308" />
        <StatCard title="Completed" value={completedProjects} color="#22c55e" />
        <StatCard title="Delayed" value={delayedProjects} color="#ef4444" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Projects by Status</h3>
          <div className="flex justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3"
                  strokeDasharray={`${(completedProjects/totalProjects) * 100}, 100`}
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eab308"
                  strokeWidth="3"
                  strokeDasharray={`${(inProgressProjects/totalProjects) * 100}, 100`}
                  strokeDashoffset={`-${(completedProjects/totalProjects) * 100}`}
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeDasharray={`${(delayedProjects/totalProjects) * 100}, 100`}
                  strokeDashoffset={`-${((completedProjects + inProgressProjects)/totalProjects) * 100}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{totalProjects}</div>
                  <div className="text-sm text-gray-500">Projects</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">Completed</span>
              </div>
              <span className="text-sm font-medium">{completedProjects}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm">In Progress</span>
              </div>
              <span className="text-sm font-medium">{inProgressProjects}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm">Delayed</span>
              </div>
              <span className="text-sm font-medium">{delayedProjects}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Projects by Deadline Month</h3>
          <div className="flex items-end justify-center space-x-4 h-40">
            <div className="flex flex-col items-center">
              <div className="w-12 bg-cyan-500 mb-2 rounded-t" style={{ height: '80px' }}></div>
              <span className="text-xs text-gray-500">Apr</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 bg-cyan-500 mb-2 rounded-t" style={{ height: '40px' }}></div>
              <span className="text-xs text-gray-500">Jun</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 bg-cyan-500 mb-2 rounded-t" style={{ height: '60px' }}></div>
              <span className="text-xs text-gray-500">Jul</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 bg-cyan-500 mb-2 rounded-t" style={{ height: '80px' }}></div>
              <span className="text-xs text-gray-500">Sep</span>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex justify-start mb-6">
        <div className="bg-white rounded-lg shadow-sm p-1 flex">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-colors ${
              viewMode === 'grid'
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Grid size={18} />
            <span>GRID VIEW</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-colors ${
              viewMode === 'table'
                ? 'bg-cyan-100 text-cyan-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <BarChart3 size={18} />
            <span>TABLE VIEW</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-colors ${
              viewMode === 'list'
                ? 'bg-cyan-100 text-cyan-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <List size={18} />
            <span>LIST VIEW</span>
          </button>
        </div>
      </div>

      {/* Projects Display */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}

      {viewMode === 'table' && <TableView />}
      
      {viewMode === 'list' && <ListView />}
    </div>
  );
};

export default HomePage;