
import './App.css'
import {  useCookies } from 'react-cookie'
import { store } from './app/store'
import { Provider } from 'react-redux'
import HomePage from '../src/pages/HomePage'
import Dashboard from './pages/Dashboard'
// import {  AddEmployeeForm } from './features/users/AddEmployeeForm'


function App() {


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