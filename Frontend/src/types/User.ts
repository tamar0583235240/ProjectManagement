import type { Role } from "./Role";

export interface User {
    user_name?: string
    password?: string
    email?: string
    role?: Role; 
    manager_id?: string | null; 
    organization_id?: string | null;
}