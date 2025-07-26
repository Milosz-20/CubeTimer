import React, { useRef } from "react";
import styles from "./Button.module.css";

export interface ButtonProps {
  action?: () => void;
  text?: string;
  icon?: React.ReactNode;
  size?: "noSpacing" | "compact" | "medium" | "large";
  color?: "green" | "gray" | "white";
  animation?: "shrink" | "rotate" | "bounce" | "custom";
  animationOptions?: Keyframe[];
  animationTiming?: KeyframeAnimationOptions;
}

export const Button: React.FC<ButtonProps> = ({
  action,
  text,
  icon,
  size = "compact",
  color = "white",
  animation,
  animationOptions,
  animationTiming
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (buttonRef.current) {
      const animations: Record<string, Keyframe[]> = {
        shrink: [
          { transform: "scale(1)" },
          { transform: "scale(0.9)" },
          { transform: "scale(1)" }
        ],
        rotate: [
          { transform: "rotate(0deg)" },
          { transform: "rotate(360deg)" }
        ],
        bounce: [
          { transform: "translateY(0)" },
          { transform: "translateY(-0.5rem)" },
          { transform: "translateY(0)" }
        ],
        error: [{ opacity: 1 }, { opacity: 0.8 }, { opacity: 1 }]
      };

      const keyframes =
        animation === "custom" ? animationOptions : animations[animation!];
      const timing = animationTiming || { duration: 200, easing: "ease" };

      if (keyframes) {
        buttonRef.current.animate(keyframes, timing);
      }
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
      {icon && icon}
    </button>
  );
};
