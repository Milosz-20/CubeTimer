import { configureStore } from "@reduxjs/toolkit";
import scrambleReducer from "./slices/cubeSlice";
import timerReducer from "./slices/timerSlice";
import notificationReducer from "./slices/notificationsSlice";

export const store = configureStore({
  reducer: {
    scramble: scrambleReducer,
    timer: timerReducer,
    notifications: notificationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
