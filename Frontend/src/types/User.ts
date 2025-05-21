export interface User {
    user_name: string
    password: string
    email: string
    role: string; 
    manager_id: string | null; 
    organization_id: string | null;
}