import { api } from "../../app/api";
import type { SignInFormData } from "../../schemas/SchemaSignIn";
import type { ForgotPasswordFormData } from "../../types/ForgotPasswordFormData";
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
  forgotPassword: builder.mutation<{ message: string }, ForgotPasswordFormData>({
    query: (data) => ({
      url: "auth/forgot-password",
      method: "POST",
      body: data,
    }),
  }),
  resetPassword: builder.mutation<{ message: string }, { token: string; password: string }>({
    query: ({ token, password }) => ({
      url: `auth/reset-password/${token}`,
      method: "POST",
      body: { token, password },
    }),
  }),
}),
overrideExisting: false,
});
export const {
  useSignUpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useSignInMutation,
} = authApi;
