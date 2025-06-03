import { api } from "../../app/api";
import type { Status } from "../../types/Status";

export interface User {
    _id: string;
    user_name: string;
    email: string;
}

export interface Task {
    _id: string;
    task_name: string;
    description: string;
    deadline: string;
    status: Status;
    project_id: string;
    performed_by?: User;
    created_by: User;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskRequest {
    task_name: string;
    description: string;
    deadline: string;
    status: Status;
    project_id: string;
    performed_by?: string | null;
}

export interface UpdateTaskRequest extends Partial<CreateTaskRequest> {
    _id: string;
}

export const tasksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Get all tasks
        getTasks: builder.query<Task[], void>({
            query: () => 'tasks',
            providesTags: ['Task'],
        }),

        // Get task by ID
        getTaskById: builder.query<Task, string>({
            query: (id) => `tasks/${id}`,
            providesTags: (result, error, id) => [{ type: 'Task', id }],
        }),

        // Get tasks by project
        getTasksByProject: builder.query<Task[], string>({
            query: (projectId) => ({
                url: `tasks/getTasksByProject/${projectId}`,
                method: 'GET',
            }),
            providesTags: ['Task'],
        }),

        // Get tasks by user
        getTasksByUser: builder.query<Task[], string>({
            query: (userId) => `tasks/user/${userId}`,
            providesTags: (result, error, userId) => [
                { type: 'Task', id: `user-${userId}` },
                'Task',
            ],
        }),

        addTask: builder.mutation<Task, CreateTaskRequest>({
            query: (newTask) => ({
                url: 'tasks/addTask',
                method: 'POST',
                body: newTask,
            }),
            invalidatesTags: ['Task'],
        }),

        // Update task
        updateTask: builder.mutation<Task, UpdateTaskRequest>({
            query: ({ _id, ...patch }) => ({
                url: `tasks/${_id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: (result, error, { _id, project_id }) => [
                { type: 'Task', id: _id },
                { type: 'Task', id: `project-${project_id}` },
                'Task',
            ],
        }),

        // Delete task
        deleteTask: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Task'],
        }),

        // Update task status
        updateTaskStatus: builder.mutation<Task, { id: string; status: string }>({
            query: ({ id, status }) => ({
                url: `tasks/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Task', id },
                'Task',
            ],
        }),

        // Assign task to user
        assignTask: builder.mutation<Task, { taskId: string; userId: string }>({
            query: ({ taskId, userId }) => ({
                url: `tasks/${taskId}/assign`,
                method: 'PATCH',
                body: { performed_by: userId },
            }),
            invalidatesTags: (result, error, { taskId }) => [
                { type: 'Task', id: taskId },
                'Task',
            ],
        }),

        // Get overdue tasks
        getOverdueTasks: builder.query<Task[], void>({
            query: () => 'tasks/overdue',
            providesTags: ['Task'],
        }),

        // Get tasks by status
        getTasksByStatus: builder.query<Task[], string>({
            query: (status) => `tasks/status/${status}`,
            providesTags: (result, error, status) => [
                { type: 'Task', id: `status-${status}` },
                'Task',
            ],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useGetTaskByIdQuery,
    useGetTasksByProjectQuery,
    useGetTasksByUserQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useUpdateTaskStatusMutation,
    useAssignTaskMutation,
    useGetOverdueTasksQuery,
    useGetTasksByStatusQuery,
} = tasksApi;