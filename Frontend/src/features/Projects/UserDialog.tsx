// import React from 'react';
// import { 
//   Dialog, DialogTitle, DialogContent, DialogActions, 
//   Button, TextField, Stack, CircularProgress 
// } from '@mui/material';

// interface UserDialogProps {
//   open: boolean;
//   onClose: () => void;
//   userEmail: string;
//   setUserEmail: (email: string) => void;
//   userName: string;
//   setUserName: (name: string) => void;
//   handleAddUser: () => void;
//   isSearching: boolean;
//   isEditing: boolean;
//   setSearchEmail: (email: string) => void;
// }

// const UserDialog: React.FC<UserDialogProps> = ({
//   open,
//   onClose,
//   userEmail,
//   setUserEmail,
//   userName,
//   setUserName,
//   handleAddUser,
//   isSearching,
//   isEditing,
//   setSearchEmail
// }) => {
//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>
//         {isEditing ? 'עריכת משתמש מורשה' : 'הוספת משתמש מורשה'}
//       </DialogTitle>
//       <DialogContent>
//         <Stack spacing={3} sx={{ mt: 1 }}>
//           <TextField
//             label="אימייל"
//             value={userEmail}
//             onChange={(e) => {
//               setUserEmail(e.target.value);
//               setSearchEmail(e.target.value);
//             }}
//             fullWidth
//             required
//             type="email"
//           />
          
//           <TextField
//             label="שם משתמש"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             fullWidth
//             required
//             disabled={isSearching}
//             InputProps={{
//               endAdornment: isSearching ? <CircularProgress size={20} /> : null
//             }}
//           />
//         </Stack>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>ביטול</Button>
//         <Button 
//           variant="contained" 
//           onClick={handleAddUser}
//           disabled={!userEmail || !userName}
//         >
//           {isEditing ? 'עדכון' : 'הוספה'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default UserDialog;
