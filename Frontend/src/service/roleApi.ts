

// import { api } from "../app/api";

// import type { Role } from "../types/Role";

// export const rolesApi = api.injectEndpoints({
//     endpoints: (builder) => ({
//         getRoleByName: builder.query<Role, string>({
//             query: (roleName) => ({
//                 url: `roles/getRoleByName/${roleName}`,
//                 method: 'GET',
//             }),
//         }),
//         getRoleById: builder.query<string, string>({
//             query: (roleId) => ({
//                 url: `roles/getRoleByName/${roleId}`,
//                 method: 'GET',
//             }),
//         })
//     }),
    
//     overrideExisting: false,
// });

// export const {
//     useGetRoleByNameQuery,
//     useGetRoleByIdQuery
// } = rolesApi;
import { api } from "../app/api";
import type { Role } from "../types/Role";

export const rolesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRoleByName: builder.query<Role, string>({
            query: (roleName) => ({
                url: `roles/getRoleByName/${roleName}`,
                method: 'GET',
            }),
        }),
        getRoleById: builder.query<string, string>({
            query: (roleId) => ({
                url: `roles/getRoleById/${roleId}`, 
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetRoleByNameQuery,
    useGetRoleByIdQuery,
    useLazyGetRoleByNameQuery, // ← נוספה הקריאה הזו
    useLazyGetRoleByIdQuery    // ← אם תצטרכי גם לפי ID
} = rolesApi;
