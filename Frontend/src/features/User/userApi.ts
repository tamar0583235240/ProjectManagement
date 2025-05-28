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
    }),
    overrideExisting: false,
});

export const {
    useValidateUserMutation,
} = userApi;
