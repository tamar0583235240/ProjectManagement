import React from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";

interface ValidatedUser {
  _id: string;
  user_name: string;
  email: string;
}

interface AuthorizedUsersListProps {
  users: ValidatedUser[];
  onEdit: (user: ValidatedUser) => void;
  onDelete: (userId: string) => void;
}

const AuthorizedUsersList: React.FC<AuthorizedUsersListProps> = ({
  users,
  onEdit,
  onDelete,
}) => {
  if (users.length === 0) {
    return (
      <Box 
        sx={{ 
          mt: 2, 
          mb: 2, 
          p: 3,
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 1,
          textAlign: "center"
        }}
      >
        <PersonIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
        <Typography variant="body2" color="text.secondary">
          No authorized users added yet
        </Typography>
        <Typography variant="caption" color="text.disabled">
          Click "Add User" to get started
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Chip 
          label={`${users.length} user${users.length !== 1 ? 's' : ''}`} 
          size="small" 
          color="primary" 
          variant="outlined"
        />
      </Box>
      
      <List dense sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 1 }}>
        {users.map((user, index) => (
          <ListItem
            key={user._id}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              mb: 1,
              bgcolor: "background.default",
              "&:last-child": { mb: 0 },
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <ListItemText
              primary={
                <Typography variant="subtitle2" component="div">
                  {user.user_name}
                </Typography>
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <IconButton 
                edge="end" 
                aria-label="edit" 
                onClick={() => onEdit(user)} 
                size="small"
                sx={{ mr: 0.5 }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton 
                edge="end" 
                aria-label="delete" 
                onClick={() => onDelete(user._id)} 
                size="small"
                color="error"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AuthorizedUsersList;