import { useState, useEffect, useRef } from "react";

interface UseTimerProps {
  onStop?: () => void;
  holdToReadyDuration?: number;
}

export const useTimer = ({
  onStop,
  holdToReadyDuration = 300,
}: UseTimerProps) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerStartTimeRef = useRef<number>(0);
  const readyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerStartTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - timerStartTimeRef.current);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && !event.repeat) {
        event.preventDefault();
        (document.activeElement as HTMLElement)?.blur();

        if (isRunning) {
          setIsRunning(false);
          onStop?.();
          setIsReady(false);
          if (readyTimeoutRef.current) {
            clearTimeout(readyTimeoutRef.current);
            readyTimeoutRef.current = null;
          }
        } else {
          if (!isReady && !readyTimeoutRef.current) {
            readyTimeoutRef.current = setTimeout(() => {
              setTime(0);
              setIsReady(true);
              readyTimeoutRef.current = null;
            }, holdToReadyDuration);
          }
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        (document.activeElement as HTMLElement)?.blur();

        if (readyTimeoutRef.current) {
          clearTimeout(readyTimeoutRef.current);
          readyTimeoutRef.current = null;
        }

        if (isReady && !isRunning) {
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
  }, [isRunning, isReady, onStop, holdToReadyDuration]);

  return { time, isRunning, isReady };
};
