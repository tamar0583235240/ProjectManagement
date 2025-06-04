import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import useCurrentUser from '../../hooks/useCurrentUser'
import { Role } from '../../types/Role'

// טיפוס של ה-state במודול המשתמש
interface UserState {
  role: Role | null
  currentManager: string | null
}

const storedUser = useCurrentUser();

const initialState: UserState = {
  role: storedUser.role || null,
  currentManager: storedUser.role!==Role.MANAGER? storedUser.manager_id : storedUser._id,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role | null>) => {
      state.role = action.payload
    },
    setCurrentManager: (state, action: PayloadAction<string | null>) => {
      state.currentManager = action.payload
    },
    resetUser: (state) => {
      state.role = null
      state.currentManager = null
    },
  },
})

export const selectCurrentManagerId = (state: RootState): string | null => state.user.currentManager


export const { setRole, setCurrentManager, resetUser } = userSlice.actions
export default userSlice.reducer

