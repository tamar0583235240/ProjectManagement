import type { Status } from "./Status"
import type { User } from "./User"

export interface Project {
  _id: string
  project_name: string
  description: string
  start_date: Date
  deadline: Date
  status: Status
  project_manager_id: string
  organization_id: string
  project_manager?: User
  createdAt?: Date
  updatedAt?: Date
}
