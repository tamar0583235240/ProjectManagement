import { api } from "../../app/api"; // הבסיס של RTK Query שלך
import type { SetPasswordRequest } from "../../types/SetPasswordRequest"; // סוג הבקשה לעדכון סיסמה

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    setPassword: build.mutation<void, SetPasswordRequest>({
      query: ({ token, user_name, password }) => ({
        url: `/users/set-password/${token}`, // הנתיב שרת לקבלת set password
        method: "POST",
        body: { user_name, password }, // גוף הבקשה בלי הטוקן שב-URL
      }),
    }),

    addUser: build.mutation<void,
      { email: string; role: string; managerId?: string; organizationId: string }>({
      query: (body) => ({
        url: "/invite/inviteUser",
        method: "POST",
        body,
      }),
    }),

    getTeamLeaders: build.query<
      { _id: string; user_name: string }[],
      void
    >({
      query: () => "/users/team-leaders",
    }),
  }),
});

export const { useSetPasswordMutation, useAddUserMutation, useGetTeamLeadersQuery } = userApi;
