// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardActions,
//   Typography,
//   Chip,
//   IconButton,
//   Menu,
//   MenuItem,
//   Box,
//   Avatar,
//   Tooltip
// } from "@mui/material";
// import {
//   MoreVert,
//   Edit,
//   Delete,
//   Email,
//   Person,
//   CalendarToday
// } from "@mui/icons-material";
// import { format } from "date-fns";

// const roleColors = {
//   "EMPLOYEE": { backgroundColor: "#e0f7fa", color: "#00695c" },
//   "MANAGER": { backgroundColor: "#ffebee", color: "#c62828" },
//   "TEAMLEADER": { backgroundColor: "#e8f5e8", color: "#2e7d32" }
// };

// const roleLabels = {
//   "EMPLOYEE": "Employee",
//   "MANAGER": "Manager", 
//   "TEAMLEADER": "Team Leader"
// };

// export default function EmployeeCard({ employee, onEdit, onDelete, allEmployees = [] }) {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleEdit = () => {
//     onEdit(employee);
//     handleMenuClose();
//   };

//   const handleDelete = () => {
//     onDelete(employee);
//     handleMenuClose();
//   };

//   // Find manager name
//   const manager = employee.manager_id ? 
//     allEmployees.find(emp => emp.id === employee.manager_id) : null;

//   return (
//     <Card 
//       sx={{ 
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         transition: 'all 0.3s ease',
//         '&:hover': { 
//           boxShadow: 6,
//           transform: 'translateY(-2px)'
//         },
//         background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
//         border: '1px solid #e0e0e0'
//       }}
//     >
//       <CardContent sx={{ flexGrow: 1, pb: 1 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Avatar 
//               sx={{ 
//                 width: 48, 
//                 height: 48,
//                 background: 'linear-gradient(135deg, #00bcd4 0%, #26c6da 100%)',
//                 fontSize: '1.2rem',
//                 fontWeight: 600
//               }}
//             >
//               {employee.user_name?.charAt(0)?.toUpperCase()}
//             </Avatar>
//             <Box>
//               <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
//                 {employee.user_name}
//               </Typography>
//               <Chip
//                 label={roleLabels[employee.role] || employee.role}
//                 size="small"
//                 sx={{
//                   mt: 0.5,
//                   ...roleColors[employee.role],
//                   fontWeight: 500,
//                   fontSize: '0.75rem'
//                 }}
//               />
//             </Box>
//           </Box>
//           <IconButton
//             onClick={handleMenuOpen}
//             size="small"
//             sx={{ 
//               opacity: 0.7,
//               '&:hover': { opacity: 1 }
//             }}
//           >
//             <MoreVert />
//           </IconButton>
//         </Box>

//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <Email sx={{ fontSize: 16, color: '#666' }} />
//             <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
//               {employee.email}
//             </Typography>
//           </Box>

//           {manager && (
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Person sx={{ fontSize: 16, color: '#666' }} />
//               <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
//                 Manager: {manager.user_name}
//               </Typography>
//             </Box>
//           )}

//           {employee.created_date && (
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <CalendarToday sx={{ fontSize: 16, color: '#666' }} />
//               <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
//                 Created: {format(new Date(employee.created_date), "MMM d, yyyy")}
//               </Typography>
//             </Box>
//           )}
//         </Box>
//       </CardContent>

//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleMenuClose}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'right',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//       >
//         <MenuItem onClick={handleEdit}>
//           <Edit sx={{ mr: 1, fontSize: 18 }} />
//           Edit
//         </MenuItem>
//         <MenuItem onClick={handleDelete} sx={{ color: '#f44336' }}>
//           <Delete sx={{ mr: 1, fontSize: 18 }} />
//           Delete
//         </MenuItem>
//       </Menu>
//     </Card>
//   );
// }

"use client"

import React from "react"
import { Card, CardContent, Typography, Chip, IconButton, Menu, MenuItem, Box, Avatar } from "@mui/material"
import { MoreVert, Edit, Delete, Email, Person, CalendarToday } from "@mui/icons-material"
import type { User } from "../../types/User"

const roleColors = {
  EMPLOYEE: { backgroundColor: "#e0f7fa", color: "#00695c" },
  MANAGER: { backgroundColor: "#ffebee", color: "#c62828" },
  TEAMLEADER: { backgroundColor: "#e8f5e8", color: "#2e7d32" },
}

const roleLabels = {
  EMPLOYEE: "Employee",
  MANAGER: "Manager",
  TEAMLEADER: "Team Leader",
}

interface EmployeeCardProps {
  employee: User
  onEdit: (employee: User) => void
  onDelete: (employee: User) => void
  allEmployees?: User[]
}

export default function EmployeeCard({ employee, onEdit, onDelete, allEmployees = [] }: EmployeeCardProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    onEdit(employee)
    handleMenuClose()
  }

  const handleDelete = () => {
    onDelete(employee)
    handleMenuClose()
  }

  // Find manager name
  const manager = employee.manager_id ? allEmployees.find((emp) => emp._id === employee.manager_id) : null

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch {
      return null
    }
  }

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-2px)",
        },
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        border: "1px solid #e0e0e0",
      }}
    >
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: "linear-gradient(135deg, #00bcd4 0%, #26c6da 100%)",
                fontSize: "1.2rem",
                fontWeight: 600,
              }}
            >
              {employee.user_name?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
            <Box>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                {employee.user_name || "Unknown User"}
              </Typography>
              <Chip
                label={roleLabels[employee.role as keyof typeof roleLabels] || employee.role}
                size="small"
                sx={{
                  mt: 0.5,
                  ...roleColors[employee.role as keyof typeof roleColors],
                  fontWeight: 500,
                  fontSize: "0.75rem",
                }}
              />
            </Box>
          </Box>
          <IconButton onClick={handleMenuOpen} size="small" sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}>
            <MoreVert />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Email sx={{ fontSize: 16, color: "#666" }} />
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
              {employee.email}
            </Typography>
          </Box>

          {manager && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Person sx={{ fontSize: 16, color: "#666" }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
                Manager: {manager.user_name}
              </Typography>
            </Box>
          )}

          {employee.created_date && formatDate(employee.created_date) && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarToday sx={{ fontSize: 16, color: "#666" }} />
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
                Created: {formatDate(employee.created_date)}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Edit sx={{ mr: 1, fontSize: 18 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: "#f44336" }}>
          <Delete sx={{ mr: 1, fontSize: 18 }} />
          Delete
        </MenuItem>
      </Menu>
    </Card>
  )
}
