import React from "react";
import styles from "./Actions.module.css";
import { Button } from "@components/ui/Button";
import { Lock, Unlock, Clipboard, RotateCw } from "lucide-react";

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
          icon={isScrambleLocked ? <Lock size={20} /> : <Unlock size={20} />}
          animation="bounce"
          animationTiming={{ duration: 200 }}
        />
      </div>
      <Button
        action={onCopy}
        icon={<Clipboard size={20} />}
        animationTiming={{ duration: 200 }}
        animation="shrink"
      />
      <Button
        action={onGenerate}
        icon={<RotateCw className={styles.rotateIcon} />}
        animation={isScrambleLocked ? "error" : "rotate"}
        animationTiming={{ duration: 200 }}
        motionBtn={true}
        isLocked={isScrambleLocked}
      />
    </div>
  );
};

export default Actions;
