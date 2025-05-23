import React from "react"
import { Grid, Card, CardContent, Typography } from "@mui/material"
import type { Project } from "../../types/Project"

interface SummaryCardsProps {
  projects: Project[]
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ projects }) => {
  const totalProjects = projects.length
  const completedProjects = projects.filter((p) => p.status === "COMPLETED").length
  const delayedProjects = projects.filter((p) => p.status === "DELAYED").length
  const inProgressProjects = projects.filter((p) => p.status === "IN_PROGRESS").length

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card elevation={2} sx={{ height: "100%" }}>
          <CardContent sx={{ textAlign: "center", py: 3 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              סה"כ פרויקטים
            </Typography>
            <Typography variant="h2" color="primary" fontWeight="bold">
              {totalProjects}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card elevation={2} sx={{ height: "100%" }}>
          <CardContent sx={{ textAlign: "center", py: 3 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              בתהליך
            </Typography>
            <Typography variant="h2" sx={{ color: "#00bcd4" }} fontWeight="bold">
              {inProgressProjects}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card elevation={2} sx={{ height: "100%" }}>
          <CardContent sx={{ textAlign: "center", py: 3 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              הושלמו
            </Typography>
            <Typography variant="h2" sx={{ color: "#ffc107" }} fontWeight="bold">
              {completedProjects}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card elevation={2} sx={{ height: "100%" }}>
          <CardContent sx={{ textAlign: "center", py: 3 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              באיחור
            </Typography>
            <Typography variant="h2" color="error" fontWeight="bold">
              {delayedProjects}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
