import { api } from "../../app/api";
import type { SignInFormData } from "../../schemas/SchemaSignIn";

import type { SignInResponse, User } from "../../types/User";


export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<SignInResponse, User>({
      query: (user) => ({
        url: "auth/SignUp",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    signIn: builder.mutation< SignInResponse,SignInFormData>({
      query: (user) => ({
          url: 'auth/SignIn',
          method: "POST",
          body: user,
      }),
      invalidatesTags: ["User"],
  }),
  }),
  overrideExisting: false,
});

export const {
  useSignUpMutation,
  useSignInMutation,
} = authApi;
