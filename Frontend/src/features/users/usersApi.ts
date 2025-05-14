import { api } from "../../app/api";
import { type AddEmployeeInput } from "../../schemas/SchemaUser";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addEmployee: builder.mutation({
      query: (data: AddEmployeeInput) => ({
        url: "/users/invite",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddEmployeeMutation } = usersApi;
