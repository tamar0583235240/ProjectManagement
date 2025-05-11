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

  }),
  overrideExisting: false,
});

export const {
  useAddOrganizationMutation,
  // export future hooks as needed
} = organizationsApi;
