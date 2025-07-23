import React, { useCallback, useEffect } from "react";
import styles from "./TimerModule.module.css";
import { useScramble } from "./hooks/useScramble";
import { useCopyToClipboard } from "@hooks/useCopyToClipboard";
import Scramble from "./components/Scramble/Scramble";
import Actions from "./components/Actions/Actions";
import Display from "./components/Display/Display";
import { formatTime, trimToWords } from "@utils/textFormatter";
import { useTimer } from "./hooks/useTimer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";
import { setIsScrambleLocked } from "@store/slices/timerSlice";
import { enqueueSnackbar, closeSnackbar } from "notistack";
import { CustomNotification } from "@components/ui/CustomNotification";

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

    const preview = trimToWords(scramble, 5) + "...";

    enqueueSnackbar("", {
      content: (key) => (
        <CustomNotification
          title="Copied to Clipboard"
          message={`Scramble: ${preview}`}
          variant="success"
          timestamp={new Date()}
          onClose={() => closeSnackbar(key)}
        />
      ),
      variant: "default" // Prevents default notistack styling
    });
  };

  const handleGenerateButtonClick = useCallback(() => {
    if (!isRunning && !isScrambleLocked) {
      generateNewScramble();
    }
  }, [isRunning, generateNewScramble, isScrambleLocked]);

  const displayTimeValue = formatTime(time);

  let displayTextColor = "var(--color-white)";
  if (isHolding) {
    displayTextColor = "var(--red)";
  } else if (isReady && !isRunning) {
    displayTextColor = "var(--green)";
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
