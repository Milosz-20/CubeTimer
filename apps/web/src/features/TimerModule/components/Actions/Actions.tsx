import React from "react";
import styles from "./Actions.module.css";
import { Button } from "@components/ui/Button";

interface ActionsProps {
  onLock: () => void;
  onCopy: () => void;
  onGenerate: () => void;
  isScrambleLocked: boolean;
}

const Actions: React.FC<ActionsProps> = ({
  onLock,
  onCopy,
  onGenerate,
  isScrambleLocked
}) => {
  return (
    <div className={styles.options}>
      <div
        className={`${styles.lockButton} ${isScrambleLocked ? styles.locked : styles.unlocked}`}
      >
        <Button
          action={onLock}
          icon={isScrambleLocked ? "locked" : "unlocked"}
          animation="bounce"
          animationTiming={{ duration: 200 }}
        />
      </div>
      <Button
        action={onCopy}
        icon="copy"
        animationTiming={{ duration: 200 }}
        animation="shrink"
      />
      <Button
        action={onGenerate}
        icon="reload"
        animation="rotate"
        animationTiming={{ duration: 200 }}
      />
    </div>
  );
};

export default Actions;
