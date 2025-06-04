import { api } from "../../app/api";
import type { AddUserInputs } from "../../types/AddUserInputs";
import type { SetPasswordRequest } from "../../types/SetPasswordRequest";
import type { User } from "../../types/User";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        validateUser: builder.mutation<{ _id: string } | null, { username: string; email: string }>({
            query: ({ username, email }) => ({
                url: "Users/validate-user",
                method: "POST",
                body: { username, email },
            }),
        }),

        getTopManagerOfEmployee: builder.query<{ topManagerId: string }, string>({
            query: (employeeId) => ({
                url: `Users/getTopManagerOfEmployee/${employeeId}`,
                method: "GET",
            }),
        }),

        getEmployeesByOrganization: builder.query<{ _id: string; user_name: string; email: string }[], string>({
            query: (orgId) => ({
                url: `Users/getEmployeesByOrg/${orgId}`,
                method: "GET",
            }),
        }),
        getTeamLeaders: builder.query<User[], string>({
            query: (managerId) => ({
                url: `user/getTeamLeaders/${managerId}`,
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
    overrideExisting: false,
});

export const {
    useValidateUserMutation,
    useGetTopManagerOfEmployeeQuery,
    useGetEmployeesByOrganizationQuery,
    useGetTeamLeadersQuery,
    useInviteUserMutation,
    useSetPasswordMutation,
} = userApi;
