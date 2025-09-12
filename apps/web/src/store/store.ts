import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@app/api/apiSlice';
import authReducer from '@features/auth/slices/authSlice';
import scrambleReducer from './slices/cubeSlice';
import timerReducer from './slices/timerSlice';
import notificationReducer from './slices/notificationsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    scramble: scrambleReducer,
    timer: timerReducer,
    notifications: notificationReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
