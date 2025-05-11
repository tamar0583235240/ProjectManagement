// import { eventApi } from '../features/auth/calender/eventApi';
// configureStore({
//   reducer: {
//     [eventApi.reducerPath]: eventApi.reducer,
//     // eventApi: eventApi.reducer,
//     // reducers נוספים
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(eventApi.middleware),
// });
// function configureStore(arg0: { reducer: { [x: number]: any; }; middleware: (getDefaultMiddleware: any) => any; }) {
//     throw new Error('Function not implemented.');
// }

import { configureStore } from '@reduxjs/toolkit';
import { eventApi } from '../features/auth/calender/eventApi';

export const store = configureStore({
  reducer: {
    [eventApi.reducerPath]: eventApi.reducer,
    // הוסיפי reducers נוספים אם יש לך
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
