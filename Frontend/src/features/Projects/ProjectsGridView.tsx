"use client"

import type React from "react"
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  IconButton,
  Stack,
} from "@mui/material"
import { MoreVert, CalendarToday, AccessTime, Person } from "@mui/icons-material"
import { format, differenceInDays } from "date-fns"
import { type Project, getStatusInfo, getRandomProgress } from "../../types/Project"

interface ProjectsGridViewProps {
  projects: Project[]
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, project: Project) => void
}

export const ProjectsGridView: React.FC<ProjectsGridViewProps> = ({ projects, onMenuOpen }) => {
  // חישוב ימים שנותרו
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
    <Grid container spacing={3}>
      {projects.map((project) => {
        const daysRemaining = getDaysRemaining(project.deadline)
        const progress = getRandomProgress(project._id)
        const statusInfo = getStatusInfo(project.status)

        return (
          <Grid xs={12} sm={6} md={4} lg={3} key={project._id}>
            <Card elevation={3} sx={{ height: "100%" }}>
              <CardContent sx={{ pb: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography variant="h6" component="h3" noWrap sx={{ maxWidth: "80%" }}>
                    {project.project_name}
                  </Typography>
                  <IconButton size="small" onClick={(e) => onMenuOpen(e, project)} aria-label="פעולות נוספות">
                    <MoreVert />
                  </IconButton>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    height: 40,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {project.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={statusInfo.label}
                    sx={{
                      bgcolor: statusInfo.color,
                      color: "white",
                    }}
                    size="small"
                  />
                </Box>

                <Stack spacing={1.5} sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarToday fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      תאריך יעד: {format(new Date(project.deadline), "dd/MM/yyyy")}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <AccessTime fontSize="small" color="action" />
                    <Typography variant="body2" color={daysRemaining < 0 ? "error" : "text.secondary"}>
                      {daysRemaining < 0 ? `באיחור של ${Math.abs(daysRemaining)} ימים` : `${daysRemaining} ימים נותרו`}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Person fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {project.project_manager_id?.user_name || "לא מוגדר"}
                    </Typography>
                  </Box>
                </Stack>

                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="body2">התקדמות:</Typography>
                    <Typography variant="body2">{progress}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 1 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}
export default ProjectsGridView