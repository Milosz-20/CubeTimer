import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationsSlice";
import scrambleReducer from "./cubeSlice";
import timerReducer from "./timerSlice";

export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    scramble: scrambleReducer,
    timer: timerReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
