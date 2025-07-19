import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slices/notificationsSlice";
import scrambleReducer from "./slices/cubeSlice";
import timerReducer from "./slices/timerSlice";

export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    scramble: scrambleReducer,
    timer: timerReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
