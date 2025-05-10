import React from 'react';
import NavBar from './common/NavBar';
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