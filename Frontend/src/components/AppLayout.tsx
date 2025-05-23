import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom'; // תיקון ייבוא Outlet // ייבוא הפונקציה

const AppLayout = () => {

  return (
    <div>
      <NavBar />
      <Outlet /> {/* כאן יכנסו שאר הקומפוננטות */}
    </div>
  );
};

export default AppLayout;
