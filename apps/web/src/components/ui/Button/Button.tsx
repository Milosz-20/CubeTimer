import React, { useRef } from "react";
import styles from "./Button.module.css";
import { Icon, IconName } from "../Icon/Icon";

interface ButtonProps {
  action?: () => void;
  text?: string;
  icon?: IconName;
  size?: "noSpacing" | "compact" | "medium" | "large";
  color?: "green" | "gray" | "white";
  animation?: "shrink" | "rotate" | "bounce" | "custom";
  animationOptions?: Keyframe[];
  animationTiming?: KeyframeAnimationOptions;
  iconSize?: number;
  iconColor?: string;
}

export const Button: React.FC<ButtonProps> = ({
  action,
  text,
  icon,
  size = "compact",
  iconSize = 24,
  iconColor = "white",
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
        ]
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
      {icon && <Icon name={icon} size={iconSize} color={iconColor} />}
    </button>
  );
};
