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
import { CssBaseline, ThemeProvider } from '@mui/material';

import './index.css'
import App from './App.tsx'
import { CookiesProvider } from 'react-cookie'
import theme from './theme/theme.ts';

createRoot(document.getElementById('root')!).render(

  <CookiesProvider>
    
    <StrictMode>
        <CssBaseline />
        <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
   </StrictMode>
  </CookiesProvider>

)
