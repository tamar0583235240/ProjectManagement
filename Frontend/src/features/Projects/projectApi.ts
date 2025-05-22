// src/services/api/projectApi.ts - RTK Query APIs
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProjectFormData } from './projectSchema';
import type { Project } from '../../types/Project';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Project', 'Status', 'User'],
  endpoints: (builder) => ({
    // קבלת רשימת סטטוסים
    getStatuses: builder.query({
      query: () => 'statuses',
      providesTags: ['Status'],
    }),

    // קבלת רשימת מנהלי פרויקט
    getProjectManagers: builder.query({
      query: () => 'users/project-managers',
      providesTags: ['User'],
    }),

    // חיפוש משתמש לפי אימייל
    searchUserByEmail: builder.query({
      query: (email) => `users/search?email=${email}`,
      providesTags: ['User'],
    }),

    // הוספת פרויקט חדש
    addProject: builder.mutation({
      query: (project) => ({
        url: 'projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Project'],
    }),

    getProjectsByManagerId: builder.query<Project[], string>({
      query: (managerId) => ({
        url: `projects/getProjectsByManagerId/${managerId}`,
        method: 'GET',
      }),
    })
  }),
});
export const {
  useGetStatusesQuery,
  useGetProjectManagersQuery,
  useSearchUserByEmailQuery,
  useAddProjectMutation
} = projectApi;