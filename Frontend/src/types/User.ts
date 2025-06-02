// import type { Role } from "./Role";

// export interface User {
//     user_name: string
//     password: string
//     email: string
//     role: Role; 
//     manager_id: string | null; 
//     organization_id: string | null;
// }

// export interface SignInResponse {
//   accessToken: string;
//   user: User;
// }


export interface User {
  _id: string
  user_name: string
  email: string
  organization_id?: string
  role?: string
}
