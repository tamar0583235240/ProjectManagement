// src/services/api/projectApi.ts - RTK Query APIs
import type { Project } from '../../types/Project';
import { api } from '../../app/api';


export const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // קבלת רשימת מנהלי פרויקט
    getProjectManagers: builder.query({
      query: () => 'users/project-managers',
      providesTags: ['User'],
    }),

    // // חיפוש משתמש לפי אימייל
    // searchUserByEmail: builder.query({
    //   query: (email) => `users/search?email=${email}`,
    //   providesTags: ['User'],
    // }),

    // הוספת פרויקט חדש
    addProject: builder.mutation<Project,Project>({
      query: (project) => ({
        url: 'projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Project'],
    }),

    getProjectsByManagerId: builder.query<Project[], string | null>({
      query: (managerId) => ({
        url: `projects/getProjectsByManagerId/${managerId}`,
        method: 'GET',
      }),
    }),

    deleteProject: builder.query<Project[], string | null>({
      query: (managerId) => ({
        url: `projects/DeleteProject/${managerId}`,
        method: 'DELETE',
      }),
    })
  }),
});
export const {
  useGetProjectsByManagerIdQuery,
  useGetProjectManagersQuery,
  useDeleteProjectQuery,
  useAddProjectMutation
} = projectApi;