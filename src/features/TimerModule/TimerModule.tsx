import React, { useState, useCallback } from "react";
import styles from "./TimerModule.module.css";
import Notification from "@components/Notification/Notification";
import { useScramble } from "./hooks/useScramble";
import { useCopyToClipboard } from "@hooks/useCopyToClipboard";
import Scramble from "./components/Scramble/Scramble";
import Actions from "./components/Actions/Actions";
import Display from "./components/Display/Display";
import { formatTime } from "@utils/timeFormatter";
import { useTimer } from "./hooks/useTimer";

const TimerModule: React.FC = () => {
  const { scramble, generateNewScramble } = useScramble("3x3");

  const {
    isCopying: isCopyButtonAnimating,
    notificationVisible,
    copyToClipboard,
    closeNotification,
  } = useCopyToClipboard();

  const [isGenerateButtonAnimating, setIsGenerateButtonAnimating] =
    useState(false);

  const { time, isRunning } = useTimer({
    onStop: generateNewScramble,
  });

  const handleCopyButtonClick = () => {
    copyToClipboard(scramble);
  };

  const handleGenerateButtonClick = useCallback(() => {
    if (!isRunning) {
      generateNewScramble();
      setIsGenerateButtonAnimating(true);
      const animationTimer = setTimeout(
        () => setIsGenerateButtonAnimating(false),
        400
      );
      return () => clearTimeout(animationTimer);
    }
  }, [isRunning, generateNewScramble]);

  const displayTimeValue = formatTime(time);

  return (
    <section className={styles.timerBox}>
      <Scramble text={scramble} />
      <Actions
        onCopy={handleCopyButtonClick}
        onGenerate={handleGenerateButtonClick}
        isCopying={isCopyButtonAnimating}
        isGenerating={isGenerateButtonAnimating}
      />
      <Display time={displayTimeValue} />

      {notificationVisible && (
        <Notification message="Copied!" onClose={closeNotification} />
      )}
    </section>
  );
};

export default TimerModule;
