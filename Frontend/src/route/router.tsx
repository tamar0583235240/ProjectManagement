import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import HomePage from "../pages/HomePage";
import Projects from "../pages/Projects";
import Tasks from "../pages/Tasks";
import EmployeeManagment from "../pages/EmployeeManagment";
import NotFound from "../pages/NotFound";
import Dashborad from "../pages/Dashborad";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashborad />,
        index: true,
    },
    {
        path: "/app",
        element: <AppLayout />,
        children: [
            { element: <HomePage />, index: true },
            { path: "projects", element: <Projects /> },
            { path: "tasks", element: <Tasks /> },
            { path: "employee-management", element: <EmployeeManagment /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

export default router;