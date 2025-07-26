import React, { useRef, useState } from "react";
import styles from "./Button.module.css";
import { motion } from "framer-motion";

export interface ButtonProps {
  action?: () => void;
  text?: string;
  icon?: React.ReactNode;
  size?: "noSpacing" | "compact" | "medium" | "large";
  color?: "green" | "gray" | "white";
  animation?: "shrink" | "rotate" | "bounce" | "error";
  animationOptions?: Keyframe[];
  animationTiming?: KeyframeAnimationOptions;
  motionBtn?: boolean;
  isLocked?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  action,
  text,
  icon,
  size = "compact",
  color = "white",
  animation,
  animationOptions,
  animationTiming,
  motionBtn,
  isLocked
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [rotate, setRotate] = useState<number>(0);

  const handleClick = () => {
    if (buttonRef.current) {
      const animations: Record<string, Keyframe[]> = {
        shrink: [
          { transform: "scale(1)" },
          { transform: "scale(0.9)" },
          { transform: "scale(1)" }
        ],
        // rotate: [
        //   { transform: "rotate(0deg)" },
        //   { transform: "rotate(360deg)" }
        // ],
        bounce: [
          { transform: "translateY(0)" },
          { transform: "translateY(-0.5rem)" },
          { transform: "translateY(0)" }
        ],
        error: [{ opacity: 1 }, { opacity: 0.8 }, { opacity: 1 }]
      };

      const keyframes = animations[animation!];
      const timing = animationTiming || { duration: 200, easing: "ease" };

      if (keyframes) {
        buttonRef.current.animate(keyframes, timing);
      }
    }

    if (motionBtn) {
      if (!isLocked) setRotate((r) => r + 360);
    }

    if (action) action();
  };

  return (
    <button
      ref={buttonRef}
      className={`${styles.button} ${styles[size]}`}
      onClick={handleClick}
    >
      {text && <span className={styles.text}>{text}</span>}
      {icon &&
        (motionBtn ? (
          <motion.span
            animate={{ rotate }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ display: "inline-block" }}
          >
            {icon}
          </motion.span>
        ) : (
          icon
        ))}
    </button>
  );
};
