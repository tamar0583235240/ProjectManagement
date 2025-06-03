import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import HomePage from "../pages/HomePage";
import Projects from "../pages/Projects";
import Tasks from "../pages/Tasks";
import NotFound from "../pages/NotFound";
import InitialRouter from "../components/InitialRouter";
import LandingPage from "../pages/LandingPage";
import ProjectDetails from "../features/Project/ProjectDetails";
import EmployeeManagement from "../pages/EmployeeManagement";

const router = createBrowserRouter([
  {
    path: '/',
    element: <InitialRouter />,
  },
  {
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
