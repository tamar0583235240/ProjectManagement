import { api } from "../../app/api";

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
    }),
    overrideExisting: false,
});

export const {
    useValidateUserMutation,
    useGetTopManagerOfEmployeeQuery,
    useGetEmployeesByOrganizationQuery,
} = userApi;
