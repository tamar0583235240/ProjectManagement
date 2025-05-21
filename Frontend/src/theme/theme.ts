import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // תכלת
    },
    secondary: {
      main: "#ff9800", // כתום
    },
    background: {
      default: "#f5f7fa", // רקע בהיר
    },
    text: {
      primary: "#1f2937", // טקסט כהה
      secondary: "#6b7280", // טקסט משני
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 14,
    h1: { fontSize: "2.2rem", fontWeight: 600 },
    h2: { fontSize: "1.8rem", fontWeight: 600 },
    body1: { fontSize: "1rem" },
  },
  shape: {
    borderRadius: 16, // עיגוליות לרכיבים
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
          borderRadius: "16px",
        },
      },
    },
  },
})

export default theme
