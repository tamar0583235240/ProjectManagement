import React from 'react'
import { Outlet } from 'react-router'

const EmployeeManagment = () => {
  return (
    <div>
      <h1>Employee Managment</h1>
      <Outlet />
    </div>
  )
}

export default EmployeeManagment
