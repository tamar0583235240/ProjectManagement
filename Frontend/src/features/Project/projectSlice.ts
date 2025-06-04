import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Project } from '../../types/Project'
import type { RootState } from '../../app/store'

interface ProjectsState {
  projects: Project[]
  isLoading: boolean
  error: string | null
}

const initialState: ProjectsState = {
  projects: [],
  isLoading: false,
  error: null,
}

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload
      state.isLoading = false
      state.error = null
    },
    setLoading: (state) => {
      state.isLoading = true
      state.error = null
    },
    setError: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { setProjects, setLoading, setError } = projectSlice.actions
export const selectProjectById = (state: RootState, id: string) =>
  state.projects.projects.find((project) => project._id === id);
  // features/Project/projectSlice.ts
export const selectAllProjects = (state: RootState) => state.projects.projects;
export const selectProjectsCount = (state: RootState) => state.projects.projects.length;

export default projectSlice.reducer
