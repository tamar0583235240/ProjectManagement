import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom'; // תיקון ייבוא Outlet

const AppLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default AppLayout;