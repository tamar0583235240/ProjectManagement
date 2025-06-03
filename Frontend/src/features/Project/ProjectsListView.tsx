import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import type { Project } from "../../types/Project"
import formatDate from "./formatDate"

interface ProjectsListViewProps {
  projects: Project[]
  onEdit: (project: Project) => void
  onDelete: (projectId: string) => void
}

const ProjectsListView = ({ projects, onEdit, onDelete }: ProjectsListViewProps) => {
  const navigate = useNavigate()

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {projects.map((project, index) => (
        <Box key={project._id}>
          <ListItem alignItems="flex-start">
            <Box
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={() => navigate(`/app/projects/${project._id}`)}
            >
              <ListItemText
                primary={
                  <Typography variant="h6" component="span">
                    {project.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {project.client}
                    </Typography>
                    {" — " + project.description}
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      Start: {formatDate(project.startDate)} | Due: {formatDate(project.dueDate)}
                    </Typography>
                  </>
                }
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton onClick={() => onEdit(project)} aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(project._id)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>
          {index < projects.length - 1 && <Divider component="li" />}
        </Box>
      ))}
    </List>
  )
}

export default ProjectsListView
