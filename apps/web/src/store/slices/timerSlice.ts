import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface timerState {
  isScrambleLocked: boolean;
}

const initialState: timerState = { isScrambleLocked: false };

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setIsScrambleLocked(state, action: PayloadAction<boolean>) {
      state.isScrambleLocked = action.payload;
    }
  }
});

export const { setIsScrambleLocked } = timerSlice.actions;
export default timerSlice.reducer;
