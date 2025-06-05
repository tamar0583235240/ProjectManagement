import { api } from "../../app/api";
import type { Organization } from "../../types/Organization";

export const organizationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addOrganization: builder.mutation<Organization, Organization>({
      query: (organization) => ({
        url: "organizations/AddOrganization",
        method: "POST",
        body: organization,
      }),
      invalidatesTags: ["Organization"],
    }),

    getOrganizationByUserId: builder.query<Organization, string>({
      query: (userId: string) => `organizations/by-user/${userId}`,
    }),

  }),
  overrideExisting: false,
});
export const {
  useAddOrganizationMutation,
  useGetOrganizationByUserIdQuery
} = organizationsApi;
