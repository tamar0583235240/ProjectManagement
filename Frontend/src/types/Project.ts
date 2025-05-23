import type { Status } from "./Status"
import type { User } from "./User"

// export interface Project {
//   _id: string
//   project_name: string
//   description: string
//   start_date: Date
//   deadline: Date
//   status: Status
//   project_manager_id: string
//   organization_id: string
//   project_manager?: User
//   createdAt?: Date
//   updatedAt?: Date
// }


// טיפוסים וקבועים משותפים

export interface Project {
  _id: string
  project_name: string
  description: string
  start_date: string
  deadline: string
  status: "COMPLETED" | "NOT_STARTED" | "DELAYED" | "IN_PROGRESS"
  project_manager_id: { _id: string; user_name: string; email: string; role: string }
  authorized_Users: string[]
  organization_id: string | null
  createdAt: string
  updatedAt: string
}

// צבעים לסטטוסים
export const statusColors = {
  COMPLETED: { color: "#4caf50", label: "הושלם" },
  NOT_STARTED: { color: "#ffc107", label: "טרם התחיל" },
  DELAYED: { color: "#f44336", label: "באיחור" },
  IN_PROGRESS: { color: "#00bcd4", label: "בתהליך" },
}

// פונקציה בטוחה לקבלת מידע על סטטוס
export const getStatusInfo = (status: string) => {
  return statusColors[status as keyof typeof statusColors] || { color: "#9e9e9e", label: "לא ידוע" }
}

// צבעים לגרפים
export const chartColors = ["#00bcd4", "#f44336", "#ffc107", "#4caf50"]

// פונקציה להצגת התקדמות רנדומלית (במציאות זה היה מגיע מהשרת)
export const getRandomProgress = (projectId: string) => {
  // יצירת מספר רנדומלי אבל קבוע לכל פרויקט
  const hash = projectId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return Math.max(10, Math.min(95, hash % 100))
}

// יצירת מזהה ייחודי
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
