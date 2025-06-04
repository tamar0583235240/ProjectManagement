import useCurrentUser from "../hooks/useCurrentUser";
import useInitialize from "../hooks/useInitialize";
const HomePage = () => {
  const user = useCurrentUser();
  useInitialize();
  return ( 
  
    <div>
      <h1>hello {user.user_name}</h1>
    </div>
  )
}

export default HomePage;


// import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
// import useInitialize from "../hooks/useInitialize";
// import useCurrentUser from "../hooks/useCurrentUser";
// import { useSelector } from "react-redux";
// import { selectAllProjects, selectProjectsCount } from "../features/Project/projectSlice";
// import { useGetTasksByManagerIdQuery } from "../features/Task/taskApi";
// import { selectCurrentManagerId } from "../features/auth/userSlice";

// const getGreeting = () => {
//   const hour = new Date().getHours();
//   if (hour < 12) return "בוקר טוב";
//   if (hour < 18) return "צהריים טובים";
//   return "ערב טוב";
// };

// const HomePage = () => {
//   useInitialize();
//   const user = useCurrentUser();
//   const currentManagerId = useSelector(selectCurrentManagerId);
//   const projects = useSelector(selectAllProjects);
//   const projectsCount = useSelector(selectProjectsCount);
//   const { data: tasks = [] } = useGetTasksByManagerIdQuery(currentManagerId!, { skip: !currentManagerId });

//   return (
//     <Box p={4}>
//       <Typography variant="h4" gutterBottom>
//         {getGreeting()} {user?.user_name} 👋
//       </Typography>
//       <Typography variant="subtitle1" gutterBottom>
//         תפקיד: {user?.role} | ארגון: {user?.organization_name}
//       </Typography>

//       <Grid container spacing={3} mt={2}>
//         <Grid item xs={12} sm={6} md={4}>
//           <Card sx={{ bgcolor: "#f5f5f5" }}>
//             <CardContent>
//               <Typography variant="h6">כמות פרויקטים</Typography>
//               <Typography variant="h4">{projectsCount}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={4}>
//           <Card sx={{ bgcolor: "#f5f5f5" }}>
//             <CardContent>
//               <Typography variant="h6">כמות משימות</Typography>
//               <Typography variant="h4">{tasks.length}</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Box mt={4}>
//         <Typography variant="h6">פרויקטים פעילים</Typography>
//         <Grid container spacing={2} mt={1}>
//           {projects.slice(0, 3).map((project) => (
//             <Grid item xs={12} sm={6} md={4} key={project._id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="subtitle1">{project.name}</Typography>
//                   <Typography variant="body2">{project.description}</Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default HomePage;
// src/pages/HomePage.tsx

// import { Box, Typography, Card, CardContent, Grid } from "@mui/material";
// import useInitialize from "../hooks/useInitialize";
// import useCurrentUser from "../hooks/useCurrentUser";
// import { useSelector } from "react-redux";
// import { selectAllProjects, selectProjectsCount } from "../features/Project/projectSlice";
// // import { useGetTasksByManagerIdQuery } from "../features/Task/taskApi";
// import { selectCurrentManagerId } from "../features/auth/userSlice";
// import { useGetTasksByManagerIdQuery } from "../features/Tasks/tasksApi";

// const getGreeting = () => {
//   const hour = new Date().getHours();
//   if (hour < 12) return "בוקר טוב";
//   if (hour < 18) return "צהריים טובים";
//   return "ערב טוב";
// };

// const HomePage = () => {
//   useInitialize();
//   const user = useCurrentUser();
//   const currentManagerId = useSelector(selectCurrentManagerId);
//   const projects = useSelector(selectAllProjects);
//   const projectsCount = useSelector(selectProjectsCount);
//   const { data: tasks = [] } = useGetTasksByManagerIdQuery(currentManagerId!, { skip: !currentManagerId });

//   return (
//     <Box p={4}>
//       <Typography variant="h4" gutterBottom>
//         {getGreeting()} {user?.user_name} 
//       </Typography>

//       <Typography variant="subtitle1" gutterBottom>
//         תפקיד: {user?.role} | ארגון: {user?.organization_name}
//       </Typography>

//       <Grid container spacing={3} mt={2}>
//         {/* כרטיס מידע על פרויקטים */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Card elevation={1}>
//             <CardContent>
//               <Typography variant="h6" color="text.secondary">
//                 כמות פרויקטים
//               </Typography>
//               <Typography variant="h4" color="primary">
//                 {projectsCount}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* כרטיס מידע על משימות */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Card elevation={1}>
//             <CardContent>
//               <Typography variant="h6" color="text.secondary">
//                 כמות משימות
//               </Typography>
//               <Typography variant="h4" color="primary">
//                 {tasks.length}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* רשימת פרויקטים פעילים */}
//       <Box mt={5}>
//         <Typography variant="h6" gutterBottom>
//           פרויקטים פעילים
//         </Typography>

//         <Grid container spacing={2}>
//           {projects.slice(0, 3).map((project) => (
//             <Grid item xs={12} sm={6} md={4} key={project._id}>
//               <Card elevation={1}>
//                 <CardContent>
//                   <Typography variant="subtitle1" fontWeight={500}>
//                     {project.project_name}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {project.description}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default HomePage;
