// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import type { User } from "../../types/User";

// interface UserState {
//   currentUser: User | null;
// }
// const initialState: UserState = {
//   currentUser: null,
// };
// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setCurrentUser(state, action: PayloadAction<User>) {
//       state.currentUser = action.payload;
//     },
//     clearCurrentUser(state) {
//       state.currentUser = null;
//     },
//   },
// });

// export const selectCurrentUser = (state: { user: UserState }) => state.user.currentUser;
// export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
// export default userSlice.reducer;
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/User";
import type { Organization } from "../../types/Organization";
import type { Project } from "../../types/Project";
import type { Task } from "../../types/Task";

interface UserState {
  currentUser: User | null;
  organization: Organization | null;
  projects: Project[];
  tasks: Task[];
}

const initialState: UserState = {
  currentUser: null,
  organization: null,
  projects: [],
  tasks: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    setOrganization(state, action: PayloadAction<Organization>) {
      state.organization = action.payload;
    },
    setProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
    },
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    clearAll(state) {
      state.currentUser = null;
      state.organization = null;
      state.projects = [];
      state.tasks = [];
    },
  },
});

export const {
  setCurrentUser,
  setOrganization,
  setProjects,
  setTasks,
  clearAll,
} = userSlice.actions;

export const selectCurrentUser = (state: { user: UserState }) => state.user.currentUser;
export const selectOrganization = (state: { user: UserState }) => state.user.organization;
export const selectProjects = (state: { user: UserState }) => state.user.projects;
export const selectTasks = (state: { user: UserState }) => state.user.tasks;

export default userSlice.reducer;
