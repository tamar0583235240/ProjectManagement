
import { api } from "../../app/api"; 
import type { AddUserInputs } from "../../types/AddUserInputs";
import type { SetPasswordRequest } from "../../types/SetPasswordRequest"; 
import type { User } from "../../types/User";
export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTeamLeaders: builder.query<User[], string>({
      query: (managerId) => ({
        url: `users/getTeamLeaders/${managerId}`,
        method: 'GET',
      }),
    }),
    inviteUser: builder.mutation<string, AddUserInputs>({
      query: (user) => ({
        url: "invite/inviteUser",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
  setPassword: builder.mutation<string, SetPasswordRequest>({
    query: (body) => ({
      url: "invite/setPassword",
      method: 'POST',
      body,
    }),
    invalidatesTags: ["User"],
  }),
}),
})
export const { useSetPasswordMutation,
   useInviteUserMutation, 
   useGetTeamLeadersQuery,} = userApi;

