import { useState, useEffect, useRef } from "react";

interface UseTimerProps {
  onStop?: (finalTime: number) => void;
  holdToReadyDuration?: number;
}

export function useTimer({ onStop, holdToReadyDuration }: UseTimerProps) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  const readyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const dateTimerStartTimeRef = useRef<number>(0);
  const perfStartTimeRef = useRef<number>(0);

  const isRunningRef = useRef(isRunning);
  const isReadyRef = useRef(isReady);
  const isHoldingRef = useRef(isHolding);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);
  useEffect(() => {
    isReadyRef.current = isReady;
  }, [isReady]);
  useEffect(() => {
    isHoldingRef.current = isHolding;
  }, [isHolding]);

  // Obsługa timera
  useEffect(() => {
    if (isRunning) {
      perfStartTimeRef.current = performance.now();
      dateTimerStartTimeRef.current = Date.now();

      intervalRef.current = setInterval(() => {
        setTime(Date.now() - dateTimerStartTimeRef.current);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (perfStartTimeRef.current !== 0) {
        const perfStopTime = performance.now();
        const preciseDuration = perfStopTime - perfStartTimeRef.current;
        setTime(preciseDuration);
        onStop?.(preciseDuration);
        perfStartTimeRef.current = 0;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, onStop]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && !event.repeat) {
        event.preventDefault();

        if (isRunningRef.current) {
          setIsRunning(false);
          setIsReady(false);
          setIsHolding(false);
          if (readyTimeoutRef.current) {
            clearTimeout(readyTimeoutRef.current);
            readyTimeoutRef.current = null;
          }
        } else {
          if (!isReadyRef.current && !readyTimeoutRef.current) {
            setIsHolding(true);
            readyTimeoutRef.current = setTimeout(() => {
              setTime(0);
              setIsReady(true);
              setIsHolding(false);
              readyTimeoutRef.current = null;
            }, holdToReadyDuration);
          }
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();

        if (readyTimeoutRef.current) {
          clearTimeout(readyTimeoutRef.current);
          readyTimeoutRef.current = null;
          setIsHolding(false);
        }

        if (isReadyRef.current && !isRunningRef.current) {
          setIsReady(false);
          setIsRunning(true);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      if (readyTimeoutRef.current) {
        clearTimeout(readyTimeoutRef.current);
      }
    };
  }, [holdToReadyDuration]);

  return { time, isRunning, isReady, isHolding };
}
