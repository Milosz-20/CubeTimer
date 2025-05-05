import React from "react";
import styles from "./TimerModule.module.css";
import Notification from "@components/Notification/Notification";
import { useScramble } from "./hooks/useScramble";
import { useCopyToClipboard } from "@hooks/useCopyToClipboard";
import Scramble from "./components/Scramble/Scramble";
import Actions from "./components/Actions/Actions";
import Display from "./components/Display/Display";

const TimerModule: React.FC = () => {
  const { scramble, isGenerating, generateNewScramble } = useScramble("3x3"); // Or use context if implemented
  const { isCopying, notificationVisible, copyToClipboard, closeNotification } =
    useCopyToClipboard();

  const handleCopyScramble = () => {
    copyToClipboard(scramble);
  };

  // Placeholder for actual timer state
  const currentTime = "12.03";

  return (
    <section className={styles.timerBox}>
      {/* Use the new components, passing props */}
      <Scramble text={scramble} />
      <Actions
        onCopy={handleCopyScramble}
        onGenerate={generateNewScramble}
        isCopying={isCopying}
        isGenerating={isGenerating}
      />
      <Display time={currentTime} />

      {/* Notification remains tied to the copy action state managed here */}
      {notificationVisible && (
        <Notification message="Copied!" onClose={closeNotification} />
      )}
    </section>
  );
};

// Update the export name
export default TimerModule;
