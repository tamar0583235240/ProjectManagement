// // import type React from "react"
// // import { useState, useEffect } from "react"
// // import {
// //   Box, Typography, Button, Tabs, Tab, Paper, Menu, MenuItem, Snackbar, Alert,
// //   ThemeProvider, createTheme, CssBaseline,
// // } from "@mui/material"
// // import { Add, Edit, Delete, ViewModule, ViewList, ViewHeadline } from "@mui/icons-material"

// // import { ProjectsTableView } from "./ProjectsTableView"
// // import FilterPanel, { type FilterValues } from "./FilterPanel"
// // import { type Project, generateId } from "../../types/Project"
// // import ProjectCharts from "./ProjectCharts"
// // import EditDialog from "./EditDialog"
// // import DeleteDialog from "./DeleteDialog"
// // import AddProjectDialog from "./AddProjectDialog"
// // import SummaryCards from "./SummaryCards"
// // import ProjectsGridView from "./ProjectsGridView"
// // import ProjectsListView from "./ProjectsListView"

// // const theme = createTheme({
// //   palette: {
// //     primary: { main: "#00bcd4" },
// //     secondary: { main: "#ff9800" },
// //   },
// //   typography: {
// //     fontFamily: ["Arial", "sans-serif"].join(","),
// //   },
// //   components: {
// //     MuiCssBaseline: {
// //       styleOverrides: {
// //         body: {
// //           backgroundColor: "#f5f5f5",
// //           margin: 0,
// //           padding: 0,
// //         },
// //       },
// //     },
// //     MuiPopover: { defaultProps: { container: () => document.body } },
// //     MuiPopper: { defaultProps: { container: () => document.body } },
// //     MuiDialog: {
// //       defaultProps: {
// //         container: () => document.body,
// //         disableScrollLock: true,
// //       },
// //     },
// //     MuiModal: {
// //       defaultProps: {
// //         container: () => document.body,
// //         disableScrollLock: true,
// //       },
// //     },
// //   },
// // })

// // function TabPanel({ children, value, index, ...other }: { children: React.ReactNode; value: number; index: number }) {
// //   return (
// //     <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
// //       {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
// //     </div>
// //   )
// // }

// // const ProjectsDashboard = ({ initialProjects }: { initialProjects: Project[] }) => {
// //   const [projects, setProjects] = useState<Project[]>(initialProjects || [])
// //   const [filteredProjects, setFilteredProjects] = useState<Project[]>(initialProjects || [])

// //   const [tabValue, setTabValue] = useState(0)
// //   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
// //   const [selectedProject, setSelectedProject] = useState<Project | null>(null)

// //   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
// //   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
// //   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
// //   const [isFilterOpen, setIsFilterOpen] = useState(false)

// //   const [snackbar, setSnackbar] = useState({
// //     open: false,
// //     message: "",
// //     severity: "success" as "success" | "error",
// //   })

// //   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, project: Project) => {
// //     setSelectedProject(project)
// //     setAnchorEl(event.currentTarget)
// //   }

// //   const handleMenuClose = () => setAnchorEl(null)

// //   const handleEditProject = () => {
// //     setIsEditDialogOpen(true)
// //     handleMenuClose()
// //   }

// //   const handleDeleteProject = () => {
// //     setIsDeleteDialogOpen(true)
// //     handleMenuClose()
// //   }

// //   const confirmDelete = () => {
// //     if (selectedProject) {
// //       setProjects((prev) => prev.filter((p) => p._id !== selectedProject._id))
// //       setSnackbar({ open: true, message: "Project deleted successfully.", severity: "success" })
// //       setIsDeleteDialogOpen(false)
// //     }
// //   }

// //   const saveProjectChanges = (updatedProject: Project) => {
// //     setProjects((prev) => prev.map((p) => (p._id === updatedProject._id ? updatedProject : p)))
// //     setSnackbar({ open: true, message: "Project updated successfully.", severity: "success" })
// //     setIsEditDialogOpen(false)
// //   }

// //   const handleAddProject = (newProject: Project) => {
// //     newProject.status = newProject.status || "Not Started"
// //     setProjects((prev) => [...prev, newProject])
// //     setSnackbar({ open: true, message: "Project added successfully.", severity: "success" })
// //     setIsAddDialogOpen(false)
// //   }

// //   const handleCloseSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }))

// //   const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
// //     setTabValue(newValue)
// //   }

// //   const handleFilter = (filters: FilterValues) => {
// //     let filtered = projects
// //     if (filters.status) filtered = filtered.filter((p) => p.status === filters.status)
// //     if (filters.manager) filtered = filtered.filter((p) => p.manager === filters.manager)
// //     if (filters.startDate && filters.endDate)
// //       filtered = filtered.filter(
// //         (p) => new Date(p.startDate) >= filters.startDate! && new Date(p.endDate) <= filters.endDate!
// //       )
// //     setFilteredProjects(filtered)
// //   }

// //   const resetFilter = () => setFilteredProjects(projects)

// //   useEffect(() => {
// //     setFilteredProjects(projects)
// //   }, [projects])

// //   return (
// //     <ThemeProvider theme={theme}>
// //       <CssBaseline />
// //       <Box sx={{ p: 2 }}>
// //         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //           <Typography variant="h4">Projects Dashboard</Typography>
// //           <Button variant="contained" startIcon={<Add />} onClick={() => setIsAddDialogOpen(true)}>
// //             Add Project
// //           </Button>
// //         </Box>

// //         <SummaryCards projects={filteredProjects} />
// //         <ProjectCharts projects={filteredProjects} />
// //         <FilterPanel
// //           open={isFilterOpen}
// //           onClose={() => setIsFilterOpen(false)}
// //           onFilter={handleFilter}
// //           onReset={resetFilter}
// //         />

// //         <Tabs value={tabValue} onChange={handleTabChange} sx={{ mt: 3 }}>
// //           <Tab label="Grid View" icon={<ViewModule />} iconPosition="start" />
// //           <Tab label="Table View" icon={<ViewHeadline />} iconPosition="start" />
// //           <Tab label="List View" icon={<ViewList />} iconPosition="start" />
// //         </Tabs>

// //         <TabPanel value={tabValue} index={0}>
// //           <ProjectsGridView projects={filteredProjects} onMenuOpen={handleMenuOpen} />
// //         </TabPanel>
// //         <TabPanel value={tabValue} index={1}>
// //           <ProjectsTableView projects={filteredProjects} onMenuOpen={handleMenuOpen} />
// //         </TabPanel>
// //         <TabPanel value={tabValue} index={2}>
// //           <ProjectsListView projects={filteredProjects} onMenuOpen={handleMenuOpen} />
// //         </TabPanel>

// //         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
// //           <MenuItem onClick={handleEditProject}>
// //             <Edit fontSize="small" sx={{ mr: 1 }} />
// //             Edit
// //           </MenuItem>
// //           <MenuItem onClick={handleDeleteProject}>
// //             <Delete fontSize="small" sx={{ mr: 1 }} />
// //             Delete
// //           </MenuItem>
// //         </Menu>

// //         <EditDialog
// //           open={isEditDialogOpen}
// //           project={selectedProject}
// //           onClose={() => setIsEditDialogOpen(false)}
// //           onSave={saveProjectChanges}
// //         />
// //         <DeleteDialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onConfirm={confirmDelete} />
// //         <AddProjectDialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onAdd={handleAddProject} />

// //         <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
// //           <Alert severity={snackbar.severity} sx={{ width: "100%" }} onClose={handleCloseSnackbar}>
// //             {snackbar.message}
// //           </Alert>
// //         </Snackbar>
// //       </Box>
// //     </ThemeProvider>
// //   )
// // }

// // export default ProjectsDashboard
// import type React from "react"
// import { useState, useEffect } from "react"
// import {
//   Box, Typography, Button, Tabs, Tab, Paper, Menu, MenuItem, Snackbar, Alert,
//   ThemeProvider, createTheme, CssBaseline,
// } from "@mui/material"
// import { Add, Edit, Delete, ViewModule, ViewList, ViewHeadline } from "@mui/icons-material"

// import { ProjectsTableView } from "./ProjectsTableView"
// import FilterPanel, { type FilterValues } from "./FilterPanel"
// import { type Project, generateId } from "../../types/Project"
// import ProjectCharts from "./ProjectCharts"
// import EditDialog from "./EditDialog"
// import DeleteDialog from "./DeleteDialog"
// import AddProjectDialog from "./AddProjectDialog"
// import SummaryCards from "./SummaryCards"
// import ProjectsGridView from "./ProjectsGridView"
// import ProjectsListView from "./ProjectsListView"
// import { useDeleteProjectMutation } from "./projectApi"

// const theme = createTheme({
//   palette: {
//     primary: { main: "#00bcd4" },
//     secondary: { main: "#ff9800" },
//   },
//   typography: {
//     fontFamily: ["Arial", "sans-serif"].join(","),
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         body: {
//           backgroundColor: "#f5f5f5",
//           margin: 0,
//           padding: 0,
//         },
//       },
//     },
//     MuiPopover: { defaultProps: { container: () => document.body } },
//     MuiPopper: { defaultProps: { container: () => document.body } },
//     MuiDialog: {
//       defaultProps: {
//         container: () => document.body,
//         disableScrollLock: true,
//       },
//     },
//     MuiModal: {
//       defaultProps: {
//         container: () => document.body,
//         disableScrollLock: true,
//       },
//     },
//   },
// })

// function TabPanel({ children, value, index, ...other }: { children: React.ReactNode; value: number; index: number }) {
//   return (
//     <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
//       {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
//     </div>
//   )
// }

// const ProjectsDashboard = ({ initialProjects }: { initialProjects: Project[] }) => {
//   const [projects, setProjects] = useState<Project[]>(initialProjects || [])
//   const [filteredProjects, setFilteredProjects] = useState<Project[]>(initialProjects || [])

//   const [tabValue, setTabValue] = useState(0)
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null)

//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
//   const [isFilterOpen, setIsFilterOpen] = useState(false)

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success" as "success" | "error",
//   })

//   const [deleteProject] = useDeleteProjectMutation()

//   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, project: Project) => {
//     setSelectedProject(project)
//     setAnchorEl(event.currentTarget)
//   }

//   const handleMenuClose = () => setAnchorEl(null)

//   const handleEditProject = () => {
//     setIsEditDialogOpen(true)
//     handleMenuClose()
//   }

//   const handleDeleteProject = () => {
//     setIsDeleteDialogOpen(true)
//     handleMenuClose()
//   }

//   const confirmDelete = async () => {
//     if (selectedProject?._id) {
//       try {
//         await deleteProject(selectedProject._id).unwrap()
//         setProjects((prev) => prev.filter((p) => p._id !== selectedProject._id))
//         setSnackbar({ open: true, message: "Project deleted successfully.", severity: "success" })
//       } catch (error) {
//         setSnackbar({ open: true, message: "Failed to delete project.", severity: "error" })
//       } finally {
//         setIsDeleteDialogOpen(false)
//         setSelectedProject(null)
//       }
//     }
//   }

//   const saveProjectChanges = (updatedProject: Project) => {
//     setProjects((prev) => prev.map((p) => (p._id === updatedProject._id ? updatedProject : p)))
//     setSnackbar({ open: true, message: "Project updated successfully.", severity: "success" })
//     setIsEditDialogOpen(false)
//   }

//   const handleAddProject = (newProject: Project) => {
//     newProject.status = newProject.status || "Not Started"
//     setProjects((prev) => [...prev, newProject])
//     setSnackbar({ open: true, message: "Project added successfully.", severity: "success" })
//     setIsAddDialogOpen(false)
//   }

//   const handleCloseSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }))

//   const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue)
//   }

//   const handleFilter = (filters: FilterValues) => {
//     let filtered = projects
//     if (filters.status) filtered = filtered.filter((p) => p.status === filters.status)
//     if (filters.manager) filtered = filtered.filter((p) => p.manager === filters.manager)
//     if (filters.startDate && filters.endDate)
//       filtered = filtered.filter(
//         (p) => new Date(p.startDate) >= filters.startDate! && new Date(p.endDate) <= filters.endDate!
//       )
//     setFilteredProjects(filtered)
//   }

//   const resetFilter = () => setFilteredProjects(projects)

//   useEffect(() => {
//     setFilteredProjects(projects)
//   }, [projects])

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ p: 2 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Typography variant="h4">Projects Dashboard</Typography>
//           <Button variant="contained" startIcon={<Add />} onClick={() => setIsAddDialogOpen(true)}>
//             Add Project
//           </Button>
//         </Box>

//         <SummaryCards projects={filteredProjects} />
//         <ProjectCharts projects={filteredProjects} />
//         <FilterPanel
//           open={isFilterOpen}
//           onClose={() => setIsFilterOpen(false)}
//           onFilter={handleFilter}
//           onReset={resetFilter}
//         />

//         <Tabs value={tabValue} onChange={handleTabChange} sx={{ mt: 3 }}>
//           <Tab label="Grid View" icon={<ViewModule />} iconPosition="start" />
//           <Tab label="Table View" icon={<ViewHeadline />} iconPosition="start" />
//           <Tab label="List View" icon={<ViewList />} iconPosition="start" />
//         </Tabs>

//         <TabPanel value={tabValue} index={0}>
//           <ProjectsGridView projects={filteredProjects} onMenuOpen={handleMenuOpen} />
//         </TabPanel>
//         <TabPanel value={tabValue} index={1}>
//           <ProjectsTableView projects={filteredProjects} onMenuOpen={handleMenuOpen} />
//         </TabPanel>
//         <TabPanel value={tabValue} index={2}>
//           <ProjectsListView projects={filteredProjects} onMenuOpen={handleMenuOpen} />
//         </TabPanel>

//         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//           <MenuItem onClick={handleEditProject}>
//             <Edit fontSize="small" sx={{ mr: 1 }} />
//             Edit
//           </MenuItem>
//           <MenuItem onClick={handleDeleteProject}>
//             <Delete fontSize="small" sx={{ mr: 1 }} />
//             Delete
//           </MenuItem>
//         </Menu>

//         <EditDialog
//           open={isEditDialogOpen}
//           project={selectedProject}
//           onClose={() => setIsEditDialogOpen(false)}
//           onSave={saveProjectChanges}
//         />
//         <DeleteDialog
//           open={isDeleteDialogOpen}
//           onClose={() => setIsDeleteDialogOpen(false)}
//           onConfirm={confirmDelete}
//         />
//         <AddProjectDialog
//           open={isAddDialogOpen}
//           onClose={() => setIsAddDialogOpen(false)}
//           onAdd={handleAddProject}
//         />

//         <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
//           <Alert severity={snackbar.severity} sx={{ width: "100%" }} onClose={handleCloseSnackbar}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </ThemeProvider>
//   )
// }

// export default ProjectsDashboard

import type React from "react"
import { useState, useEffect } from "react"
import {
  Box, Typography, Button, Tabs, Tab, Paper, Menu, MenuItem, Snackbar, Alert,
  ThemeProvider, createTheme, CssBaseline,
} from "@mui/material"
import { Add, Edit, Delete, ViewModule, ViewList, ViewHeadline } from "@mui/icons-material"

import { ProjectsTableView } from "./ProjectsTableView"
import FilterPanel, { type FilterValues } from "./FilterPanel"
import { type Project } from "../../types/Project"
import ProjectCharts from "./ProjectCharts"
import EditDialog from "./EditDialog"
import DeleteDialog from "./DeleteDialog"
import AddProjectDialog from "./AddProjectDialog"
import SummaryCards from "./SummaryCards"
import ProjectsGridView from "./ProjectsGridView"
import ProjectsListView from "./ProjectsListView"
import { useDeleteProjectMutation, useUpdateProjectMutation } from "./projectApi"

const theme = createTheme({
  palette: {
    primary: { main: "#00bcd4" },
    secondary: { main: "#ff9800" },
  },
  typography: {
    fontFamily: ["Arial", "sans-serif"].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f5f5f5",
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiPopover: { defaultProps: { container: () => document.body } },
    MuiPopper: { defaultProps: { container: () => document.body } },
    MuiDialog: {
      defaultProps: {
        container: () => document.body,
        disableScrollLock: true,
      },
    },
    MuiModal: {
      defaultProps: {
        container: () => document.body,
        disableScrollLock: true,
      },
    },
  },
})

function TabPanel({ children, value, index, ...other }: { children: React.ReactNode; value: number; index: number }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  )
}

// פונקציה לנירמול שדות מזהים בתוך אובייקט פרויקט
function normalizeProjectIds(project: Project): Project {
  return {
    ...project,
    project_manager_id:
      typeof project.project_manager_id === "object" && project.project_manager_id !== null
        ? (project.project_manager_id as any)._id
        : project.project_manager_id,
    organization_id:
      typeof project.organization_id === "object" && project.organization_id !== null
        ? (project.organization_id as any)._id
        : project.organization_id,
    // אם יש צורך לנרמל גם authorized_Users, למשל:
    authorized_Users: project.authorized_Users?.map((user) =>
      typeof user === "object" && user !== null ? (user as any)._id : user
    ),
  }
}

const ProjectsDashboard = ({ initialProjects }: { initialProjects: Project[] }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects || [])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(initialProjects || [])

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

  // בעת פתיחת תפריט – ננרמל את הפרויקט שנבחר (מונע בעיות בעריכה)
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, project: Project) => {
    const normalizedProject = normalizeProjectIds(project)
    setSelectedProject(normalizedProject)
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
    if (selectedProject?._id) {
      try {
        await deleteProject(selectedProject._id).unwrap()
        setProjects((prev) => prev.filter((p) => p._id !== selectedProject._id))
        setSnackbar({ open: true, message: "Project deleted successfully.", severity: "success" })
      } catch (error) {
        setSnackbar({ open: true, message: "Failed to delete project.", severity: "error" })
      } finally {
        setIsDeleteDialogOpen(false)
        setSelectedProject(null)
      }
    }
  }

  // שמירת שינויים בפרויקט עם נירמול מזהים
  const saveProjectChanges = async (updatedProject: Project) => {
    try {
      const projectToSend = normalizeProjectIds(updatedProject)

      const result = await updateProject(projectToSend).unwrap()
      setProjects((prev) => prev.map((p) => (p._id === result._id ? result : p)))
      setSnackbar({ open: true, message: "Project updated successfully.", severity: "success" })
    } catch {
      setSnackbar({ open: true, message: "Failed to update project.", severity: "error" })
    } finally {
      setIsEditDialogOpen(false)
    }
  }

  const handleAddProject = (newProject: Project) => {
    newProject.status = newProject.status || "NOT_STARTED"
    setProjects((prev) => [...prev, newProject])
    setSnackbar({ open: true, message: "Project added successfully.", severity: "success" })
    setIsAddDialogOpen(false)
  }

  const handleCloseSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }))

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleFilter = (filters: FilterValues) => {
    let filtered = projects
    if (filters.status) filtered = filtered.filter((p) => p.status === filters.status)
    if (filters.manager) filtered = filtered.filter((p) => p.manager === filters.manager)
    if (filters.startDate && filters.endDate)
      filtered = filtered.filter(
        (p) => new Date(p.start_date) >= filters.startDate! && new Date(p.deadline) <= filters.endDate!
      )
    setFilteredProjects(filtered)
  }

  const resetFilter = () => setFilteredProjects(projects)

  useEffect(() => {
    setFilteredProjects(projects)
  }, [projects])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4">Projects Dashboard</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => setIsAddDialogOpen(true)}>
            Add Project
          </Button>
        </Box>

        <SummaryCards projects={filteredProjects} />
        <ProjectCharts projects={filteredProjects} />
        <FilterPanel
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onFilter={handleFilter}
          onReset={resetFilter}
        />

        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mt: 3 }}>
          <Tab label="Grid View" icon={<ViewModule />} iconPosition="start" />
          <Tab label="Table View" icon={<ViewHeadline />} iconPosition="start" />
          <Tab label="List View" icon={<ViewList />} iconPosition="start" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <ProjectsGridView projects={filteredProjects} onMenuOpen={handleMenuOpen} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ProjectsTableView projects={filteredProjects} onMenuOpen={handleMenuOpen} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <ProjectsListView projects={filteredProjects} onMenuOpen={handleMenuOpen} />
        </TabPanel>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleEditProject}>
            <Edit fontSize="small" sx={{ mr: 1 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDeleteProject}>
            <Delete fontSize="small" sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>

        <EditDialog
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          project={selectedProject}
          onSave={saveProjectChanges}
        />

        <DeleteDialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          projectName={selectedProject?.project_name}
        />

        <AddProjectDialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAdd={handleAddProject}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
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


