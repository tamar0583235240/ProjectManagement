// // import React from "react"
// // import {
// //   List,
// //   ListItem,
// //   ListItemText,
// //   ListItemSecondaryAction,
// //   IconButton,
// //   Chip,
// //   Divider,
// //   Box,
// //   Typography,
// //   useTheme,
// // } from "@mui/material"
// // import { MoreVert, CalendarToday, AccessTime, Person } from "@mui/icons-material"
// // import { format, differenceInDays } from "date-fns"
// // import { type Project, getStatusInfo } from "../../types/Project"

// // interface ProjectsListViewProps {
// //   projects: Project[]
// //   onMenuOpen: (event: React.MouseEvent<HTMLElement>, project: Project) => void
// // }

// // const ProjectsListView: React.FC<ProjectsListViewProps> = ({ projects, onMenuOpen }) => {
// //   const theme = useTheme()

// //   // Calculate remaining days
// //   const getDaysRemaining = (deadline: string) => {
// //     try {
// //       const today = new Date()
// //       const deadlineDate = new Date(deadline)
// //       return differenceInDays(deadlineDate, today)
// //     } catch (error) {
// //       console.warn("Invalid date format:", deadline)
// //       return 0
// //     }
// //   }

// //   return (
// //     <List sx={{ width: "100%", bgcolor: "background.paper" }}>
// //       {projects.map((project, index) => {
// //         const daysRemaining = getDaysRemaining(project.deadline)
// //         const statusInfo = getStatusInfo(project.status)

// //         return (
// //           <React.Fragment key={project._id}>
// //             <ListItem alignItems="flex-start" sx={{ py: 2 }}>
// //               <ListItemText
// //                 primary={
// //                   <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
// //                     <Typography variant="h6" component="span">
// //                       {project.project_name}
// //                     </Typography>
// //                     <Chip
// //                       label={statusInfo.label}
// //                       sx={{
// //                         bgcolor: statusInfo.color,
// //                         color: "white",
// //                       }}
// //                       size="small"
// //                     />
// //                   </Box>
// //                 }
// //                 secondary={
// //                   <Box sx={{ mt: 1 }}>
// //                     <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
// //                       {project.description}
// //                     </Typography>
// //                     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 2 }}>
// //                       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //                         <CalendarToday fontSize="small" color="action" />
// //                         <Typography variant="body2" color="text.secondary">
// //                           {format(new Date(project.deadline), "dd/MM/yyyy")}
// //                         </Typography>
// //                       </Box>
// //                       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //                         <AccessTime fontSize="small" color="action" />
// //                         <Typography 
// //                           variant="body2" 
// //                           color={
// //                             daysRemaining < 0 
// //                               ? "error" 
// //                               : daysRemaining <= 3
// //                               ? "warning.main"
// //                               : "text.secondary"
// //                           }
// //                         >
// //                           {daysRemaining < 0
// //                             ? `Overdue by ${Math.abs(daysRemaining)} days`
// //                             : `${daysRemaining} days remaining`}
// //                         </Typography>
// //                       </Box>
// //                       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //                         <Person fontSize="small" color="action" />
// //                         <Typography variant="body2" color="text.secondary">
// //                           {project.project_manager_id?.user_name || "Not assigned"}
// //                         </Typography>
// //                       </Box>
// //                     </Box>
// //                   </Box>
// //                 }
// //               />
// //               <ListItemSecondaryAction>
// //                 <IconButton 
// //                   edge="end" 
// //                   onClick={(e) => onMenuOpen(e, project)}
// //                   aria-label={`Menu for ${project.project_name}`}
// //                 >
// //                   <MoreVert />
// //                 </IconButton>
// //               </ListItemSecondaryAction>
// //             </ListItem>
// //             {index < projects.length - 1 && <Divider variant="inset" component="li" />}
// //           </React.Fragment>
// //         )
// //       })}
// //     </List>
// //   )
// // }

// // export default ProjectsListView

// import {
//   Avatar,
//   Box,
//   Button,
//   Divider,
//   IconButton,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Typography,
// } from '@mui/material'
// import { useNavigate } from 'react-router-dom'
// import DeleteIcon from '@mui/icons-material/Delete'
// import EditIcon from '@mui/icons-material/Edit'
// import type { Project } from '../../types/Project'
// import formatDate from './formatDate'

// interface ProjectsListViewProps {
//   projects: Project[]
//   onEdit: (project: Project) => void
//   onDelete: (projectId: string) => void
// }
// const ProjectsListView = ({
//   projects,
//   onEdit,
//   onDelete,
// }: ProjectsListViewProps) => {
//   const navigate = useNavigate()

//   return (
//     <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
//       {projects.map((project, index) => (
//         <Box key={project._id}>
//           <ListItem alignItems="flex-start">
//             <Box
//               sx={{ flexGrow: 1, cursor: 'pointer' }}
//               onClick={() => navigate(`/app/projects/${project._id}`)}
//             >
//               <ListItemText
//                 primary={
//                   <Typography variant="h6" component="span">
//                     {project.name}
//                   </Typography>
//                 }
//                 secondary={
//                   <>
//                     <Typography
//                       sx={{ display: 'inline' }}
//                       component="span"
//                       variant="body2"
//                       color="text.primary"
//                     >
//                       {project.client}
//                     </Typography>
//                     {' — ' + project.description}
//                     <br />
//                     <Typography variant="caption" color="text.secondary">
//                       Start: {formatDate(project.startDate)} | Due: {formatDate(project.dueDate)}
//                     </Typography>
//                   </>
//                 }
//               />
//             </Box>

//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <IconButton onClick={() => onEdit(project)} aria-label="edit">
//                 <EditIcon />
//               </IconButton>
//               <IconButton onClick={() => onDelete(project._id)} aria-label="delete">
//                 <DeleteIcon />
//               </IconButton>
//             </Box>
//           </ListItem>
//           {index < projects.length - 1 && <Divider component="li" />}
//         </Box>
//       ))}
//     </List>
//   )
// }

// export default ProjectsListView


import {
  Avatar, // לא בשימוש בקומפוננטה זו, ניתן להסיר אם לא נדרש
  Box,
  Button, // לא בשימוש בקומפוננטה זו, ניתן להסיר אם לא נדרש
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar, // לא בשימוש בקומפוננטה זו, ניתן להסיר אם לא נדרש
  ListItemText,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type { Project } from '../../types/Project'; // ודא שהנתיב נכון והטיפוס Project מעודכן
import formatDate from './formatDate'; // ודא שהנתיב נכון

interface ProjectsListViewProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

const ProjectsListView = ({
  projects,
  onEdit,
  onDelete,
}: ProjectsListViewProps) => {
  const navigate = useNavigate();

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {projects.map((project, index) => (
        <Box key={project._id}>
          <ListItem alignItems="flex-start">
            {/* Box for clicking to navigate to project details */}
            <Box
              sx={{ flexGrow: 1, cursor: 'pointer' }}
              onClick={() => navigate(`/app/projects/${project._id}`)}
            >
              <ListItemText
                primary={
                  // שימוש ב-project.project_name במקום project.name
                  <Typography variant="h6" component="span">
                    {project.project_name}
                  </Typography>
                }
                secondary={
                  <>
                    {/* אם project.project_manager_id זמין ואתה רוצה להציג אותו כ"לקוח" או מנהל פרויקט */}
                    {project.project_manager_id?.user_name && (
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {project.project_manager_id.user_name} {/* שימוש ב-project_manager_id.user_name במקום project.client */}
                      </Typography>
                    )}
                    {/* אם אין מנהל פרויקט, אפשר להציג משהו אחר או כלום */}
                    {project.project_manager_id?.user_name ? ' — ' : ''}
                    {project.description} {/* project.description כבר קיים */}
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      {/* שימוש ב-project.deadline במקום startDate ו-dueDate */}
                      Deadline: {formatDate(project.deadline)}
                    </Typography>
                  </>
                }
              />
            </Box>

            {/* Buttons for Edit and Delete */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={(e) => { e.stopPropagation(); onEdit(project); }} aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton onClick={(e) => { e.stopPropagation(); onDelete(project._id); }} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
          {index < projects.length - 1 && <Divider component="li" />}
        </Box>
      ))}
    </List>
  );
};

export default ProjectsListView;