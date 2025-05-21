
import './App.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
<<<<<<< HEAD
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import AddUserForm from './features/users/AddUserForm'
=======

// import HomePage from '../src/pages/HomePage'


// import { AddUserForm } from './features/users/AddUserForm'

import { RouterProvider} from 'react-router-dom'
import router from './routes/router'
import SetPasswordForm from './components/SetPasswordForm'

>>>>>>> e1279ad04300b99e5bf619a26308f9d34fbdb02c
// import {  AddEmployeeForm } from './features/users/AddEmployeeForm'


function App() {
  return (
    <>
<<<<<<< HEAD
      {/* <Provider store={store}>
         <RouterProvider router={router} />
      </Provider> */}
      <Provider store={store}>
        <AddUserForm/>
=======

      <Provider store={store}>
         <RouterProvider router={router} />
         {/* <SetPasswordForm/> */}
>>>>>>> e1279ad04300b99e5bf619a26308f9d34fbdb02c
      </Provider>

    </>
  )
}

export default App