"use client"

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

export const FilterPanel: React.FC<FilterPanelProps> = ({ open, onToggle, onFilter, onReset }): ReactElement => {
  const [filters, setFilters] = React.useState<FilterValues>({
    status: "",
    manager: "",
    dateFrom: "",
    dateTo: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target
    if (name) {
      setFilters((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilter(filters)
  }

  const handleReset = () => {
    setFilters({
      status: "",
      manager: "",
      dateFrom: "",
      dateTo: "",
    })
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
          <Typography variant="h6">סינון פרויקטים</Typography>
        </Box>
        <IconButton size="small" sx={{ color: "white" }}>
          {open ? <Close /> : <FilterList />}
        </IconButton>
      </Box>

      <Collapse in={open}>
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>סטטוס</InputLabel>
                <Select
                  name="status"
                  label="סטטוס"
                  value={filters.status}
                  onChange={handleChange}
                  inputProps={{ dir: "rtl" }}
                >
                  <MenuItem value="">הכל</MenuItem>
                  <MenuItem value="IN_PROGRESS">בתהליך</MenuItem>
                  <MenuItem value="COMPLETED">הושלם</MenuItem>
                  <MenuItem value="DELAYED">באיחור</MenuItem>
                  <MenuItem value="NOT_STARTED">טרם התחיל</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} md={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>מנהל פרויקט</InputLabel>
                <Select
                  name="manager"
                  label="מנהל פרויקט"
                  value={filters.manager}
                  onChange={handleChange}
                  inputProps={{ dir: "rtl" }}
                >
                  <MenuItem value="">הכל</MenuItem>
                  <MenuItem value="תמר">תמר</MenuItem>
                  <MenuItem value="יוסי">יוסי</MenuItem>
                  <MenuItem value="רונית">רונית</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} md={3}>
              <TextField
                name="dateFrom"
                label="מתאריך"
                type="date"
                fullWidth
                value={filters.dateFrom}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid xs={12} md={3}>
              <TextField
                name="dateTo"
                label="עד תאריך"
                type="date"
                fullWidth
                value={filters.dateTo}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={handleReset}>
              נקה סינון
            </Button>
            <Button type="submit" variant="contained" startIcon={<FilterList />}>
              סנן
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  )
}
