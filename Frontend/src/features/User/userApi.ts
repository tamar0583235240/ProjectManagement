// import { api } from "../../app/api";
// import type { AddUserInputs } from "../../types/AddUserInputs";
// import type { SetPasswordRequest } from "../../types/SetPasswordRequest";
// import type { User } from "../../types/User";

// export const userApi = api.injectEndpoints({
//     endpoints: (builder) => ({
//         validateUser: builder.mutation<{ _id: string } | null, { username: string; email: string }>({
//             query: ({ username, email }) => ({
//                 url: "Users/validate-user",
//                 method: "POST",
//                 body: { username, email },
//             }),
//         }),

//         getTopManagerOfEmployee: builder.query<{ topManagerId: string }, string>({
//             query: (employeeId) => ({
//                 url: `Users/getTopManagerOfEmployee/${employeeId}`,
//                 method: "GET",
//             }),
//         }),

//         getEmployeesByOrganization: builder.query<{ _id: string; user_name: string; email: string }[], string>({
//             query: (orgId) => ({
//                 url: `Users/getEmployeesByOrg/${orgId}`,
//                 method: "GET",
//             }),
//         }),
//         getTeamLeaders: builder.query<User[], string>({
//             query: (managerId) => ({
//                 url: `user/getTeamLeaders/${managerId}`,
//                 method: 'GET',
//             }),
//         }),
//         inviteUser: builder.mutation<string, AddUserInputs>({
//             query: (user) => ({
//                 url: "invite/inviteUser",
//                 method: "POST",
//                 body: user,
//             }),
//             invalidatesTags: ["User"],
//         }),
//         setPassword: builder.mutation<string, SetPasswordRequest>({
//             query: (body) => ({
//                 url: "invite/setPassword",
//                 method: 'POST',
//                 body,
//             }),
//             invalidatesTags: ["User"],
//         }),
//     }),
//     overrideExisting: false,
// });

// export const {
//     useValidateUserMutation,
//     useGetTopManagerOfEmployeeQuery,
//     useGetEmployeesByOrganizationQuery,
//     useGetTeamLeadersQuery,
//     useInviteUserMutation,
//     useSetPasswordMutation,
// } = userApi;


// src/features/User/userApi.ts
import { api } from "../../app/api";
import type { AddUserInputs } from "../../types/AddUserInputs";
import type { SetPasswordRequest } from "../../types/SetPasswordRequest";
import type { User } from "../../types/User";
import type { Organization } from "../../types/Organization"; // Ensure this type exists and is correctly defined

// Assuming your User type looks something like this (add or verify these properties in your actual User type)
// export interface User {
//   _id: string;
//   user_name: string;
//   email: string;
//   role: string; // Crucial for distinguishing user types
//   organization_id?: string; // If user is linked to an organization via ID
//   manager_id?: string; // If user has a manager
//   // ... other user-related properties
// }

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



    // ** NEW ENDPOINTS FOR HOME PAGE **

    /**
     * Fetches the details of the currently authenticated user.
     * This endpoint typically relies on an authentication token (e.g., JWT)
     * sent in the request headers (handled by your baseQuery in api.ts).
     * @returns The full User object.
     */
    getCurrentUser: builder.query<User, void>({
      query: () => 'auth/me', // ** IMPORTANT: Adjust this URL to your actual backend endpoint for fetching current user details **
      providesTags: ['User'], // Invalidate and refetch user data when 'User' tag changes
    }),

    /**
     * Fetches the details of an organization based on its ID.
     * This assumes the user object contains an `organization_id` property.
     * @param organizationId The ID of the organization to fetch.
     * @returns The Organization object.
     */
    getOrganizationById: builder.query<Organization, string>({
      query: (organizationId) => `organizations/${organizationId}`, // ** IMPORTANT: Adjust this URL to your actual backend endpoint for fetching organization by ID **
      providesTags: ['Organization'], // Tag for cache invalidation
    }),

    // Alternatively, if your backend can fetch organization by user ID directly:
    // getUserOrganization: builder.query<Organization, string>({
    //   query: (userId) => `organizations/user/${userId}`, // Example: Backend fetches org associated with userId
    //   providesTags: ['Organization'],
    // }),

  }),
  overrideExisting: false, // Keep this as false to safely inject new endpoints
});

export const {
  useValidateUserMutation,
  useGetTopManagerOfEmployeeQuery,
  useGetEmployeesByOrganizationQuery,
  useGetTeamLeadersQuery,
  useInviteUserMutation,
  useSetPasswordMutation,

  // ** Export the new hooks **
  useGetCurrentUserQuery,
  useGetOrganizationByIdQuery,
  // useGetUserOrganizationQuery, // If you chose the alternative endpoint above
} = userApi;