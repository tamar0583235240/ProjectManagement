import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import HomePage from "../pages/HomePage";
import Projects from "../pages/Projects";
import Tasks from "../pages/Tasks";
import LandingPage from "../pages/LandingPage";
import InitialRouter from "../components/InitialRouter";
import SetPasswordPage from "../pages/SetPasswordPage";
import ResetPasswordPage from "../features/auth/ResetPasswordPage";
import ProjectDetails from "../features/Project/ProjectDetails";
import NotFound from "../pages/NotFound";
import EmployeeManagement from "../pages/EmployeeManagment";

const router = createBrowserRouter([
  {
    path: '/',
    element: <InitialRouter />,
  },
  {
    path: '/landingPage',
    element: <LandingPage />
  },
  {
    path: '/set-password/:token',
    element: <SetPasswordPage />
  },
  {
    path: '/reset-password/:token',
    element: <ResetPasswordPage />
  },
  {
    path: "app", element: <AppLayout />,
    children: [
      { element: <HomePage />, index: true },
      { path: "projects", element: <Projects /> },
      { path: 'projects/:projectId', element: <ProjectDetails /> },
      { path: "tasks", element: <Tasks /> },
      {
        path: "employee-management",
        element: <EmployeeManagement />,
        children: [
          {
            path: "invite",
            element: <InviteUserForm />
          }
        ]
      },
    ]
  },
  { path: '*', element: <NotFound /> },
]);
export default router;