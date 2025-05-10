import React, { useCallback } from "react";
import styles from "./TimerModule.module.css";
import { useScramble } from "./hooks/useScramble";
import { useCopyToClipboard } from "@hooks/useCopyToClipboard";
import Scramble from "./components/Scramble/Scramble";
import Actions from "./components/Actions/Actions";
import Display from "./components/Display/Display";
import { formatTime } from "@utils/timeFormatter";
import { useTimer } from "./hooks/useTimer";

/**
 * Timer Module that handles the timer functionality, including scramble generation and time display.
 *
 * @returns {JSX.Element} Timer Module component
 *
 * @see {@link useScramble}
 * @see {@link useCopyToClipboard}
 * @see {@link useTimer}
 */
const TimerModule: React.FC = () => {
  const holdToReadyDuration = 300;
  const { scramble, generateNewScramble } = useScramble("3x3");
  const { copyToClipboard } = useCopyToClipboard();

  const handleTimerStop = useCallback(
    (finalTime: number) => {
      console.log("Final time: ", finalTime);
      generateNewScramble();
    },
    [generateNewScramble]
  );

  const { time, isRunning, isReady, isHolding } = useTimer({
    onStop: handleTimerStop,
    holdToReadyDuration,
  });

  const handleCopyButtonClick = () => {
    copyToClipboard(scramble);
  };

  const handleGenerateButtonClick = useCallback(() => {
    if (!isRunning) {
      generateNewScramble();
    }
  }, [isRunning, generateNewScramble]);

  const displayTimeValue = formatTime(time);

  let displayTextColor = "var(--color-white)";
  if (isHolding) {
    displayTextColor = "var(--color-red)";
  } else if (isReady && !isRunning) {
    displayTextColor = "var(--color-green)";
  }

  return (
    <section className={styles.timerBox}>
      <Scramble text={scramble} />
      <Actions
        onCopy={handleCopyButtonClick}
        onGenerate={handleGenerateButtonClick}
      />
      <Display time={displayTimeValue} textColor={displayTextColor} />
    </section>
  );
};

export default TimerModule;
