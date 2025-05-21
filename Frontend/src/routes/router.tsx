import { createBrowserRouter, useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import HomePage from "../pages/HomePage";
import Projects from "../pages/Projects";
import Tasks from "../pages/Tasks";
import EmployeeManagment from "../pages/EmployeeManagment";
import NotFound from "../pages/NotFound";
import LandingPage from "../pages/LandingPage";
import InitialRouter from "../components/InitialRouter";
import { Children } from "react";
import SetPasswordPage from "../pages/SetPasswordPage";
import AddUserForm from "../features/users/InviteUserForm";

const router = createBrowserRouter([
   {
    path: '/',
    element: <InitialRouter />
  },
  {
    path: '/landingPage',
    element: <LandingPage />
  },

  {
    path: '/set-password',
    element: <SetPasswordPage/>
  },
    {
        path: "app", element: <AppLayout />,
        children: [
            { element: <HomePage />, index: true },
            { path: "projects", element: <Projects /> },
            { path: "tasks", element: <Tasks /> },
            {
              path: "employeemanagement",
              element: <EmployeeManagment />,
              children: [
                {
                  index: true,
                  element: <AddUserForm />  // יוצג כשנכנסים ל-employeemanagement
                },
                {
                  path: "addUser",
                  element: <AddUserForm />
                }
              ]
            },
            { path: "*", element: <NotFound /> },
        ],
    },
]);

export default router;