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
import { BrowserRouter } from 'react-router'
// import React from 'react'

createRoot(document.getElementById('root')!).render(
  <CookiesProvider>
    <BrowserRouter> 
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </CookiesProvider>
)
