import { setCube, setScramble } from "@store/slices/cubeSlice";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  generateScramble as generate,
  applyScramble,
  Cube
} from "react-rubiks-cube-utils";
import { RootState } from "store/store";

export function useScramble(type: string = "3x3") {
  const scramble = useSelector((state: RootState) => state.scramble.scramble);
  const dispatch = useDispatch();

  const generateNewScramble = useCallback(() => {
    const newScramble: string = generate({ type });
    dispatch(setScramble(newScramble));
    const scrambledCube: Cube = applyScramble({
      type: type,
      scramble: newScramble
    });
    dispatch(setCube(scrambledCube));
  }, [type, dispatch]);

  return { scramble, generateNewScramble };
}
