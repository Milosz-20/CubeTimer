import { useState, useCallback } from "react";
import { generateScramble as generate } from "react-rubiks-cube-utils";

export function useScramble(type: string = "3x3") {
  const [scramble, setScramble] = useState<string>(() => generate({ type }));

  const generateNewScramble = useCallback(() => {
    const newScramble: string = generate({ type });
    setScramble(newScramble);
  }, [type]);

  return { scramble, generateNewScramble };
}
