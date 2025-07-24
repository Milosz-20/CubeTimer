import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Cube } from "react-rubiks-cube-utils";

interface CubeState {
  cube: Cube | null;
  scramble: string;
}

const initialState: CubeState = { cube: null, scramble: "" };

const cubeSlice = createSlice({
  name: "cube",
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
