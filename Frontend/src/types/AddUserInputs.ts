export interface AddUserInputs {
    email: string;
    user_name: string;
    role: "team_leader" | "employee";   // חייב להתאים בדיוק ל-z.enum
    team_leader_id?: string;            // אופציונלי כמו ב-zod
  }
  