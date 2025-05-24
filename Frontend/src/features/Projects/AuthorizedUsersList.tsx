import React from "react"
import {Box, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText,Typography,} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import type { AuthorizedUser } from "../../schemas/SchemaAddProject"


interface AuthorizedUsersListProps {
  users: AuthorizedUser[]
  onEdit: (user: AuthorizedUser) => void
  onDelete: (userId: string) => void
}

const AuthorizedUsersList: React.FC<AuthorizedUsersListProps> = ({
  users,
  onEdit,
  onDelete,
}) => {
  if (users.length === 0) {
    return (
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          No authorized users added yet
        </Typography>
      </Box>
    )
  }

  return (
    <List dense sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 1 }}>
      {users.map((user) => (
        <ListItem
          key={user.id}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            mb: 1,
            "&:last-child": { mb: 0 },
          }}
        >
          <ListItemText
            primary={user.name}
            secondary={user.email}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" onClick={() => onEdit(user)} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(user.id)} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}

export default AuthorizedUsersList