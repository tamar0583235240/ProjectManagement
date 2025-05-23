import { configureStore } from '@reduxjs/toolkit'
import { api } from './api'          // RTK Query api slice
import userReducer from '../features/auth/userSlice'
import { projectApi } from '../features/Projects/projectApi'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
