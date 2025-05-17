import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Cube } from "react-rubiks-cube-utils";

interface cubeState {
  cube: Cube | null;
  scramble: string;
}

const initialState: cubeState = { cube: null, scramble: "" };

const cubeSlice = createSlice({
  name: "scramble",
  initialState,
  reducers: {
    setCube(state, action: PayloadAction<Cube>) {
      state.cube = action.payload;
    },
    setScramble(state, action: PayloadAction<string>) {
      state.scramble = action.payload;
    }
  }
});

export const { setCube, setScramble } = cubeSlice.actions;
export default cubeSlice.reducer;
