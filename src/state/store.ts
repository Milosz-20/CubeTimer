import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationsSlice";
import scrambleReducer from "./cubeSlice";

export const store = configureStore({
  reducer: { notifications: notificationReducer, scramble: scrambleReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
