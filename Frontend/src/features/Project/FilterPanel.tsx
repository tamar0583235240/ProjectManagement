// import React from "react"
// import type { ReactElement } from "react"
// import {
//   Box,
//   Paper,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
//   Collapse,
//   IconButton,
//   Grid,
// } from "@mui/material"
// import type { SelectChangeEvent } from "@mui/material"
// import { Close, FilterList } from "@mui/icons-material"

// interface FilterPanelProps {
//   open: boolean
//   onToggle: () => void
//   onFilter: (filters: FilterValues) => void
//   onReset: () => void
// }

// export interface FilterValues {
//   status: string
//   manager: string
//   dateFrom: string
//   dateTo: string
// }

// const FilterPanel: React.FC<FilterPanelProps> = ({
//   open,
//   onToggle,
//   onFilter,
//   onReset,
// }): ReactElement => {
//   const [filters, setFilters] = React.useState<FilterValues>({
//     status: "",
//     manager: "",
//     dateFrom: "",
//     dateTo: "",
//   })

//   const handleSelectChange = (e: SelectChangeEvent) => {
//     const { name, value } = e.target
//     setFilters((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFilters((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onFilter(filters)
//   }

//   const handleReset = () => {
//     const resetFilters = {
//       status: "",
//       manager: "",
//       dateFrom: "",
//       dateTo: "",
//     }
//     setFilters(resetFilters)
//     onReset()
//   }

//   return (
//     <Paper sx={{ mb: 3, overflow: "hidden" }}>
//       <Box
//         sx={{
//           p: 2,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           cursor: "pointer",
//           bgcolor: "primary.main",
//           color: "white",
//         }}
//         onClick={onToggle}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <FilterList />
//           <Typography variant="h6">Project Filter</Typography>
//         </Box>
//         <IconButton size="small" sx={{ color: "white" }}>
//           {open ? <Close /> : <FilterList />}
//         </IconButton>
//       </Box>

//       <Collapse in={open}>
//         <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={3}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   name="status"
//                   label="Status"
//                   value={filters.status}
//                   onChange={handleSelectChange}
//                 >
//                   <MenuItem value="">All</MenuItem>
//                   <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
//                   <MenuItem value="COMPLETED">Completed</MenuItem>
//                   <MenuItem value="DELAYED">Delayed</MenuItem>
//                   <MenuItem value="NOT_STARTED">Not Started</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>Project Manager</InputLabel>
//                 <Select
//                   name="manager"
//                   label="Project Manager"
//                   value={filters.manager}
//                   onChange={handleSelectChange}
//                 >
//                   <MenuItem value="">All</MenuItem>
//                   <MenuItem value="Tamar">Tamar</MenuItem>
//                   <MenuItem value="Yossi">Yossi</MenuItem>
//                   <MenuItem value="Ronit">Ronit</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <TextField
//                 name="dateFrom"
//                 label="From Date"
//                 type="date"
//                 fullWidth
//                 value={filters.dateFrom}
//                 onChange={handleInputChange}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid>
//             <Grid item xs={12} md={3}>
//               <TextField
//                 name="dateTo"
//                 label="To Date"
//                 type="date"
//                 fullWidth
//                 value={filters.dateTo}
//                 onChange={handleInputChange}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid>
//           </Grid>

//           <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
//             <Button variant="outlined" onClick={handleReset}>
//               Clear Filters
//             </Button>
//             <Button type="submit" variant="contained" startIcon={<FilterList />}>
//               Apply Filters
//             </Button>
//           </Box>
//         </Box>
//       </Collapse>
//     </Paper>
//   )
// }

// export default FilterPanel


// FilterPanel.tsx
import React from "react"
import type { ReactElement } from "react"
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Collapse,
  IconButton,
  Grid,
} from "@mui/material"
import type { SelectChangeEvent } from "@mui/material"
import { Close, FilterList } from "@mui/icons-material"

interface FilterPanelProps {
  open: boolean
  onToggle: () => void
  onFilter: (filters: FilterValues) => void
  onReset: () => void
}

export interface FilterValues {
  status: string
  manager: string
  dateFrom: string
  dateTo: string
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  open,
  onToggle,
  onFilter,
  onReset,
}): ReactElement => {
  const [filters, setFilters] = React.useState<FilterValues>({
    status: "",
    manager: "",
    dateFrom: "",
    dateTo: "",
  })

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilter(filters)
  }

  const handleReset = () => {
    const resetFilters = {
      status: "",
      manager: "",
      dateFrom: "",
      dateTo: "",
    }
    setFilters(resetFilters)
    onReset()
  }

  return (
    <Paper sx={{ mb: 3, overflow: "hidden" }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          bgcolor: "primary.main",
          color: "white",
        }}
        onClick={onToggle}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FilterList />
          <Typography variant="h6">Project Filter</Typography>
        </Box>
        <IconButton size="small" sx={{ color: "white" }} onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}>
          {open ? <Close /> : <FilterList />}
        </IconButton>
      </Box>

      <Collapse in={open}>
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  label="Status"
                  value={filters.status}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                  <MenuItem value="COMPLETED">Completed</MenuItem>
                  <MenuItem value="DELAYED">Delayed</MenuItem>
                  <MenuItem value="NOT_STARTED">Not Started</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Project Manager</InputLabel>
                <Select
                  name="manager"
                  label="Project Manager"
                  value={filters.manager}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Tamar">Tamar</MenuItem>
                  <MenuItem value="Yossi">Yossi</MenuItem>
                  <MenuItem value="Ronit">Ronit</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="dateFrom"
                label="From Date"
                type="date"
                fullWidth
                value={filters.dateFrom}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="dateTo"
                label="To Date"
                type="date"
                fullWidth
                value={filters.dateTo}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={handleReset}>
              Clear Filters
            </Button>
            <Button type="submit" variant="contained" startIcon={<FilterList />}>
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  )
}

export default FilterPanel
