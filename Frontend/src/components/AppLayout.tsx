import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom'; // תיקון ייבוא Outlet
import useLoadUserFromCookie from '../hooks/useLoadUserFromCookie'; // ייבוא הפונקציה

const AppLayout = () => {
  // הפעלת הפונקציה שמטעינה את המשתמש מקוקי
  useLoadUserFromCookie();

  return (
    <div>
      <NavBar />
      <Outlet /> {/* כאן יכנסו שאר הקומפוננטות */}
    </div>
  );
};

export default AppLayout;
