// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//     Box,
//     Typography,
//     Button,
//     Card,
//     CardContent,
//     Grid,
//     Chip,
//     IconButton,
//     Menu,
//     MenuItem,
//     LinearProgress,
//     Divider,
//     Paper,
//     Skeleton,
//     Container,
//     Snackbar,
//     Alert,
// } from '@mui/material';
// import {
//     ArrowBack,
//     Add,
//     MoreVert,
//     Edit,
//     Delete,
//     Person,
//     CalendarToday,
//     Assignment,
//     CheckCircle,
// } from '@mui/icons-material';
// import { format, differenceInDays } from 'date-fns';
// import { getStatusInfo } from '../../types/Project';
// import TaskCard from '../Tasks/TaskCard';
// import AddTaskDialog from '../Tasks/AddTaskDialog';
// import EditTaskDialog from '../Tasks/EditTaskDialog';
// import DeleteDialog from '../Tasks/DeleteDialog';
// import { useSelector } from 'react-redux';
// import { selectProjectById } from './projectSlice';
// import type { RootState } from '../../app/store';
// import {
//     useGetTasksByProjectQuery,
//     useUpdateTaskMutation,
//     useDeleteTaskMutation,
//     type Task,
//     type UpdateTaskRequest
// } from '../Tasks/tasksApi';
// import type { User } from '../../types/Project';

// const ProjectDetails: React.FC = () => {
//     const { projectId } = useParams<{ projectId: string }>();
//     const navigate = useNavigate();

//     // State for menu and dialogs
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const [selectedTask, setSelectedTask] = useState<Task | null>(null);
//     const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
//     const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

//     // Snackbar state
//     const [snackbar, setSnackbar] = useState({
//         open: false,
//         message: '',
//         severity: 'success' as 'success' | 'error'
//     });

//     // Redux selectors
//     const project = useSelector((state: RootState) =>
//         selectProjectById(state, projectId || '')
//     );

//     // RTK Query hooks
//     const {
//         data: tasks = [],
//         isLoading,
//         isError,
//         refetch,
//     } = useGetTasksByProjectQuery(projectId || '');

//     const [updateTask] = useUpdateTaskMutation();
//     const [deleteTask] = useDeleteTaskMutation();

//     // Get available users from project (assuming they are in project data)
//     const availableUsers: User[] = project?.team_members || [];

//     // const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, task: Task) => {
//     //     setSelectedTask(task);
//     //     setAnchorEl(event.currentTarget);
//     // };

//     const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, task: Task) => {
//         console.log('Opening menu for task:', task); // עוזר לדיבוג
//         setSelectedTask(task);
//         setAnchorEl(event.currentTarget);
//     };
//     const handleMenuClose = () => {
//         setAnchorEl(null);
//         setSelectedTask(null);
//     };

//     const handleEditClick = () => {
//         setIsEditDialogOpen(true);
//         handleMenuClose();
//     };

//     const handleDeleteClick = () => {
//         setIsDeleteDialogOpen(true);
//         handleMenuClose();
//     };

//     const handleEditSave = async (updatedTask: UpdateTaskRequest) => {
//         try {
//             await updateTask(updatedTask).unwrap();
//             setSnackbar({
//                 open: true,
//                 message: 'Task updated successfully!',
//                 severity: 'success'
//             });
//             refetch();
//         } catch (error) {
//             console.error('Failed to update task:', error);
//             setSnackbar({
//                 open: true,
//                 message: 'Failed to update task. Please try again.',
//                 severity: 'error'
//             });
//         }
//         setIsEditDialogOpen(false);
//         setSelectedTask(null);
//     };

//     // const handleDeleteConfirm = async () => {
//     //     console.log('Deleting task:', selectedTask);
//     //     if (!selectedTask) return;

//     //     try {
//     //         await deleteTask(selectedTask._id).unwrap();
//     //         setSnackbar({
//     //             open: true,
//     //             message: 'Task deleted successfully!',
//     //             severity: 'success'
//     //         });
//     //         refetch();
//     //     } catch (error) {
//     //         console.error('Failed to delete task:', error);
//     //         setSnackbar({
//     //             open: true,
//     //             message: 'Failed to delete task. Please try again.',
//     //             severity: 'error'
//     //         });
//     //     }
//     //     setIsDeleteDialogOpen(false);
//     //     setSelectedTask(null);
//     // };

//     const handleDeleteConfirm = async () => {
//         if (!selectedTask || !selectedTask._id) {
//             console.error('No task selected or task ID missing:', selectedTask);
//             return;
//         }

//         console.log('Deleting task with ID:', selectedTask._id);

//         try {
//             await deleteTask(selectedTask._id).unwrap();
//             setSnackbar({
//                 open: true,
//                 message: 'Task deleted successfully!',
//                 severity: 'success'
//             });
//             refetch();
//         } catch (error) {
//             console.error('Failed to delete task:', error);
//             setSnackbar({
//                 open: true,
//                 message: 'Failed to delete task. Please try again.',
//                 severity: 'error'
//             });
//         }
//         setIsDeleteDialogOpen(false);
//         setSelectedTask(null);
//     };


//     const handleSnackbarClose = () => {
//         setSnackbar(prev => ({ ...prev, open: false }));
//     };

//     const getTaskStats = () => {
//         const total = tasks.length;
//         const completed = tasks.filter(task => task.status === 'COMPLETED').length;
//         const inProgress = tasks.filter(task => task.status === 'IN_PROGRESS').length;
//         const notStarted = tasks.filter(task => task.status === 'NOT_STARTED').length;
//         const delayed = tasks.filter(task => task.status === 'DELAYED').length;
//         return { total, completed, inProgress, notStarted, delayed };
//     };

//     const getDaysRemaining = (deadline: string) => {
//         try {
//             const today = new Date();
//             const deadlineDate = new Date(deadline);
//             return differenceInDays(deadlineDate, today);
//         } catch {
//             return 0;
//         }
//     };

//     const getProgressPercentage = () => {
//         const stats = getTaskStats();
//         return stats.total > 0
//             ? Math.round((stats.completed / stats.total) * 100)
//             : 0;
//     };

//     if (!project) {
//         return (
//             <Container maxWidth="md" sx={{ mt: 10 }}>
//                 <Typography variant="h5" color="error" align="center">
//                     Project not found
//                 </Typography>
//             </Container>
//         );
//     }

//     const stats = getTaskStats();
//     const statusInfo = getStatusInfo(project.status);
//     const daysRemaining = getDaysRemaining(project.deadline);
//     const progress = getProgressPercentage();

//     return (
//         <Container maxWidth="lg" sx={{ py: 4 }}>
//             <Box sx={{ mb: 4 }}>
//                 <Button
//                     startIcon={<ArrowBack />}
//                     onClick={() => navigate('/app/projects')}
//                     sx={{ mb: 2 }}
//                 >
//                     Back to Projects
//                 </Button>

//                 <Box
//                     sx={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'flex-start',
//                         mb: 3,
//                     }}
//                 >
//                     <Box>
//                         <Typography variant="h4" gutterBottom>
//                             {project.project_name}
//                         </Typography>
//                         <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
//                             {project.description}
//                         </Typography>
//                         <Chip
//                             label={statusInfo.label}
//                             sx={{
//                                 bgcolor: statusInfo.color,
//                                 color: 'white',
//                             }}
//                         />
//                     </Box>
//                     <Button
//                         variant="contained"
//                         startIcon={<Add />}
//                         onClick={() => setIsAddTaskOpen(true)}
//                     >
//                         Add Task
//                     </Button>
//                 </Box>
//             </Box>

//             <Grid container spacing={3} sx={{ mb: 4 }}>
//                 <Grid item xs={12} md={3}>
//                     <Card>
//                         <CardContent sx={{ textAlign: 'center' }}>
//                             <Person sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
//                             <Typography variant="h6" gutterBottom>
//                                 Project Manager
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 {project.project_manager_id?.user_name || 'Not Assigned'}
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                     <Card>
//                         <CardContent sx={{ textAlign: 'center' }}>
//                             <CalendarToday sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
//                             <Typography variant="h6" gutterBottom>
//                                 Deadline
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 {format(new Date(project.deadline), 'dd/MM/yyyy')}
//                             </Typography>
//                             <Typography
//                                 variant="caption"
//                                 sx={{
//                                     color:
//                                         daysRemaining < 0
//                                             ? 'error.main'
//                                             : daysRemaining <= 7
//                                                 ? 'warning.main'
//                                                 : 'success.main',
//                                 }}
//                             >
//                                 {daysRemaining < 0
//                                     ? `${Math.abs(daysRemaining)} days overdue`
//                                     : `${daysRemaining} days remaining`}
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                     <Card>
//                         <CardContent sx={{ textAlign: 'center' }}>
//                             <Assignment sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
//                             <Typography variant="h6" gutterBottom>
//                                 Total Tasks
//                             </Typography>
//                             <Typography variant="h4" color="primary">
//                                 {stats.total}
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} md={3}>
//                     <Card>
//                         <CardContent sx={{ textAlign: 'center' }}>
//                             <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
//                             <Typography variant="h6" gutterBottom>
//                                 Progress
//                             </Typography>
//                             <Typography variant="h4" color="success.main">
//                                 {progress}%
//                             </Typography>
//                             <LinearProgress
//                                 variant="determinate"
//                                 value={progress}
//                                 sx={{ mt: 1 }}
//                                 color="success"
//                             />
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>

//             <Paper sx={{ p: 3, mb: 4 }}>
//                 <Typography variant="h6" gutterBottom>
//                     Task Statistics
//                 </Typography>
//                 <Grid container spacing={2}>
//                     <Grid item xs={6} sm={3}>
//                         <Box sx={{ textAlign: 'center' }}>
//                             <Typography variant="h4" color="grey.600">
//                                 {stats.notStarted}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 Not Started
//                             </Typography>
//                         </Box>
//                     </Grid>
//                     <Grid item xs={6} sm={3}>
//                         <Box sx={{ textAlign: 'center' }}>
//                             <Typography variant="h4" color="info.main">
//                                 {stats.inProgress}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 In Progress
//                             </Typography>
//                         </Box>
//                     </Grid>
//                     <Grid item xs={6} sm={3}>
//                         <Box sx={{ textAlign: 'center' }}>
//                             <Typography variant="h4" color="success.main">
//                                 {stats.completed}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 Completed
//                             </Typography>
//                         </Box>
//                     </Grid>
//                     <Grid item xs={6} sm={3}>
//                         <Box sx={{ textAlign: 'center' }}>
//                             <Typography variant="h4" color="error.main">
//                                 {stats.delayed}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                                 Delayed
//                             </Typography>
//                         </Box>
//                     </Grid>
//                 </Grid>
//             </Paper>

//             <Box>
//                 <Typography variant="h5" gutterBottom>
//                     Tasks ({stats.total})
//                 </Typography>
//                 <Divider sx={{ mb: 3 }} />

//                 {isLoading ? (
//                     <Grid container spacing={3}>
//                         {Array.from({ length: 3 }).map((_, idx) => (
//                             <Grid item xs={12} sm={6} md={4} key={idx}>
//                                 <Skeleton variant="rectangular" height={140} />
//                             </Grid>
//                         ))}
//                     </Grid>
//                 ) : isError ? (
//                     <Paper sx={{ p: 4, textAlign: 'center' }}>
//                         <Typography variant="h6" color="error" gutterBottom>
//                             Failed to load tasks
//                         </Typography>
//                         <Button variant="outlined" onClick={() => refetch()}>
//                             Retry
//                         </Button>
//                     </Paper>
//                 ) : tasks.length === 0 ? (
//                     <Paper sx={{ p: 4, textAlign: 'center' }}>
//                         <Assignment sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
//                         <Typography variant="h6" color="text.secondary" gutterBottom>
//                             No tasks found
//                         </Typography>
//                         <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                             Start by adding your first task to this project
//                         </Typography>
//                         <Button
//                             variant="contained"
//                             startIcon={<Add />}
//                             onClick={() => setIsAddTaskOpen(true)}
//                         >
//                             Add First Task
//                         </Button>
//                     </Paper>
//                 ) : (
//                     <Grid container spacing={3}>
//                         {tasks.map((task) => (
//                             <Grid item xs={12} sm={6} md={4} key={task._id}>
//                                 <TaskCard task={task} onMenuOpen={handleMenuOpen} />
//                             </Grid>
//                         ))}
//                     </Grid>
//                 )}
//             </Box>

//             {/* Context Menu */}
//             <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//                 <MenuItem onClick={handleEditClick}>
//                     <Edit fontSize="small" sx={{ mr: 1 }} />
//                     Edit Task
//                 </MenuItem>
//                 <MenuItem onClick={handleDeleteClick}>
//                     <Delete fontSize="small" sx={{ mr: 1 }} />
//                     Delete Task
//                 </MenuItem>
//             </Menu>

//             {/* Dialogs */}
//             <AddTaskDialog
//                 open={isAddTaskOpen}
//                 projectId={projectId || ''}
//                 onClose={() => {
//                     setIsAddTaskOpen(false);
//                     refetch();
//                 }}
//             />

//             <EditTaskDialog
//                 open={isEditDialogOpen}
//                 task={selectedTask}
//                 onClose={() => {
//                     setIsEditDialogOpen(false);
//                     setSelectedTask(null);
//                 }}
//                 onSave={handleEditSave}
//                 availableUsers={availableUsers}
//             />

//             <DeleteDialog
//                 open={isDeleteDialogOpen}
//                 task={selectedTask}
//                 onClose={() => {
//                     setIsDeleteDialogOpen(false);
//                     setSelectedTask(null);
//                 }}
//                 onConfirm={handleDeleteConfirm}
//             />

//             {/* Snackbar for notifications */}
//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={6000}
//                 onClose={handleSnackbarClose}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//             >
//                 <Alert
//                     onClose={handleSnackbarClose}
//                     severity={snackbar.severity}
//                     sx={{ width: '100%' }}
//                 >
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Container>
//     );
// };

// export default ProjectDetails;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    LinearProgress,
    Divider,
    Paper,
    Skeleton,
    Container,
    Snackbar,
    Alert,
} from '@mui/material';
import {
    ArrowBack,
    Add,
    MoreVert,
    Edit,
    Delete,
    Person,
    CalendarToday,
    Assignment,
    CheckCircle,
} from '@mui/icons-material';
import { format, differenceInDays } from 'date-fns';
import { getStatusInfo } from '../../types/Project';
import TaskCard from '../Tasks/TaskCard';
import AddTaskDialog from '../Tasks/AddTaskDialog';
import EditTaskDialog from '../Tasks/EditTaskDialog';
import DeleteDialog from '../Tasks/DeleteDialog';
import { useSelector } from 'react-redux';
import { selectProjectById } from './projectSlice';
import type { RootState } from '../../app/store';
import {
    useGetTasksByProjectQuery,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    type Task,
    type UpdateTaskRequest
} from '../Tasks/tasksApi';
import type { User } from '../../types/Project';

const ProjectDetails: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();

    // State for menu and dialogs
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // Snackbar state
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    // Redux selectors
    const project = useSelector((state: RootState) =>
        selectProjectById(state, projectId || '')
    );

    // RTK Query hooks
    const {
        data: tasks = [],
        isLoading,
        isError,
        refetch,
    } = useGetTasksByProjectQuery(projectId || '');

    const [updateTask] = useUpdateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();

    // Get available users from project (assuming they are in project data)
    const availableUsers: User[] = project?.team_members || [];

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, task: Task) => {
        console.log('Opening menu for task:', task);
        setSelectedTask(task);
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        // Don't clear selectedTask here - let dialogs handle it themselves
    };

    const handleEditClick = () => {
        setIsEditDialogOpen(true);
        setAnchorEl(null); // Only close the menu
    };

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true);
        setAnchorEl(null); // Only close the menu
    };

    const handleEditSave = async (updatedTask: UpdateTaskRequest) => {
        try {
            await updateTask(updatedTask).unwrap();
            setSnackbar({
                open: true,
                message: 'Task updated successfully!',
                severity: 'success'
            });
            refetch();
        } catch (error) {
            console.error('Failed to update task:', error);
            setSnackbar({
                open: true,
                message: 'Failed to update task. Please try again.',
                severity: 'error'
            });
        }
        setIsEditDialogOpen(false);
        setSelectedTask(null);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedTask || !selectedTask._id) {
            console.error('No task selected or task ID missing:', selectedTask);
            return;
        }

        console.log('Deleting task with ID:', selectedTask._id);

        try {
            await deleteTask(selectedTask._id).unwrap();
            setSnackbar({
                open: true,
                message: 'Task deleted successfully!',
                severity: 'success'
            });
            refetch();
        } catch (error) {
            console.error('Failed to delete task:', error);
            setSnackbar({
                open: true,
                message: 'Failed to delete task. Please try again.',
                severity: 'error'
            });
        }
        setIsDeleteDialogOpen(false);
        setSelectedTask(null);
    };

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const getTaskStats = () => {
        const total = tasks.length;
        const completed = tasks.filter(task => task.status === 'COMPLETED').length;
        const inProgress = tasks.filter(task => task.status === 'IN_PROGRESS').length;
        const notStarted = tasks.filter(task => task.status === 'NOT_STARTED').length;
        const delayed = tasks.filter(task => task.status === 'DELAYED').length;
        return { total, completed, inProgress, notStarted, delayed };
    };

    const getDaysRemaining = (deadline: string) => {
        try {
            const today = new Date();
            const deadlineDate = new Date(deadline);
            return differenceInDays(deadlineDate, today);
        } catch {
            return 0;
        }
    };

    const getProgressPercentage = () => {
        const stats = getTaskStats();
        return stats.total > 0
            ? Math.round((stats.completed / stats.total) * 100)
            : 0;
    };

    if (!project) {
        return (
            <Container maxWidth="md" sx={{ mt: 10 }}>
                <Typography variant="h5" color="error" align="center">
                    Project not found
                </Typography>
            </Container>
        );
    }

    const stats = getTaskStats();
    const statusInfo = getStatusInfo(project.status);
    const daysRemaining = getDaysRemaining(project.deadline);
    const progress = getProgressPercentage();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => navigate('/app/projects')}
                    sx={{ mb: 2 }}
                >
                    Back to Projects
                </Button>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 3,
                    }}
                >
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            {project.project_name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                            {project.description}
                        </Typography>
                        <Chip
                            label={statusInfo.label}
                            sx={{
                                bgcolor: statusInfo.color,
                                color: 'white',
                            }}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => setIsAddTaskOpen(true)}
                    >
                        Add Task
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Person sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                            <Typography variant="h6" gutterBottom>
                                Project Manager
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {project.project_manager_id?.user_name || 'Not Assigned'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <CalendarToday sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                            <Typography variant="h6" gutterBottom>
                                Deadline
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {format(new Date(project.deadline), 'dd/MM/yyyy')}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color:
                                        daysRemaining < 0
                                            ? 'error.main'
                                            : daysRemaining <= 7
                                                ? 'warning.main'
                                                : 'success.main',
                                }}
                            >
                                {daysRemaining < 0
                                    ? `${Math.abs(daysRemaining)} days overdue`
                                    : `${daysRemaining} days remaining`}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Assignment sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                            <Typography variant="h6" gutterBottom>
                                Total Tasks
                            </Typography>
                            <Typography variant="h4" color="primary">
                                {stats.total}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                            <Typography variant="h6" gutterBottom>
                                Progress
                            </Typography>
                            <Typography variant="h4" color="success.main">
                                {progress}%
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                                sx={{ mt: 1 }}
                                color="success"
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Task Statistics
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" color="grey.600">
                                {stats.notStarted}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Not Started
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" color="info.main">
                                {stats.inProgress}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                In Progress
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" color="success.main">
                                {stats.completed}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Completed
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" color="error.main">
                                {stats.delayed}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Delayed
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Box>
                <Typography variant="h5" gutterBottom>
                    Tasks ({stats.total})
                </Typography>
                <Divider sx={{ mb: 3 }} />

                {isLoading ? (
                    <Grid container spacing={3}>
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={idx}>
                                <Skeleton variant="rectangular" height={140} />
                            </Grid>
                        ))}
                    </Grid>
                ) : isError ? (
                    <Paper sx={{ p: 4, textAlign: 'center' }}>
                        <Typography variant="h6" color="error" gutterBottom>
                            Failed to load tasks
                        </Typography>
                        <Button variant="outlined" onClick={() => refetch()}>
                            Retry
                        </Button>
                    </Paper>
                ) : tasks.length === 0 ? (
                    <Paper sx={{ p: 4, textAlign: 'center' }}>
                        <Assignment sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            No tasks found
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Start by adding your first task to this project
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => setIsAddTaskOpen(true)}
                        >
                            Add First Task
                        </Button>
                    </Paper>
                ) : (
                    <Grid container spacing={3}>
                        {tasks.map((task) => (
                            <Grid item xs={12} sm={6} md={4} key={task._id}>
                                <TaskCard task={task} onMenuOpen={handleMenuOpen} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>

            {/* Context Menu */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEditClick}>
                    <Edit fontSize="small" sx={{ mr: 1 }} />
                    Edit Task
                </MenuItem>
                <MenuItem onClick={handleDeleteClick}>
                    <Delete fontSize="small" sx={{ mr: 1 }} />
                    Delete Task
                </MenuItem>
            </Menu>

            {/* Dialogs */}
            <AddTaskDialog
                open={isAddTaskOpen}
                projectId={projectId || ''}
                onClose={() => {
                    setIsAddTaskOpen(false);
                    refetch();
                }}
            />

            <EditTaskDialog
                open={isEditDialogOpen}
                task={selectedTask}
                onClose={() => {
                    setIsEditDialogOpen(false);
                    setSelectedTask(null);
                }}
                onSave={handleEditSave}
                availableUsers={availableUsers}
            />

            <DeleteDialog
                open={isDeleteDialogOpen}
                task={selectedTask}
                onClose={() => {
                    setIsDeleteDialogOpen(false);
                    setSelectedTask(null);
                }}
                onConfirm={handleDeleteConfirm}
            />

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ProjectDetails;