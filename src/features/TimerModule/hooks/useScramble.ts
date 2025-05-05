import { useState, useCallback } from "react";
import { generateScramble as generate } from "react-rubiks-cube-utils";

export const useScramble = (type: string = "3x3") => {
  const [scramble, setScramble] = useState<string>(generate({ type }));
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNewScramble = useCallback(() => {
    const newScramble: string = generate({ type });
    setScramble(newScramble);
    setIsGenerating(true);

    const timer = setTimeout(() => setIsGenerating(false), 400);

    return () => clearTimeout(timer);
  }, [type]);

  return { scramble, isGenerating, generateNewScramble };
};
