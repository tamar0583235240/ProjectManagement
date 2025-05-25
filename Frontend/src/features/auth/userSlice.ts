import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import useCurrentUser from '../../hooks/useCurrentUser'

// טיפוס של ה-state במודול המשתמש
interface UserState {
  role: string | null
  currentManager: string | null
}

const storedUser = useCurrentUser();

const initialState: UserState = {
  role: storedUser.role || null,
  currentManager: storedUser.role!=="MANAGER"? storedUser.manager_id : storedUser._id,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<string | null>) => {
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

