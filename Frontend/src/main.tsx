import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import theme from './theme/theme';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CookiesProvider>
  </StrictMode>
);