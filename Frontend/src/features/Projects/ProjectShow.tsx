// // import React, { useState } from 'react';
// // import { 
// //   Box, 
// //   Card, 
// //   CardContent, 
// //   Typography, 
// //   Grid, 
// //   Chip, 
// //   Avatar, 
// //   Container, 
// //   Paper, 
// //   Tabs, 
// //   Tab, 
// //   IconButton,
// //   Button,
// //   Divider,
// //   LinearProgress,
// //   useTheme,
// //   alpha
// // } from '@mui/material';
// // import { 
// //   MoreVert as MoreVertIcon,
// //   CalendarToday as CalendarIcon,
// //   AccessTime as TimeIcon,
// //   Person as PersonIcon,
// //   Add as AddIcon,
// //   FilterList as FilterListIcon
// // } from '@mui/icons-material';
// // import { DataGrid, type GridColDef } from '@mui/x-data-grid';
// // import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// // // Types definitions based on the provided MongoDB schema
// // interface Status {
// //   _id: string;
// //   name: string;
// //   color: string;
// // }

// // interface User {
// //   _id: string;
// //   name: string;
// //   avatar?: string;
// // }

// // interface Organization {
// //   _id: string;
// //   name: string;
// // }

// // interface Project {
// //   _id: string;
// //   project_name: string;
// //   description: string;
// //   start_date: Date;
// //   deadline: Date;
// //   status: Status;
// //   project_manager_id: User;
// //   organization_id: Organization;
// //   createdAt: Date;
// //   updatedAt: Date;
// // }

// // interface ProjectsDashboardProps {
// //   projects: Project[];
// // }

// // const ProjectShow: React.FC<ProjectsDashboardProps> = ({ projects }) => {
// //   const [tabValue, setTabValue] = useState(0);
// //   const theme = useTheme();

// //   // Colors taken from the images
// //   const colors = {
// //     primary: '#00ACC1', // Teal/turquoise
// //     secondary: '#FF5722', // Orange/red
// //     tertiary: '#FFC107', // Yellow/gold
// //     quaternary: '#3F51B5', // Blue accent seen in some charts
// //   };

// //   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
// //     setTabValue(newValue);
// //   };

// //   // Calculate days remaining for each project
// //   const calculateDaysRemaining = (deadline: Date) => {
// //     const today = new Date();
// //     const deadlineDate = new Date(deadline);
// //     const diffTime = deadlineDate.getTime() - today.getTime();
// //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
// //     return diffDays;
// //   };

// //   // Format date to readable string
// //   const formatDate = (date: Date) => {
// //     return new Date(date).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'short',
// //       day: 'numeric'
// //     });
// //   };

// //   // Get project completion percentage (mock data for demonstration)
// //   const getProjectCompletion = (projectId: string) => {
// //     // In a real application, this would fetch actual completion data
// //     return Math.floor(Math.random() * 100);
// //   };

// //   // Group projects by status for pie chart
// //   const statusData = React.useMemo(() => {
// //     const statusGroups: Record<string, number> = {};
    
// //     projects.forEach(project => {
// //       const statusName = project.status.name;
// //       if (statusGroups[statusName]) {
// //         statusGroups[statusName] += 1;
// //       } else {
// //         statusGroups[statusName] = 1;
// //       }
// //     });
    
// //     return Object.keys(statusGroups).map(key => ({
// //       name: key,
// //       value: statusGroups[key]
// //     }));
// //   }, [projects]);

// //   // Prepare data for bar chart (projects by deadline month)
// //   const deadlineChartData = React.useMemo(() => {
// //     const monthData: Record<string, number> = {};
// //     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
// //     projects.forEach(project => {
// //       const deadlineMonth = new Date(project.deadline).getMonth();
// //       const monthName = months[deadlineMonth];
      
// //       if (monthData[monthName]) {
// //         monthData[monthName] += 1;
// //       } else {
// //         monthData[monthName] = 1;
// //       }
// //     });
    
// //     return Object.keys(monthData).map(key => ({
// //       month: key,
// //       count: monthData[key]
// //     }));
// //   }, [projects]);

// //   // Data grid columns
// //   const columns: GridColDef[] = [
// //     { field: 'project_name', headerName: 'Project Name', flex: 1 },
// //     { field: 'description', headerName: 'Description', flex: 1.5 },
// //     { 
// //       field: 'status', 
// //       headerName: 'Status', 
// //       flex: 0.7,
// //       renderCell: (params) => (
// //         <Chip 
// //           label={params.value.name} 
// //           style={{ 
// //             backgroundColor: params.value.color || colors.primary,
// //             color: '#fff' 
// //           }} 
// //           size="small" 
// //         />
// //       )
// //     },
// //     { 
// //       field: 'project_manager_id', 
// //       headerName: 'Project Manager', 
// //       flex: 1,
// //       renderCell: (params) => (
// //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //           <Avatar 
// //             src={params.value.avatar} 
// //             sx={{ width: 24, height: 24, mr: 1 }}
// //           >
// //             {params.value.name.charAt(0)}
// //           </Avatar>
// //           <Typography variant="body2">{params.value.name}</Typography>
// //         </Box>
// //       )
// //     },
// //     { 
// //       field: 'deadline', 
// //       headerName: 'Deadline', 
// //       flex: 0.8,
// //       valueFormatter: (params) => formatDate(params.value)
// //     },
// //     { 
// //       field: 'daysRemaining', 
// //       headerName: 'Days Left', 
// //       flex: 0.5,
// //       renderCell: (params) => {
// //         const days = params.value;
// //         let color = '#4CAF50'; // Green
        
// //         if (days < 0) {
// //           color = '#F44336'; // Red
// //         } else if (days < 7) {
// //           color = '#FF9800'; // Orange
// //         }
        
// //         return (
// //           <Typography 
// //             variant="body2" 
// //             style={{ color }}
// //           >
// //             {days < 0 ? `${Math.abs(days)} days overdue` : `${days} days`}
// //           </Typography>
// //         );
// //       }
// //     },
// //   ];

// //   // Prepare rows for the data grid
// //   const rows = projects.map(project => ({
// //     id: project._id,
// //     project_name: project.project_name,
// //     description: project.description,
// //     status: project.status,
// //     project_manager_id: project.project_manager_id,
// //     start_date: project.start_date,
// //     deadline: project.deadline,
// //     daysRemaining: calculateDaysRemaining(project.deadline),
// //     completion: getProjectCompletion(project._id)
// //   }));

// //   // Project cards for the grid view
// //   const ProjectCard = ({ project }: { project: Project }) => {
// //     const daysRemaining = calculateDaysRemaining(project.deadline);
// //     const completion = getProjectCompletion(project._id);
    
// //     return (
// //       <Card 
// //         sx={{ 
// //           height: '100%', 
// //           display: 'flex', 
// //           flexDirection: 'column',
// //           transition: 'transform 0.2s, box-shadow 0.2s',
// //           '&:hover': {
// //             transform: 'translateY(-4px)',
// //             boxShadow: 4
// //           }
// //         }}
// //       >
// //         <CardContent sx={{ flexGrow: 1 }}>
// //           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
// //             <Typography variant="h6" component="div" noWrap>
// //               {project.project_name}
// //             </Typography>
// //             <IconButton size="small">
// //               <MoreVertIcon fontSize="small" />
// //             </IconButton>
// //           </Box>
          
// //           <Typography 
// //             variant="body2" 
// //             color="text.secondary" 
// //             sx={{ 
// //               mb: 2, 
// //               display: '-webkit-box',
// //               overflow: 'hidden',
// //               WebkitBoxOrient: 'vertical',
// //               WebkitLineClamp: 2,
// //               height: '40px'
// //             }}
// //           >
// //             {project.description}
// //           </Typography>
          
// //           <Box sx={{ mb: 1 }}>
// //             <Chip 
// //               label={project.status.name} 
// //               size="small" 
// //               sx={{ 
// //                 bgcolor: project.status.color || colors.primary,
// //                 color: '#fff'
// //               }} 
// //             />
// //           </Box>
          
// //           <Box sx={{ mb: 2 }}>
// //             <Typography variant="caption" display="block" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
// //               <CalendarIcon fontSize="small" sx={{ mr: 0.5, fontSize: 16 }} />
// //               Deadline: {formatDate(project.deadline)}
// //             </Typography>
// //             <Typography 
// //               variant="caption" 
// //               display="block" 
// //               sx={{ 
// //                 display: 'flex', 
// //                 alignItems: 'center',
// //                 color: daysRemaining < 0 ? '#F44336' : daysRemaining < 7 ? '#FF9800' : 'text.secondary'
// //               }}
// //             >
// //               <TimeIcon fontSize="small" sx={{ mr: 0.5, fontSize: 16 }} />
// //               {daysRemaining < 0 
// //                 ? `${Math.abs(daysRemaining)} days overdue` 
// //                 : `${daysRemaining} days remaining`}
// //             </Typography>
// //           </Box>
          
// //           <Box sx={{ mb: 1 }}>
// //             <Typography variant="caption" display="block" color="text.secondary">
// //               Progress: {completion}%
// //             </Typography>
// //             <LinearProgress 
// //               variant="determinate" 
// //               value={completion} 
// //               sx={{ 
// //                 height: 6, 
// //                 borderRadius: 1,
// //                 bgcolor: alpha(colors.primary, 0.2),
// //                 '& .MuiLinearProgress-bar': {
// //                   bgcolor: colors.primary
// //                 }
// //               }} 
// //             />
// //           </Box>
// //         </CardContent>
// //         <Divider />
// //         <Box sx={{ p: 1.5, display: 'flex', alignItems: 'center' }}>
// //           <Avatar 
// //             src={project.project_manager_id.avatar} 
// //             sx={{ width: 24, height: 24, mr: 1 }}
// //           >
// //             {project.project_manager_id.name.charAt(0)}
// //           </Avatar>
// //           <Typography variant="caption" color="text.secondary">
// //             {project.project_manager_id.name}
// //           </Typography>
// //         </Box>
// //       </Card>
// //     );
// //   };

// //   return (
// //     <Container maxWidth="xl">
// //       <Box sx={{ mb: 4 }}>
// //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
// //           <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
// //             Projects Dashboard
// //           </Typography>
// //           <Box>
// //             <Button
// //               variant="outlined"
// //               startIcon={<FilterListIcon />}
// //               sx={{ mr: 2 }}
// //             >
// //               Filter
// //             </Button>
// //             <Button
// //               variant="contained"
// //               startIcon={<AddIcon />}
// //               sx={{ bgcolor: colors.primary }}
// //             >
// //               New Project
// //             </Button>
// //           </Box>
// //         </Box>

// //         {/* Dashboard Statistics */}
// //         <Grid container spacing={3} sx={{ mb: 4 }}>
// //           <Grid item xs={12} md={6} lg={3}>
// //             <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
// //               <Typography variant="h6" gutterBottom>
// //                 Total Projects
// //               </Typography>
// //               <Typography variant="h3" sx={{ color: colors.primary, fontWeight: 'bold', mt: 'auto' }}>
// //                 {projects.length}
// //               </Typography>
// //             </Paper>
// //           </Grid>
// //           <Grid item xs={12} md={6} lg={3}>
// //             <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
// //               <Typography variant="h6" gutterBottom>
// //                 In Progress
// //               </Typography>
// //               <Typography variant="h3" sx={{ color: colors.secondary, fontWeight: 'bold', mt: 'auto' }}>
// //                 {projects.filter(p => p.status.name === 'In Progress').length}
// //               </Typography>
// //             </Paper>
// //           </Grid>
// //           <Grid item xs={12} md={6} lg={3}>
// //             <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
// //               <Typography variant="h6" gutterBottom>
// //                 Completed
// //               </Typography>
// //               <Typography variant="h3" sx={{ color: colors.tertiary, fontWeight: 'bold', mt: 'auto' }}>
// //                 {projects.filter(p => p.status.name === 'Completed').length}
// //               </Typography>
// //             </Paper>
// //           </Grid>
// //           <Grid item xs={12} md={6} lg={3}>
// //             <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
// //               <Typography variant="h6" gutterBottom>
// //                 Delayed
// //               </Typography>
// //               <Typography variant="h3" sx={{ color: '#F44336', fontWeight: 'bold', mt: 'auto' }}>
// //                 {projects.filter(p => calculateDaysRemaining(p.deadline) < 0).length}
// //               </Typography>
// //             </Paper>
// //           </Grid>
// //         </Grid>

// //         {/* Charts Section */}
// //         <Grid container spacing={3} sx={{ mb: 4 }}>
// //           <Grid item xs={12} md={4}>
// //             <Paper sx={{ p: 2, height: 300 }}>
// //               <Typography variant="h6" gutterBottom>
// //                 Projects by Status
// //               </Typography>
// //               <ResponsiveContainer width="100%" height={250}>
// //                 <PieChart>
// //                   <Pie
// //                     data={statusData}
// //                     cx="50%"
// //                     cy="50%"
// //                     labelLine={false}
// //                     label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
// //                     outerRadius={80}
// //                     fill="#8884d8"
// //                     dataKey="value"
// //                   >
// //                     {statusData.map((entry, index) => (
// //                       <Cell key={`cell-${index}`} fill={[colors.primary, colors.secondary, colors.tertiary, colors.quaternary][index % 4]} />
// //                     ))}
// //                   </Pie>
// //                   <Tooltip formatter={(value) => [`${value} projects`, 'Count']} />
// //                 </PieChart>
// //               </ResponsiveContainer>
// //             </Paper>
// //           </Grid>
// //           <Grid item xs={12} md={8}>
// //             <Paper sx={{ p: 2, height: 300 }}>
// //               <Typography variant="h6" gutterBottom>
// //                 Projects by Deadline Month
// //               </Typography>
// //               <ResponsiveContainer width="100%" height={250}>
// //                 <BarChart
// //                   data={deadlineChartData}
// //                   margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
// //                 >
// //                   <CartesianGrid strokeDasharray="3 3" />
// //                   <XAxis dataKey="month" />
// //                   <YAxis />
// //                   <Tooltip formatter={(value) => [`${value} projects`, 'Count']} />
// //                   <Bar dataKey="count" name="Projects" fill={colors.primary} />
// //                 </BarChart>
// //               </ResponsiveContainer>
// //             </Paper>
// //           </Grid>
// //         </Grid>

// //         {/* Project List Tabs */}
// //         <Paper sx={{ mb: 4 }}>
// //           <Tabs
// //             value={tabValue}
// //             onChange={handleTabChange}
// //             indicatorColor="primary"
// //             textColor="primary"
// //             sx={{ 
// //               borderBottom: 1, 
// //               borderColor: 'divider',
// //               '& .MuiTab-root.Mui-selected': { 
// //                 color: colors.primary 
// //               },
// //               '& .MuiTabs-indicator': { 
// //                 backgroundColor: colors.primary 
// //               } 
// //             }}
// //           >
// //             <Tab label="Grid View" />
// //             <Tab label="Table View" />
// //           </Tabs>
          
// //           <Box sx={{ p: 3 }}>
// //             {tabValue === 0 ? (
// //               <Grid container spacing={3}>
// //                 {projects.map(project => (
// //                   <Grid item key={project._id} xs={12} sm={6} md={4} lg={3}>
// //                     <ProjectCard project={project} />
// //                   </Grid>
// //                 ))}
// //               </Grid>
// //             ) : (
// //               <Box sx={{ height: 600, width: '100%' }}>
// //                 <DataGrid
// //                   rows={rows}
// //                   columns={columns}
// //                   pageSize={10}
// //                   rowsPerPageOptions={[10, 25, 50]}
// //                   checkboxSelection
// //                   disableSelectionOnClick
// //                   sx={{
// //                     '& .MuiDataGrid-columnHeader': {
// //                       backgroundColor: alpha(colors.primary, 0.1),
// //                     },
// //                     '& .MuiDataGrid-columnHeaderTitle': {
// //                       fontWeight: 'bold'
// //                     }
// //                   }}
// //                 />
// //               </Box>
// //             )}
// //           </Box>
// //         </Paper>
// //       </Box>
// //     </Container>
// //   );
// // };

// // export default ProjectShow;

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import {
//   Box,
//   Typography,
//   Button,
//   Tabs,
//   Tab,
//   Paper,
//   Menu,
//   MenuItem,
//   Snackbar,
//   Alert,
//   NoSsr,
//   ThemeProvider,
//   createTheme,
//   StyledEngineProvider,
//   CssBaseline,
// } from "@mui/material"
// import { Add, Edit, Delete, ViewModule, ViewList, ViewHeadline } from "@mui/icons-material"
// import { prefixer } from "stylis"
// import rtlPlugin from "stylis-plugin-rtl"
// import { CacheProvider } from "@emotion/react"
// import createCache from "@emotion/cache"
// import { SummaryCards } from "./SummaryCards"
// import { ProjectCharts } from "./ProjectCharts"
// import { ProjectsGridView } from "./ProjectsGridView"
// import { ProjectsTableView } from "./ProjectsTableView"
// import { ProjectsListView } from "./ProjectsListView"
// import { EditDialog, DeleteDialog, AddProjectDialog } from "./ProjectDialogs"
// import { FilterPanel, type FilterValues } from "./FilterPanel"
// import { type Project, generateId } from "../../types/Project"

// // יצירת קאש עבור RTL
// const cacheRtl = createCache({
//   key: "muirtl",
//   stylisPlugins: [prefixer, rtlPlugin],
// })

// // יצירת ערכת נושא מותאמת
// const theme = createTheme({
//   direction: "rtl",
//   palette: {
//     primary: {
//       main: "#00bcd4",
//     },
//     secondary: {
//       main: "#ff9800",
//     },
//   },
//   typography: {
//     fontFamily: ["Rubik", "Assistant", "Arial", "sans-serif"].join(","),
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         body: {
//           backgroundColor: "#f5f5f5",
//           margin: 0,
//           padding: 0,
//         },
//       },
//     },
//     MuiPopover: {
//       defaultProps: {
//         container: () => document.body,
//       },
//     },
//     MuiPopper: {
//       defaultProps: {
//         container: () => document.body,
//       },
//     },
//     MuiDialog: {
//       defaultProps: {
//         container: () => document.body,
//         disableScrollLock: true,
//       },
//     },
//     MuiModal: {
//       defaultProps: {
//         disableScrollLock: true,
//         container: () => document.body,
//       },
//     },
//   },
// })

// interface TabPanelProps {
//   children?: React.ReactNode
//   index: number
//   value: number
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
//     </div>
//   )
// }

// interface ProjectsDashboardProps {
//   projects: Project[]
// }

// const ProjectsDashboard=({ initialProjects }: { initialProjects: Project[] })=> {
//   const [projects, setProjects] = useState<Project[]>(initialProjects)
//   const [filteredProjects, setFilteredProjects] = useState<Project[]>(initialProjects)
//   const [tabValue, setTabValue] = useState(0)
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
//   const [isFilterOpen, setIsFilterOpen] = useState(false)
//   const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
//     open: false,
//     message: "",
//     severity: "success",
//   })

//   // פונקציות לטיפול בפרויקטים
//   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, project: Project) => {
//     setAnchorEl(event.currentTarget)
//     setSelectedProject(project)
//   }

//   const handleMenuClose = () => {
//     setAnchorEl(null)
//   }

//   const handleEditProject = () => {
//     setIsEditDialogOpen(true)
//     handleMenuClose()
//   }

//   const handleDeleteProject = () => {
//     setIsDeleteDialogOpen(true)
//     handleMenuClose()
//   }

//   const confirmDelete = () => {
//     // במציאות כאן היה קוד לקריאת API למחיקת הפרויקט
//     setSnackbar({
//       open: true,
//       message: `הפרויקט "${selectedProject?.project_name}" נמחק בהצלחה`,
//       severity: "success",
//     })
//     setIsDeleteDialogOpen(false)
//   }

//   const saveProjectChanges = (e: React.FormEvent) => {
//     e.preventDefault()
//     // במציאות כאן היה קוד לקריאת API לעדכון הפרויקט
//     setSnackbar({
//       open: true,
//       message: `הפרויקט "${selectedProject?.project_name}" עודכן בהצלחה`,
//       severity: "success",
//     })
//     setIsEditDialogOpen(false)
//   }

//   const handleAddProject = (e: React.FormEvent) => {
//     e.preventDefault()
//     // במציאות כאן היה קוד לקריאת API להוספת פרויקט
//     setSnackbar({
//       open: true,
//       message: "הפרויקט נוסף בהצלחה",
//       severity: "success",
//     })
//     setIsAddDialogOpen(false)

//     // יצירת פרויקט חדש לדוגמה
//     const newProject: Project = {
//       _id: generateId(),
//       project_name: "פרויקט חדש",
//       description: "תיאור של הפרויקט החדש",
//       start_date: new Date().toISOString(),
//       deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
//       status: "NOT_STARTED",
//       project_manager_id: {
//         _id: "123",
//         user_name: "תמר",
//         email: "tamar@example.com",
//         role: "MANAGER",
//       },
//       authorized_Users: [],
//       organization_id: null,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     }

//     setProjects((prev) => [newProject, ...prev])
//   }

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false })
//   }

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue)
//   }

//   const handleFilter = (filters: FilterValues) => {
//     let filtered = [...projects]

//     if (filters.status) {
//       filtered = filtered.filter((project) => project.status === filters.status)
//     }

//     if (filters.manager) {
//       filtered = filtered.filter((project) => project.project_manager_id.user_name === filters.manager)
//     }

//     if (filters.dateFrom) {
//       const fromDate = new Date(filters.dateFrom)
//       filtered = filtered.filter((project) => new Date(project.deadline) >= fromDate)
//     }

//     if (filters.dateTo) {
//       const toDate = new Date(filters.dateTo)
//       toDate.setHours(23, 59, 59, 999)
//       filtered = filtered.filter((project) => new Date(project.deadline) <= toDate)
//     }

//     setFilteredProjects(filtered)
//     setSnackbar({
//       open: true,
//       message: `נמצאו ${filtered.length} פרויקטים מתאימים`,
//       severity: "success",
//     })
//   }

//   const resetFilter = () => {
//     setFilteredProjects(projects)
//   }

//   // עדכון הפרויקטים המסוננים כאשר הפרויקטים משתנים
//   useEffect(() => {
//     setFilteredProjects(projects)
//   }, [projects])

//   return (
//     <StyledEngineProvider injectFirst>
//       <CacheProvider value={cacheRtl}>
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           <NoSsr>
//             <Box sx={{ width: "100%", minHeight: "100vh", p: { xs: 2, md: 4 } }}>
//               <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
//                 <Typography variant="h4" component="h1" fontWeight="bold">
//                   לוח בקרת פרויקטים
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   startIcon={<Add />}
//                   color="primary"
//                   onClick={() => setIsAddDialogOpen(true)}
//                 >
//                   פרויקט חדש
//                 </Button>
//               </Box>

//               {/* כרטיסי סיכום */}
//               <Box sx={{ mb: 4 }}>
//                 <SummaryCards projects={filteredProjects} />
//               </Box>

//               {/* גרפים */}
//               <Box sx={{ mb: 4 }}>
//                 <ProjectCharts projects={filteredProjects} />
//               </Box>

//               {/* פאנל סינון */}
//               <FilterPanel
//                 open={isFilterOpen}
//                 onToggle={() => setIsFilterOpen(!isFilterOpen)}
//                 onFilter={handleFilter}
//                 onReset={resetFilter}
//               />

//               {/* טאבים לתצוגות שונות */}
//               <Paper elevation={2} sx={{ mb: 4 }}>
//                 <Tabs
//                   value={tabValue}
//                   onChange={handleTabChange}
//                   textColor="primary"
//                   indicatorColor="primary"
//                   sx={{ borderBottom: 1, borderColor: "divider" }}
//                 >
//                   <Tab icon={<ViewModule />} label="תצוגת גריד" />
//                   <Tab icon={<ViewList />} label="תצוגת טבלה" />
//                   <Tab icon={<ViewHeadline />} label="תצוגת רשימה" />
//                 </Tabs>

//                 {/* תצוגת גריד */}
//                 <TabPanel value={tabValue} index={0}>
//                   <ProjectsGridView projects={filteredProjects} onMenuOpen={handleMenuOpen} />
//                 </TabPanel>

//                 {/* תצוגת טבלה */}
//                 <TabPanel value={tabValue} index={1}>
//                   <ProjectsTableView
//                     projects={filteredProjects}
//                     onEdit={(project) => {
//                       setSelectedProject(project)
//                       setIsEditDialogOpen(true)
//                     }}
//                     onDelete={(project) => {
//                       setSelectedProject(project)
//                       setIsDeleteDialogOpen(true)
//                     }}
//                   />
//                 </TabPanel>

//                 {/* תצוגת רשימה */}
//                 <TabPanel value={tabValue} index={2}>
//                   <ProjectsListView
//                     projects={filteredProjects}
//                     onEdit={(project) => {
//                       setSelectedProject(project)
//                       setIsEditDialogOpen(true)
//                     }}
//                     onDelete={(project) => {
//                       setSelectedProject(project)
//                       setIsDeleteDialogOpen(true)
//                     }}
//                   />
//                 </TabPanel>
//               </Paper>

//               {/* תפריט פעולות */}
//               <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleMenuClose}
//                 anchorOrigin={{
//                   vertical: "bottom",
//                   horizontal: "right",
//                 }}
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 slotProps={{
//                   paper: {
//                     sx: {
//                       mt: 1,
//                       boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
//                     },
//                   },
//                 }}
//               >
//                 <MenuItem onClick={handleEditProject}>
//                   <Edit fontSize="small" sx={{ mr: 1 }} />
//                   עריכה
//                 </MenuItem>
//                 <MenuItem onClick={handleDeleteProject} sx={{ color: "error.main" }}>
//                   <Delete fontSize="small" sx={{ mr: 1 }} />
//                   מחיקה
//                 </MenuItem>
//               </Menu>

//               {/* דיאלוגים */}
//               <EditDialog
//                 open={isEditDialogOpen}
//                 project={selectedProject}
//                 onClose={() => setIsEditDialogOpen(false)}
//                 onSave={saveProjectChanges}
//               />

//               <DeleteDialog
//                 open={isDeleteDialogOpen}
//                 project={selectedProject}
//                 onClose={() => setIsDeleteDialogOpen(false)}
//                 onConfirm={confirmDelete}
//               />

//               <AddProjectDialog
//                 open={isAddDialogOpen}
//                 onClose={() => setIsAddDialogOpen(false)}
//                 onAdd={handleAddProject}
//               />

//               {/* הודעות */}
//               <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//               >
//                 <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
//                   {snackbar.message}
//                 </Alert>
//               </Snackbar>
//             </Box>
//           </NoSsr>
//         </ThemeProvider>
//       </CacheProvider>
//     </StyledEngineProvider>
//   )
// }

// export default ProjectsDashboard