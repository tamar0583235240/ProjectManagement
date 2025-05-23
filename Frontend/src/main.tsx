// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import { Provider } from 'react-redux'
// import { store } from './app/store.ts'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </StrictMode>,
// )

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CookiesProvider } from 'react-cookie'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // ניתן להתאים לצבעים בתמונה
    },
    secondary: {
      main: '#ff9800',
    },
  },
  typography: {
    fontFamily: '"Assistant", "Roboto", "Arial", sans-serif',
  },
});
// import React from 'react'

createRoot(document.getElementById('root')!).render(
  <CookiesProvider>
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StrictMode>
  </CookiesProvider>

)
