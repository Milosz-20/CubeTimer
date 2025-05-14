import React from "react";
import styles from "./Actions.module.css";
import Button from "@components/ui/Button/Button";

interface ActionsProps {
  onCopy: () => void;
  onGenerate: () => void;
}

const Actions: React.FC<ActionsProps> = ({ onCopy, onGenerate }) => {
  return (
    <div className={styles.options}>
      <Button
        action={onCopy}
        icon="unlocked"
        animation="bounce"
        animationTiming={{ duration: 225 }}
      />
      <Button
        action={onCopy}
        icon="copy"
        animationTiming={{ duration: 150 }}
        animation="shrink"
      />
      <Button
        action={onGenerate}
        icon="reload"
        animation="rotate"
        animationTiming={{ duration: 300 }}
      />
    </div>
  );
};

export default Actions;
