// export interface AddUserInputs {
//     email: string;
//     user_name: string;
//     role: "team_leader" | "employee";   // חייב להתאים בדיוק ל-z.enum
//     manager_id?: string;            // אופציונלי כמו ב-zod
// //   }
// export type AddUserInputs = {
//   email: string;
//   role: "team_leader" | "employee";
//   teamLeaderId?: string;
//   organizationId?: string;
// };

import type { Role } from "../enums/role.enum";

// 
export type AddUserInputs = {
  email: string;
  role: Role.TEAM_LEADER | Role.EMPLOYEE;
  teamLeadId?: string;        // ראש צוות (עובד חייב לבחור ראש צוות)
  managerId?: string;         // מנהל (לראש צוות) או ראש צוות (לעובד)
  organizationId: string;
};

