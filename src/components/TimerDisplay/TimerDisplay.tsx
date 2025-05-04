import React, { useState, useRef } from "react";
import styles from "./TimerDisplay.module.css";
import { generateScramble } from "react-rubiks-cube-utils";
import Notification from "../Notification/Notification";

const TimerDisplay: React.FC = () => {
  const [scramble, setScramble] = useState<string>(
    generateScramble({ type: "3x3" })
  );
  const [isRotating, setIsRotating] = useState(false);

  const handleGenerateScramble = () => {
    const newScramble: string = generateScramble({ type: "3x3" });
    setScramble(newScramble);
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 400);
  };

  const [isCopying, setIsCopying] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopyScramble = () => {
    navigator.clipboard.writeText(scramble);
    setIsCopying(true);
    setNotificationVisible(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setNotificationVisible(false);
    }, 3000);

    setTimeout(() => setIsCopying(false), 200);
  };

  const handleCloseNotification = () => {
    setNotificationVisible(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (
    <main className={styles.timerBox}>
      <div className={styles.scramble}>{scramble}</div>
      <div className={styles.options}>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={styles.icon}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        </button>
        <button onClick={handleCopyScramble}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`${styles.icon} ${isCopying ? styles.shrink : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
            />
          </svg>
        </button>
        <button onClick={handleGenerateScramble}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`${styles.icon} ${isRotating ? styles.rotate : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
      <div className={styles.time}>12.03</div>
      {notificationVisible && (
        <Notification message="Copied!" onClose={handleCloseNotification} />
      )}
    </main>
  );
};

export default TimerDisplay;
