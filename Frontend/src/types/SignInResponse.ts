export interface SignInResponse {
  accessToken: string;
  user: {
    _id: string;
    user_name: string;
    email: string;
    role: string;
    manager_id?: string;
    organization_id: string;
  };
}
