// import { api } from "../../app/api";
// import { type AddEmployeeInput } from "../../schemas/SchemaUser";

// export const usersApi = api.injectEndpoints({
//   endpoints: (builder) => ({
//     addEmployee: builder.mutation({
//       query: (data: AddEmployeeInput) => ({
//         url: "/users/invite",
//         method: "POST",
//         body: data,
//       }),
//     }),
//   }),
// });

// export const { useAddEmployeeMutation } = usersApi;
import { api } from "../../app/api";
import { type AddEmployeeInput } from "../../schemas/SchemaUser";
export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addEmployee: builder.mutation<void, AddEmployeeInput>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
    }),
    getTeamLeaders: builder.query<any[], void>({
      query: () => "/users/team-leaders", // הנתיב מחזיר את ראשי הצוות תחת המנהל הנוכחי
    }),
  }),
});

export const { useAddEmployeeMutation, useGetTeamLeadersQuery } = usersApi;
