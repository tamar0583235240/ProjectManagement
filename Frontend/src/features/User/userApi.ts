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
    }),
    overrideExisting: false,
});

export const {
    useValidateUserMutation,
    useGetTopManagerOfEmployeeQuery,
} = userApi;
