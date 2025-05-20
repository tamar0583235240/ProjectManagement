
import './App.css'
import { store } from './app/store'
import { Provider } from 'react-redux'

// import HomePage from '../src/pages/HomePage'


// import { AddUserForm } from './features/users/AddUserForm'

import { RouterProvider} from 'react-router-dom'
import router from './routes/router'
import SetPasswordForm from './components/SetPasswordForm'

// import {  AddEmployeeForm } from './features/users/AddEmployeeForm'


function App() {
  return (
    <>

      <Provider store={store}>
         <RouterProvider router={router} />
         {/* <SetPasswordForm/> */}
      </Provider>

    </>
  )
}

export default App