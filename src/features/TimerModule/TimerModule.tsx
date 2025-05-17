import React, { useCallback, useEffect } from "react";
import styles from "./TimerModule.module.css";
import { useScramble } from "./hooks/useScramble";
import { useCopyToClipboard } from "@hooks/useCopyToClipboard";
import Scramble from "./components/Scramble/Scramble";
import Actions from "./components/Actions/Actions";
import Display from "./components/Display/Display";
import { formatTime } from "@utils/textFormatter";
import { useTimer } from "./hooks/useTimer";
import { useDispatch } from "react-redux";
import { addNotification } from "@state/notificationsSlice";

const TimerModule: React.FC = () => {
  const dispatch = useDispatch();
  const holdToReadyDuration = 300;
  const { scramble, generateNewScramble } = useScramble("3x3");
  const { copyToClipboard } = useCopyToClipboard();

  useEffect(() => {
    if (!scramble) {
      generateNewScramble();
    }
  }, [scramble, generateNewScramble]);

  const handleTimerStop = useCallback(
    (finalTime: number) => {
      console.log("Final time: ", finalTime);
      generateNewScramble();
    },
    [generateNewScramble]
  );

  const { time, isRunning, isReady, isHolding } = useTimer({
    onStop: handleTimerStop,
    holdToReadyDuration
  });

  const handleCopyButtonClick = () => {
    copyToClipboard(scramble);

    const preview = scramble.split(/\s+/).slice(0, 3).join(" ") + " . . .";

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
