import { z } from 'zod';

export const SchemaOrganization = z.object({
    organization_name: z.string().min(2, { message: "Organization name is required." }),
    organization_description: z.string().min(2, { message: "Organization description is required." }),
    organization_address: z.string().min(2, { message: "Organization address is required." }),
    organization_phone: z
      .string()
      .min(1, { message: "Organization phone is required." })
      .regex(/^[0-9+\-\s()]*$/, { message: "Please enter a valid phone number." }),
  })
  
  export type OrganizationFormData = z.infer<typeof SchemaOrganization>