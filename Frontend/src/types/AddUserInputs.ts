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

import type { Role } from "./Role";

// 
export type AddUserInputs = {
  email: string;
  role: Role;
  teamLead_id?: string;       
  manager_id?: string;       
  organizationId: string;
};

