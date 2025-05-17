import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom'; // תיקון ייבוא Outlet
import useLoadUserFromCookie from '../hooks/useLoadUserFromCookie'; // ייבוא הפונקציה

const AppLayout = () => {
  useLoadUserFromCookie();

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
