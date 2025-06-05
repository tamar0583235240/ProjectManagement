
import type { Project } from '../../types/Project';
import { api } from '../../app/api';
import type { User } from '../../types/User';

export const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getProjectManagers: builder.query({
      query: () => 'users/project-managers',
      providesTags: ['User'],
    }),

    addProject: builder.mutation<Project, Project>({
      query: (project) => ({
        url: 'projects/addProject',
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
      providesTags: ['Project'],
    }),

    deleteProject: builder.mutation<Project[], string | null>({
      query: (projectId) => ({
        url: `projects/DeleteProject/${projectId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),

    updateProject: builder.mutation<Project, Project>({
      query: (project) => ({
        url: `projects/updateProject/${project._id}`,
        method: 'PUT',
        body: project ,
      }),
      invalidatesTags: ['Project'],
    }),

    updateProjectStatus: builder.mutation<Project, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `projects/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Project'],
    }),

    addAuthorizedUser: builder.mutation<Project, { projectId: string, userId: string }>({
      query: ({ projectId, userId }) => ({
        url: `projects/${projectId}/authorized-users`,
        method: 'POST',
        body: { userId },
      }),
      invalidatesTags: ['Project'],
    }),

    removeAuthorizedUser: builder.mutation<Project, { projectId: string, userId: string }>({
      query: ({ projectId, userId }) => ({
        url: `projects/${projectId}/authorized-users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
    
    getAllTeamMembersUnderManager: builder.query<{
      teamLeaders: User[],
      employees: User[]
    }, string>({
      query: (managerId) => `users/getAllTeamMembersUnderManager/${managerId}`,
      providesTags: ['User'],
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
  useGetAllTeamMembersUnderManagerQuery,
} = projectApi;
