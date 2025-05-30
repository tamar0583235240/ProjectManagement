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

    // הוספת פרויקט חדש
    addProject: builder.mutation<Project, Project>({
      query: (project) => ({
        url: 'projects/addProject',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Project'],
    }),

    // קבלת פרויקטים לפי מנהל
    getProjectsByManagerId: builder.query<Project[], string | null>({
      query: (managerId) => ({
        url: `projects/getProjectsByManagerId/${managerId}`,
        method: 'GET',
      }),
      providesTags: ['Project'],
    }),

    // מחיקת פרויקט
    deleteProject: builder.mutation<Project[], string | null>({
      query: (projectId) => ({
        url: `projects/DeleteProject/${projectId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),

    // עדכון פרויקט
    updateProject: builder.mutation<Project, Project>({
      query: (project) => ({
        url: `projects/${project._id}`,
        method: 'PUT',
        body: { project },
      }),
      invalidatesTags: ['Project'],
    }),

    // עדכון סטטוס פרויקט
    updateProjectStatus: builder.mutation<Project, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `projects/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Project'],
    }),

    // הוספת משתמש מורשה לפרויקט
    addAuthorizedUser: builder.mutation<Project, { projectId: string, userId: string }>({
      query: ({ projectId, userId }) => ({
        url: `projects/${projectId}/authorized-users`,
        method: 'POST',
        body: { userId },
      }),
      invalidatesTags: ['Project'],
    }),

    // הסרת משתמש מורשה מפרויקט
    removeAuthorizedUser: builder.mutation<Project, { projectId: string, userId: string }>({
      query: ({ projectId, userId }) => ({
        url: `projects/${projectId}/authorized-users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
  }),
});

export const {
  useGetProjectsByManagerIdQuery,
  useGetProjectManagersQuery,
  useDeleteProjectMutation,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useUpdateProjectStatusMutation,
  useAddAuthorizedUserMutation,
  useRemoveAuthorizedUserMutation,
} = projectApi;
