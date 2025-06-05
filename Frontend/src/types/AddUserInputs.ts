
import type { Role } from "./Role";
export type AddUserInputs = {
  email: string;
  role: Role;
  teamLead_id?: string;       
  manager_id?: string;       
  organizationId: string;
};

