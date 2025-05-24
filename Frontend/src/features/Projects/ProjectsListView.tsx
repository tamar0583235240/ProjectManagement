"use client"

import React from "react"

import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Divider,
  Box,
  Typography,
  useTheme,
} from "@mui/material"
import { Edit, Delete, CalendarToday, AccessTime, Person } from "@mui/icons-material"
import { format, differenceInDays } from "date-fns"
import { type Project, getStatusInfo } from "../../types/Project"

interface ProjectsListViewProps {
  projects: Project[]
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
}

const ProjectsListView: React.FC<ProjectsListViewProps> = ({ projects, onEdit, onDelete }) => {
  const theme = useTheme()

  // Calculate remaining days
  const getDaysRemaining = (deadline: string) => {
    try {
      const today = new Date()
      const deadlineDate = new Date(deadline)
      return differenceInDays(deadlineDate, today)
    } catch (error) {
      console.warn("Invalid date format:", deadline)
      return 0
    }
  }

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {projects.map((project, index) => {
        const daysRemaining = getDaysRemaining(project.deadline)
        const statusInfo = getStatusInfo(project.status)

        return (
          <React.Fragment key={project._id}>
            <ListItem alignItems="flex-start" sx={{ py: 2 }}>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                    <Typography variant="h6" component="span">
                      {project.project_name}
                    </Typography>
                    <Chip
                      label={statusInfo.label}
                      sx={{
                        bgcolor: statusInfo.color,
                        color: "white",
                      }}
                      size="small"
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CalendarToday fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {format(new Date(project.deadline), "dd/MM/yyyy")}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <AccessTime fontSize="small" color="action" />
                        <Typography variant="body2" color={daysRemaining < 0 ? "error" : "text.secondary"}>
                          {daysRemaining < 0
                            ? `Overdue by ${Math.abs(daysRemaining)} days`
                            : `${daysRemaining} days remaining`}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Person fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {project.project_manager_id?.user_name || "Not assigned"}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton edge="end" color="primary" onClick={() => onEdit(project)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" color="error" onClick={() => onDelete(project)}>
                    <Delete />
                  </IconButton>
                </Box>
              </ListItemSecondaryAction>
            </ListItem>
            {index < projects.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        )
      })}
    </List>
  )
}

export default ProjectsListView