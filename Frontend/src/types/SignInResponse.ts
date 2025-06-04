import type { Role } from "./Role";

export interface SignInResponse {
  accessToken: string;
  user: {
    _id: string;
    user_name: string;
    email: string;
    role: Role;
    manager_id?: string;
    organization_id: string;
  };
}
