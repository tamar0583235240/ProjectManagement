import { api } from "../../app/api";
import type { SignInFormData } from "../../schemas/SchemaSignIn";
import type { Role } from "../../types/Role";
import type { User } from "../../types/User";


export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<User, User>({
      query: (user) => ({
        url: "auth/SignUp",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    signIn: builder.mutation< User,SignInFormData>({
      query: (user) => ({
          url: 'auth/SignIn',
          method: "POST",
          body: user,
      }),
      invalidatesTags: ["User"],
  }),
    // getRoleByName: builder.query<Role, string>({
    //   query: (roleName) => ({
    //     url: `roles/getRoleByName/${roleName}`,
    //     method: "GET",
    //   }),
    // }),
  }),
  overrideExisting: false,
});

export const {
  useSignUpMutation,
  useSignInMutation,
  // useLazyGetRoleByNameQuery,
} = authApi;
