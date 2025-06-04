import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import HomePage from "../pages/HomePage";
import Projects from "../pages/Projects";
import Tasks from "../pages/Tasks";
import NotFound from "../pages/NotFound";
<<<<<<< HEAD
import LandingPage from "../pages/LandingPage";
import InitialRouter from "../components/InitialRouter";
import { Children } from "react";
import SetPasswordPage from "../pages/SetPasswordPage";
import AddUserForm from "../features/users/InviteUserForm";
import InviteUserForm from "../features/users/InviteUserForm";
import ResetPasswordPage from "../features/auth/ResetPasswordPage";
=======
import InitialRouter from "../components/InitialRouter";
import LandingPage from "../pages/LandingPage";
import ProjectDetails from "../features/Project/ProjectDetails";
import EmployeeManagement from "../pages/EmployeeManagement";

>>>>>>> Frontend/Projects
const router = createBrowserRouter([
  {
    path: '/',
    element: <InitialRouter />,
  },
  {
<<<<<<< HEAD
    path: '/landingPage',
    element: <LandingPage/>
  },
  {
    path: '/set-password/:token',
    element: <SetPasswordPage/>
  },
{
  path: '/reset-password/:token',
  element: <ResetPasswordPage/>
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
                  index: true,  // ברירת מחדל בכניסה לנתיב הזה
                  element: <InviteUserForm />  // במקום InitialRouter
                },
                {
                  path: "invite",
                  element: <InviteUserForm />
                }
              ]
            },
          ]
    },
]);
export default router;
=======
    path: '/landing',
    element: <LandingPage />,
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects', element: <Projects /> },
       { path: 'projects/:projectId', element: <ProjectDetails /> },
      { path: 'tasks', element: <Tasks /> },
      { path: 'employee-management', element: <EmployeeManagement /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
>>>>>>> Frontend/Projects
