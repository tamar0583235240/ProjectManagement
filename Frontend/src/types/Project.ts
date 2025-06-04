import type { Status } from "./Status"
export const statusColors = {
  COMPLETED: { color: "#4caf50", label: "COMPLETED" },
  NOT_STARTED: { color: "#ffc107", label: "NOT_STARTED" },
  DELAYED: { color: "#f44336", label: "DELAYED" },
  IN_PROGRESS: { color: "#00bcd4", label: "IN_PROGRESS" },
}

export const getStatusInfo = (status: string) => {
  return statusColors[status as keyof typeof statusColors] || { color: "#9e9e9e", label: "לא ידוע" }
}


export const chartColors = ["#00bcd4", "#f44336", "#ffc107", "#4caf50"]

export const getRandomProgress = (projectId: string) => {

  const hash = projectId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return Math.max(10, Math.min(95, hash % 100))
}

export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}


export interface Project {
  _id: string;
  project_name: string;
  description: string;
  start_date: Date | string;
  deadline: Date | string;
  status: Status;
  project_manager_id: string;
  organization_id: string;
  authorized_Users: string[]; 
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
export interface User {
  _id: string;
  user_name: string;
  email: string;
  organization_id?: string;
  role?: string;
}

export interface Organization {
  _id: string;
  name: string;
  description?: string;
}

export interface ProjectManager extends User {
  role: 'MANAGER';
}

export interface AddProjectFormData {
  project_name: string;
  description: string;
  start_date: string;
  deadline: string;
  project_manager_id: string;
  organization_id: string;
  authorized_Users: AuthorizedUserFormData[];
}

export interface AuthorizedUserFormData {
  id?: string; 
  user_name: string;
  email: string;
  _id?: string;
}

export interface EditProjectFormData {
  project_name: string;
  description: string;
  status: Status;
  deadline: string;
}

export interface AuthorizedUser {
  id: string;
  name: string;
  email: string;
}
