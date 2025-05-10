import { useState, useCallback } from "react";
import { generateScramble as generate } from "react-rubiks-cube-utils";

/**
 * Custom hook to generate and manage a scramble for a Rubik's Cube.
 *
 * @param type Type of the cube (e.g., "2x2", "3x3", "4x4", etc.)
 * @returns {Object} scramble - The current scramble string, generateNewScramble - Function to generate a new scramble.
 * @see {@link react-rubiks-cube-utils#generateScramble}
 */
export function useScramble(type: string = "3x3") {
  const [scramble, setScramble] = useState<string>(() => generate({ type }));

  const generateNewScramble = useCallback(() => {
    const newScramble: string = generate({ type });
    setScramble(newScramble);
  }, [type]);

  return {
    scramble,
    generateNewScramble,
  };
};
