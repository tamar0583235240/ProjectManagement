"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  NoSsr,
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
  CssBaseline,
} from "@mui/material"
import { Add, Edit, Delete, ViewModule, ViewList, ViewHeadline } from "@mui/icons-material"
import rtlPlugin from "stylis-plugin-rtl"
import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import { SummaryCards } from "./SummaryCards"
import { ProjectsGridView } from "./ProjectsGridView"
import { ProjectsTableView } from "./ProjectsTableView"
import { ProjectsListView } from "./ProjectsListView"
import { EditDialog, DeleteDialog, AddProjectDialog } from "./ProjectDialog"
import { FilterPanel, type FilterValues } from "./FilterPanel"
import { type Project, generateId } from "../../types/Project"
import ProjectCharts from "./ProjectCharts"

// יצירת קאש עבור RTL
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
})

// יצירת ערכת נושא מותאמת
const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#00bcd4",
    },
    secondary: {
      main: "#ff9800",
    },
  },
  typography: {
    fontFamily: ["Rubik", "Assistant", "Arial", "sans-serif"].join(","),
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
    MuiPopover: {
      defaultProps: {
        container: () => document.body,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: () => document.body,
      },
    },
    MuiDialog: {
      defaultProps: {
        container: () => document.body,
        disableScrollLock: true,
      },
    },
    MuiModal: {
      defaultProps: {
        disableScrollLock: true,
        container: () => document.body,
      },
    },
  },
})

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  )
}

interface ProjectsDashboardProps {
  initialProjects: Project[]
}

export default function ProjectsDashboard({ initialProjects }: ProjectsDashboardProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects || [])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(initialProjects || [])
  const [tabValue, setTabValue] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  })

  // פונקציות לטיפול בפרויקטים
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, project: Project) => {
    setAnchorEl(event.currentTarget)
    setSelectedProject(project)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEditProject = () => {
    setIsEditDialogOpen(true)
    handleMenuClose()
  }

  const handleDeleteProject = () => {
    setIsDeleteDialogOpen(true)
    handleMenuClose()
  }

  const confirmDelete = () => {
    // במציאות כאן היה קוד לקריאת API למחיקת הפרויקט
    setSnackbar({
      open: true,
      message: `הפרויקט "${selectedProject?.project_name}" נמחק בהצלחה`,
      severity: "success",
    })
    setIsDeleteDialogOpen(false)
  }

  const saveProjectChanges = (e: React.FormEvent) => {
    e.preventDefault()
    // במציאות כאן היה קוד לקריאת API לעדכון הפרויקט
    setSnackbar({
      open: true,
      message: `הפרויקט "${selectedProject?.project_name}" עודכן בהצלחה`,
      severity: "success",
    })
    setIsEditDialogOpen(false)
  }

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()
    // במציאות כאן היה קוד לקריאת API להוספת פרויקט
    setSnackbar({
      open: true,
      message: "הפרויקט נוסף בהצלחה",
      severity: "success",
    })
    setIsAddDialogOpen(false)

    // יצירת פרויקט חדש לדוגמה
    const newProject: Project = {
      _id: generateId(),
      project_name: "פרויקט חדש",
      description: "תיאור של הפרויקט החדש",
      start_date: new Date().toISOString(),
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: "NOT_STARTED",
      project_manager_id: {
        _id: "123",
        user_name: "תמר",
        email: "tamar@example.com",
        role: "MANAGER",
      },
      authorized_Users: [],
      organization_id: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setProjects((prev) => [newProject, ...prev])
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleFilter = (filters: FilterValues) => {
    let filtered = [...projects]

    if (filters.status) {
      filtered = filtered.filter((project) => project.status === filters.status)
    }

    if (filters.manager) {
      filtered = filtered.filter((project) => project.project_manager_id?.user_name === filters.manager)
    }

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom)
      filtered = filtered.filter((project) => new Date(project.deadline) >= fromDate)
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo)
      toDate.setHours(23, 59, 59, 999)
      filtered = filtered.filter((project) => new Date(project.deadline) <= toDate)
    }

    setFilteredProjects(filtered)
    setSnackbar({
      open: true,
      message: `נמצאו ${filtered.length} פרויקטים מתאימים`,
      severity: "success",
    })
  }

  const resetFilter = () => {
    setFilteredProjects(projects)
  }

  // עדכון הפרויקטים המסוננים כאשר הפרויקטים משתנים
  useEffect(() => {
    setFilteredProjects(projects)
  }, [projects])

  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NoSsr>
            <Box sx={{ width: "100%", minHeight: "100vh", p: { xs: 2, md: 4 } }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                  לוח בקרת פרויקטים
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  color="primary"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  פרויקט חדש
                </Button>
              </Box>

              {/* כרטיסי סיכום */}
              <Box sx={{ mb: 4 }}>
                <SummaryCards projects={filteredProjects} />
              </Box>

              {/* גרפים */}
              <Box sx={{ mb: 4 }}>
                <ProjectCharts projects={filteredProjects} />
              </Box>

              {/* פאנל סינון */}
              <FilterPanel
                open={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
                onFilter={handleFilter}
                onReset={resetFilter}
              />

              {/* טאבים לתצוגות שונות */}
              <Paper elevation={2} sx={{ mb: 4 }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  textColor="primary"
                  indicatorColor="primary"
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  <Tab icon={<ViewModule />} label="תצוגת גריד" />
                  <Tab icon={<ViewList />} label="תצוגת טבלה" />
                  <Tab icon={<ViewHeadline />} label="תצוגת רשימה" />
                </Tabs>

                {/* תצוגת גריד */}
                <TabPanel value={tabValue} index={0}>
                  <ProjectsGridView projects={filteredProjects} onMenuOpen={handleMenuOpen} />
                </TabPanel>

                {/* תצוגת טבלה */}
                <TabPanel value={tabValue} index={1}>
                  <ProjectsTableView
                    projects={filteredProjects}
                    onEdit={(project) => {
                      setSelectedProject(project)
                      setIsEditDialogOpen(true)
                    }}
                    onDelete={(project) => {
                      setSelectedProject(project)
                      setIsDeleteDialogOpen(true)
                    }}
                  />
                </TabPanel>

                {/* תצוגת רשימה */}
                <TabPanel value={tabValue} index={2}>
                  <ProjectsListView
                    projects={filteredProjects}
                    onEdit={(project) => {
                      setSelectedProject(project)
                      setIsEditDialogOpen(true)
                    }}
                    onDelete={(project) => {
                      setSelectedProject(project)
                      setIsDeleteDialogOpen(true)
                    }}
                  />
                </TabPanel>
              </Paper>

              {/* תפריט פעולות */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1,
                      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
                    },
                  },
                }}
              >
                <MenuItem onClick={handleEditProject}>
                  <Edit fontSize="small" sx={{ mr: 1 }} />
                  עריכה
                </MenuItem>
                <MenuItem onClick={handleDeleteProject} sx={{ color: "error.main" }}>
                  <Delete fontSize="small" sx={{ mr: 1 }} />
                  מחיקה
                </MenuItem>
              </Menu>

              {/* דיאלוגים */}
              <EditDialog
                open={isEditDialogOpen}
                project={selectedProject}
                onClose={() => setIsEditDialogOpen(false)}
                onSave={saveProjectChanges}
              />

              <DeleteDialog
                open={isDeleteDialogOpen}
                project={selectedProject}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={confirmDelete}
              />

              <AddProjectDialog
                open={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onAdd={handleAddProject}
              />

              {/* הודעות */}
              <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
                  {snackbar.message}
                </Alert>
              </Snackbar>
            </Box>
          </NoSsr>
        </ThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  )
}
