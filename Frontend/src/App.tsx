
import './App.css'
import { store } from './app/store'
import { Provider } from 'react-redux'

// import HomePage from '../src/pages/HomePage'
// import Dashboard from './pages/Dashboard'
// import { AddUserForm } from './features/users/AddUserForm'
// import { AddUserForm } from './features/users/AddUserForm'

import { RouterProvider} from 'react-router-dom'
import router from './routes/router'

// import {  AddEmployeeForm } from './features/users/AddEmployeeForm'


function App() {
  return (
    <>

      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>

    </>
  )
}

export default App