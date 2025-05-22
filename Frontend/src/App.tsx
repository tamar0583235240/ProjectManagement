
import './App.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import router from './routes/router'
import InviteUserForm from './features/users/InviteUserForm'
// import InviteUserForm from './features/users/InviteUserForm'
// import { RouterProvider } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom';
// import { InviteUserForm } from './features/users/InviteUserForm';

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
        {/* <InviteUserForm/> */}
      </Provider>
    </>
  )
}
export default App