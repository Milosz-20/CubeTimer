import React, { useRef } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  action: () => void;
  text?: string;
  icon: React.ReactElement<{ className?: string }>;
  animation?: "shrink" | "rotate" | "bounce" | "custom";
  animationOptions?: Keyframe[];
  animationTiming?: KeyframeAnimationOptions;
}

const Button: React.FC<ButtonProps> = ({
  action,
  text,
  icon,
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

    action();
  };

  return (
    <button ref={buttonRef} className={styles.button} onClick={handleClick}>
      {React.cloneElement(icon, {
        className: `${icon.props.className || ""} ${styles.icon}`.trim()
      })}
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default Button;
