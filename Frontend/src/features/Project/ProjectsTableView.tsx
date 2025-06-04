import React from "react"
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
import { MoreVert } from "@mui/icons-material"
import { format, differenceInDays, parseISO, isValid } from "date-fns"
import { useNavigate } from "react-router-dom"
import { type Project, getStatusInfo } from "../../types/Project"

interface ProjectsTableViewProps {
  projects: Project[]
  onMenuOpen: (event: React.MouseEvent<HTMLElement>, project: Project) => void
}

const ProjectsTableView: React.FC<ProjectsTableViewProps> = ({ projects, onMenuOpen }) => {
  const theme = useTheme()
  const navigate = useNavigate()

  const getDaysRemaining = (deadline: string) => {
    try {
      const today = new Date()
      const deadlineDate = new Date(deadline)
      return differenceInDays(deadlineDate, today)
    } catch {
      return 0
    }
  }

  return (
    <Box sx={{ overflowX: "auto" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Project Manager</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Days Remaining</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => {
              const daysRemaining = getDaysRemaining(project.deadline)
              const statusInfo = getStatusInfo(project.status)

              return (
                <TableRow
                  key={project._id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/app/projects/${project._id}`)}
                >
                  <TableCell>
                    <Typography fontWeight="medium">{project.project_name}</Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>
                    <Typography noWrap title={project.description}>
                      {project.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={statusInfo.label}
                      sx={{ bgcolor: statusInfo.color, color: "white" }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{project.project_manager_id?.user_name || "Not Assigned"}</TableCell>
                  <TableCell>
                    {(() => {
                      const deadline = typeof project.deadline === "string"
                        ? parseISO(project.deadline)
                        : new Date(project.deadline)

                      return isValid(deadline) ? format(deadline, "dd/MM/yyyy") : "—"
                    })()}
                  </TableCell>

                  <TableCell
                    sx={{
                      color:
                        daysRemaining < 0
                          ? theme.palette.error.main
                          : daysRemaining <= 3
                            ? theme.palette.warning.main
                            : "inherit",
                    }}
                  >
                    {daysRemaining < 0
                      ? `${Math.abs(daysRemaining)} days overdue`
                      : `${daysRemaining} days`}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        onMenuOpen(e, project)
                      }}
                    >
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ProjectsTableView
