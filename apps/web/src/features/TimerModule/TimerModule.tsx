import React, { useCallback, useEffect, useState } from "react";
import styles from "./TimerModule.module.css";
import { useScramble } from "./hooks/useScramble";
import { useCopyToClipboard } from "@hooks/useCopyToClipboard";
import Scramble from "./components/Scramble/Scramble";
import Actions from "./components/Actions/Actions";
import Display from "./components/Display/Display";
import { formatTime, trimToWords } from "@utils/textFormatter";
import { useTimer } from "./hooks/useTimer";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "@state/notificationsSlice";
import { RootState } from "@state/store";
import { setIsScrambleLocked } from "@state/timerSlice";

const TimerModule: React.FC = () => {
  const dispatch = useDispatch();
  const holdToReadyDuration = 300;
  const { scramble, generateNewScramble } = useScramble("3x3");
  const { copyToClipboard } = useCopyToClipboard();
  const isScrambleLocked = useSelector(
    (state: RootState) => state.timer.isScrambleLocked
  );

  useEffect(() => {
    if (!scramble) {
      generateNewScramble();
    }
  }, [scramble, generateNewScramble]);

  const handleTimerStop = useCallback(
    (finalTime: number) => {
      console.log("Final time: ", finalTime);
      console.log(isScrambleLocked);
      if (!isScrambleLocked) {
        generateNewScramble();
      }
    },
    [generateNewScramble, isScrambleLocked]
  );

  const handleToggleLock = () => {
    dispatch(setIsScrambleLocked(!isScrambleLocked));
    console.log(isScrambleLocked);
  };

  const { time, isRunning, isReady, isHolding } = useTimer({
    onStop: handleTimerStop,
    holdToReadyDuration
  });

  const handleCopyButtonClick = () => {
    copyToClipboard(scramble);

    const preview = trimToWords(scramble, 5) + " . . .";

    dispatch(
      addNotification({
        id: Date.now().toString(),
        message: `Copied scramble: ${preview}`,
        type: "info",
        lifetime: 5000
      })
    );
  };

  const handleGenerateButtonClick = useCallback(() => {
    if (!isRunning && !isScrambleLocked) {
      generateNewScramble();
    }
  }, [isRunning, generateNewScramble, isScrambleLocked]);

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
        onLock={handleToggleLock}
        onCopy={handleCopyButtonClick}
        onGenerate={handleGenerateButtonClick}
        isScrambleLocked={isScrambleLocked}
      />
      <Display time={displayTimeValue} textColor={displayTextColor} />
    </section>
  );
};

export default TimerModule;
