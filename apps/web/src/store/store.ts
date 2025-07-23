import { configureStore } from "@reduxjs/toolkit";
import scrambleReducer from "./slices/cubeSlice";
import timerReducer from "./slices/timerSlice";

export const store = configureStore({
  reducer: { scramble: scrambleReducer, timer: timerReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
