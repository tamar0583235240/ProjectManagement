import React, { useState } from "react"
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  ThemeProvider,
  CssBaseline,
} from "@mui/material"
import {
  Add,
  Edit,
  Delete,
  ViewModule,
  ViewList,
  ViewHeadline,
} from "@mui/icons-material"
import type { Project } from "../../types/Project"
import { useDeleteProjectMutation, useUpdateProjectMutation } from "./projectApi"
import SummaryCards from "./SummaryCards"
import ProjectCharts from "./ProjectCharts"
import FilterPanel, { type FilterValues } from "./FilterPanel"
import ProjectsGridView from "./ProjectsGridView"
import ProjectsTableView from "./ProjectsTableView"
import ProjectsListView from "./ProjectsListView"
import EditDialog from "./EditDialog"
import AddProjectDialog from "./AddProjectDialog"
import theme from "../../theme/theme"
import DeleteDialog from "./DeleteDialog"
import { Status } from "../../types/Status"

const TabPanel = ({
  children,
  value,
  index,
}: {
  children: React.ReactNode
  value: number
  index: number
}) => {
  return value === index ? <Box sx={{ pt: 2 }}>{children}</Box> : null
}

const ProjectsDashboard = ({ initialProjects }: { initialProjects: Project[] }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(initialProjects)
  const [tabValue, setTabValue] = useState(0)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  })

  const [deleteProject] = useDeleteProjectMutation()
  const [updateProject] = useUpdateProjectMutation()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, project: Project) => {
    setSelectedProject(project)
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => setAnchorEl(null)

  const handleEditProject = () => {
    setIsEditDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteProject = () => {
    setIsDeleteDialogOpen(true)
    handleMenuClose()
  }

  const confirmDelete = async () => {
    if (!selectedProject?._id) return

    try {
      await deleteProject(selectedProject._id).unwrap()
      const updated = projects.filter((p) => p._id !== selectedProject._id)
      setProjects(updated)
      setFilteredProjects(updated)
      setSnackbar({ open: true, message: "Project deleted successfully.", severity: "success" })
    } catch {
      setSnackbar({ open: true, message: "Failed to delete project.", severity: "error" })
    } finally {
      setIsDeleteDialogOpen(false)
      setSelectedProject(null)
    }
  }

  const saveProjectChanges = async (updatedProject: Project) => {
    try {
      const projectToSend = {
        ...updatedProject,
        project_manager_id:
          typeof updatedProject.project_manager_id === "object"
            ? updatedProject.project_manager_id._id
            : updatedProject.project_manager_id,
        organization:
          typeof updatedProject.organization === "object"
            ? updatedProject.organization_id
            : updatedProject.organization,
      }

      const result = await updateProject(projectToSend).unwrap()
      const updated = projects.map((p) => (p._id === result._id ? result : p))
      setProjects(updated)
      setFilteredProjects(updated)
      setSnackbar({ open: true, message: "Project updated successfully.", severity: "success" })
    } catch {
      setSnackbar({ open: true, message: "Failed to update project.", severity: "error" })
    } finally {
      setIsEditDialogOpen(false)
    }
  }

  const handleAddProject = (newProject: Project) => {
    const projectToAdd = {
      ...newProject,
      status: Status.NOT_STARTED,
    }
    setProjects((prev) => [projectToAdd, ...prev])
    setFilteredProjects((prev) => [projectToAdd, ...prev])
    setIsAddDialogOpen(false)
    setSnackbar({ open: true, message: "Project added successfully.", severity: "success" })
  }

  const handleFilterToggle = () => setIsFilterOpen((prev) => !prev)

  const handleFilterApply = (filters: FilterValues) => {
    let filtered = [...projects]

    if (filters.status) filtered = filtered.filter((p) => p.status === filters.status)
    if (filters.manager) filtered = filtered.filter((p) => p.manager === filters.manager)

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom)
      filtered = filtered.filter((p) => new Date(p.startDate) >= fromDate)
    }
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo)
      filtered = filtered.filter((p) => new Date(p.startDate) <= toDate)
    }
    setFilteredProjects(filtered)
  }

  const handleFilterReset = () => {
    setFilteredProjects(projects)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Projects Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ mb: 2 }}
          onClick={() => setIsAddDialogOpen(true)}
        >
          Add Project
        </Button>

        <FilterPanel
          open={isFilterOpen}
          onToggle={handleFilterToggle}
          onFilter={handleFilterApply}
          onReset={handleFilterReset}
        />

        <SummaryCards projects={filteredProjects} />
        <ProjectCharts projects={filteredProjects} />

        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          aria-label="project views"
          sx={{ mb: 3 }}
        >
          <Tab icon={<ViewModule />} label="Grid" />
          <Tab icon={<ViewList />} label="Table" />
          <Tab icon={<ViewHeadline />} label="List" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <ProjectsGridView
            projects={filteredProjects}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            onMenuOpen={handleMenuOpen}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ProjectsTableView
            projects={filteredProjects}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            onMenuOpen={handleMenuOpen}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <ProjectsListView
            projects={filteredProjects}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            onMenuOpen={handleMenuOpen}
          />
        </TabPanel>

        <EditDialog
          open={isEditDialogOpen}
          project={selectedProject}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={saveProjectChanges}
        />

        <AddProjectDialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAdd={handleAddProject}
        />

        <DeleteDialog
          open={isDeleteDialogOpen}
          project={selectedProject}
          onCancel={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
        />

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleEditProject}>
            <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
          </MenuItem>
          <MenuItem onClick={handleDeleteProject}>
            <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
          </MenuItem>
        </Menu>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  )
}

export default ProjectsDashboard
