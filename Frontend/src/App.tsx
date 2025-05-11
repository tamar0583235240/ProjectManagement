// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import './style/Login.css'
// import { RouterProvider } from 'react-router'

// import Login from './features/auth/SignUp'

// function App() {
//   return (
//     <>
//       <RouterProvider router={router}/>
//     </>
//   )
// }

// export default App
// import { RouterProvider } from 'react-router'
import './App.css'
import {  useCookies } from 'react-cookie'



import { store } from './app/store'

import { Provider } from 'react-redux'
import HomePage from '../src/pages/HomePage'
import React from 'react'
import { RouterProvider, useNavigate } from 'react-router'
import router from './app/router'
import Dashboard from './pages/Dashboard'


function App() {
  // const navigate = useNavigate()
  const [cookies] = useCookies(['token'])
  return (
    <>
      <Provider store={store}>
        {cookies.token?
         <HomePage/>
          :<Dashboard/>}
      </Provider>
    </>
  )
}

export default App