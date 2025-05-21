
import { api } from "../../app/api"; // הבסיס של RTK Query שלך
import type { AddUserInputs } from "../../types/AddUserInputs";
import type { SetPasswordRequest } from "../../types/SetPasswordRequest"; // סוג הבקשה לעדכון סיסמה
import type { User } from "../../types/User";
export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTeamLeaders: builder.query<User[], string>({
      query: (managerId) => ({
        url: `user/getTeamLeaderNames/${managerId}`,
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
      url: '/set-password',
      method: 'POST',
      body,
    }),
    invalidatesTags: ["User"],
  }),
}),
})
export const { useSetPasswordMutation, useInviteUserMutation, useGetTeamLeadersQuery } = userApi;

