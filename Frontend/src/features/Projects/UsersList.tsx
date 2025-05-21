import React from 'react';
import {
  Box, Typography, Stack, Button, List, ListItem, ListItemText,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

interface User {
  _id?: string;
  email: string;
  user_name: string;
}

interface UsersListProps {
  users: User[];
  onAddUser: () => void;
  onEditUser: (index: number) => void;
  onDeleteUser: (index: number) => void;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  onAddUser,
  onEditUser,
  onDeleteUser
}) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">משתמשים מורשים</Typography>
        <Button 
          startIcon={<AddIcon />} 
          variant="contained" 
          onClick={onAddUser}
        >
          הוסף משתמש
        </Button>
      </Stack>
      
      <List sx={{ bgcolor: 'background.paper', mt: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        {users.length === 0 ? (
          <ListItem>
            <ListItemText primary="אין משתמשים מורשים" />
          </ListItem>
        ) : (
          users.map((user, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <Box>
                  <IconButton edge="end" onClick={() => onEditUser(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => onDeleteUser(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText 
                primary={user.user_name} 
                secondary={user.email} 
              />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default UsersList;
