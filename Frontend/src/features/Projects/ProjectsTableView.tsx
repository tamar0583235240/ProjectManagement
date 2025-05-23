"use client"

import type React from "react"
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Chip,
  Box,
  IconButton,
  useTheme,
} from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"
import { format, differenceInDays } from "date-fns"
import { type Project, getStatusInfo } from "../../types/Project"

interface ProjectsTableViewProps {
  projects: Project[]
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
}

export const ProjectsTableView: React.FC<ProjectsTableViewProps> = ({ projects, onEdit, onDelete }) => {
  const theme = useTheme()

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
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">שם הפרויקט</TableCell>
            <TableCell align="right">תיאור</TableCell>
            <TableCell align="right">סטטוס</TableCell>
            <TableCell align="right">מנהל פרויקט</TableCell>
            <TableCell align="right">תאריך יעד</TableCell>
            <TableCell align="right">ימים שנותרו</TableCell>
            <TableCell align="right">פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => {
            const daysRemaining = getDaysRemaining(project.deadline)
            const statusInfo = getStatusInfo(project.status)

            return (
              <TableRow key={project._id} hover>
                <TableCell align="right" component="th" scope="row">
                  <Typography fontWeight="medium">{project.project_name}</Typography>
                </TableCell>
                <TableCell align="right" sx={{ maxWidth: 200 }}>
                  <Typography noWrap>{project.description}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Chip
                    label={statusInfo.label}
                    sx={{
                      bgcolor: statusInfo.color,
                      color: "white",
                    }}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">{project.project_manager_id?.user_name || "לא מוגדר"}</TableCell>
                <TableCell align="right">{format(new Date(project.deadline), "dd/MM/yyyy")}</TableCell>
                <TableCell align="right" sx={{ color: daysRemaining < 0 ? theme.palette.error.main : "inherit" }}>
                  {daysRemaining < 0 ? `${Math.abs(daysRemaining)} ימים באיחור` : `${daysRemaining} ימים`}
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                    <IconButton size="small" color="primary" onClick={() => onEdit(project)}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => onDelete(project)}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default ProjectsTableView