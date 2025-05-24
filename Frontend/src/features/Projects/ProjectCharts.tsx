import type React from "react"
import { Grid, Card, CardContent, Typography, Box } from "@mui/material"
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts"
import { format } from "date-fns"
import { enUS } from "date-fns/locale"
import type { Project } from "../../types/Project"

interface ProjectChartsProps {
  projects: Project[]
}

const ProjectCharts: React.FC<ProjectChartsProps> = ({ projects }) => {
  // Calculate statistics
  const completedProjects = projects.filter((p) => p.status === "COMPLETED").length
  const delayedProjects = projects.filter((p) => p.status === "DELAYED").length
  const inProgressProjects = projects.filter((p) => p.status === "IN_PROGRESS").length
  const notStartedProjects = projects.filter((p) => p.status === "NOT_STARTED").length

  // Data for pie chart
  const pieChartData = [
    { name: "In Progress", value: inProgressProjects, color: "#00bcd4" },
    { name: "Completed", value: completedProjects, color: "#4caf50" },
    { name: "Delayed", value: delayedProjects, color: "#f44336" },
    { name: "Not Started", value: notStartedProjects, color: "#ffc107" },
  ].filter((item) => item.value > 0)

  // Data for bar chart by deadline month
  const getMonthData = () => {
    const monthCounts: Record<string, number> = {}

    projects.forEach((project) => {
      if (project.deadline) {
        try {
          const month = format(new Date(project.deadline), "MMM", { locale: enUS })
          monthCounts[month] = (monthCounts[month] || 0) + 1
        } catch (error) {
          console.warn("Invalid date format:", project.deadline)
        }
      }
    })

    return Object.entries(monthCounts).map(([month, count]) => ({
      month,
      count,
    }))
  }

  const barChartData = getMonthData()

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={6}>
        <Card elevation={2} sx={{ height: "100%" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Projects by Status
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} md={6}>
        <Card elevation={2} sx={{ height: "100%" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Projects by Deadline Month
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#00bcd4" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ProjectCharts
