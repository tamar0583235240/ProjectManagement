import { api } from "../../app/api";
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

        getEmployeesByOrganization: builder.query<User[], string>({
            query: (orgId) => ({
                url: `Users/getEmployeesByOrg/${orgId}`,
                method: "GET",
            }),
        }),

            // מחיקת משתמש
    deleteUser: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: `/users/DeleteUser/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    // עדכון משתמש
    updateUser: builder.mutation<User, { userId: string; data: Partial<User> }>({
      query: ({ userId, data }) => ({
        url: `/users/UpdateUser/${userId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),


    }),
    overrideExisting: false,
});

export const {
    useValidateUserMutation,
    useGetTopManagerOfEmployeeQuery,
    useGetEmployeesByOrganizationQuery,
    useDeleteUserMutation,
    useUpdateUserMutation

} = userApi;
