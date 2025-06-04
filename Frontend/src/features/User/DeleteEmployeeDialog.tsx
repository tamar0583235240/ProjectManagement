// // import React from "react";
// // import {
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Button,
// //   Typography,
// //   Box,
// //   Alert
// // } from "@mui/material";
// // import {
// //   Delete,
// //   Warning,
// //   Close
// // } from "@mui/icons-material";

import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

// // const DeleteEmployeeDialog = ({ 
// //   open, 
// //   onClose, 
// //   employee, 
// //   onConfirm, 
// //   isLoading 
// // }) => {
// //   return (
// //     <Dialog 
// //       open={open} 
// //       onClose={onClose}
// //       maxWidth="sm"
// //       fullWidth
// //       PaperProps={{
// //         sx: {
// //           borderRadius: 2
// //         }
// //       }}
// //     >
// //       <DialogTitle sx={{ 
// //         display: 'flex', 
// //         alignItems: 'center',
// //         gap: 2,
// //         color: '#d32f2f'
// //       }}>
// //         <Warning />
// //         Delete Employee
// //       </DialogTitle>
      
// //       <DialogContent>
// //         <Alert 
// //           severity="warning" 
// //           sx={{ mb: 2 }}
// //         >
// //           This action cannot be undone
// //         </Alert>
        
// //         <Typography variant="body1" sx={{ mb: 2 }}>
// //           Are you sure you want to delete employee{" "}
// //           <Typography component="span" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
// //             {employee?.user_name}
// //           </Typography>
// //           ?
// //         </Typography>
        
// //         <Typography variant="body2" color="text.secondary">
// //           All information related to this employee will be permanently removed from the system.
// //         </Typography>
// //       </DialogContent>
      
// //       <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
// //         <Button 
// //           onClick={onClose}
// //           disabled={isLoading}
// //           variant="outlined"
// //           startIcon={<Close />}
// //         >
// //           Cancel
// //         </Button>
// //         <Button
// //           onClick={() => onConfirm(employee)}
// //           disabled={isLoading}
// //           variant="contained"
// //           color="error"
// //           startIcon={<Delete />}
// //         >
// //           {isLoading ? "Deleting..." : "Delete Employee"}
// //         </Button>
// //       </DialogActions>
// //     </Dialog>
// //   );
// // }

// // export default DeleteEmployeeDialog;
// "use client"

// import type React from "react"
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Alert } from "@mui/material"
// import { Delete, Warning, Close } from "@mui/icons-material"
// import type { User } from "../../types/User"

// interface DeleteEmployeeDialogProps {
//   open: boolean
//   onClose: () => void
//   employee: User| null
//   onConfirm: (employee: User) => void
//   isLoading: boolean
// }

// const DeleteEmployeeDialog: React.FC<DeleteEmployeeDialogProps> = ({
//   open,
//   onClose,
//   employee,
//   onConfirm,
//   isLoading,
// }) => {
//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="sm"
//       fullWidth
//       PaperProps={{
//         sx: { borderRadius: 2 },
//       }}
//     >
//       <DialogTitle
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           gap: 2,
//           color: "#d32f2f",
//         }}
//       >
//         <Warning />
//         Delete Employee
//       </DialogTitle>

//       <DialogContent>
//         <Alert severity="warning" sx={{ mb: 2 }}>
//           This action cannot be undone
//         </Alert>

//         <Typography variant="body1" sx={{ mb: 2 }}>
//           Are you sure you want to delete employee{" "}
//           <Typography component="span" sx={{ fontWeight: 600, color: "#1a1a1a" }}>
//             {employee?.user_name}
//           </Typography>
//           ?
//         </Typography>

//         <Typography variant="body2" color="text.secondary">
//           All information related to this employee will be permanently removed from the system.
//         </Typography>
//       </DialogContent>

//       <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
//         <Button onClick={onClose} disabled={isLoading} variant="outlined" startIcon={<Close />}>
//           Cancel
//         </Button>
//         <Button
//           onClick={() => employee && onConfirm(employee)}
//           disabled={isLoading}
//           variant="contained"
//           color="error"
//           startIcon={<Delete />}
//         >
//           {isLoading ? "Deleting..." : "Delete Employee"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }

// export default DeleteEmployeeDialog
const DeleteEmployeeDialog = ({ open, onClose, employee, onConfirm, isLoading }: { open: boolean, onClose: () => void, employee: User | null, onConfirm: (employee: User) => Promise<void>, isLoading: boolean }) => {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 3 } }} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ background: "linear-gradient(135deg, #D32F2F 0%, #EF5350 100%)", color: "white", fontWeight: 600, px: 3, py: 2 }}>
        Confirm Deletion
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 2, pb: 3, px: 3 }}>
        <Typography variant="body1">
          Are you sure you want to delete employee{" "}
          <Typography component="span" sx={{ fontWeight: 600, color: '#d32f2f' }}>
            {employee?.user_name} ({employee?.email})
          </Typography>
          ? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
        <Button onClick={onClose} disabled={isLoading} sx={{ borderRadius: 1.5 }}>Cancel</Button>
        <Button
          onClick={() => employee && onConfirm(employee)}
          variant="contained"
          color="error"
          disabled={isLoading}
          sx={{
            boxShadow: 3,
            px: 3,
            py: 1,
            borderRadius: 1.5,
            "&:hover": {
              boxShadow: 6,
            },
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteEmployeeDialog