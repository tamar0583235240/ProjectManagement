import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'
import userReducer from '../features/auth/userSlice'
import projectsReducer from '../features/Projects/projectSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    projects: projectsReducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
