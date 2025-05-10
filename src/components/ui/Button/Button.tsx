/** @format */

import React, { useRef } from "react";
import styles from "./Button.module.css";

/**
 * Properties for the Button component.
 */
interface ButtonProps {
  /**
   * The action to perform when the button is clicked.
   */
  action: () => void;
  /**
   * The text to display on the button.
   */
  text?: string;
  /**
   * The icon to display on the button.
   *
   */
  //TODO: SVG icons
  icon: React.ReactElement<{ className?: string }>;
  /**
   * The animation to apply when the button is clicked.
   */
  animation?: "shrink" | "rotate" | "bounce" | "custom";
  /**
   * Custom keyframes for the animation.
   */
  animationOptions?: Keyframe[];
  /**
   * Timing options for the animation.
   */
  animationTiming?: KeyframeAnimationOptions;
}

/**
 * Button component that performs an action when clicked.
 *
 * @param {ButtonProps} props - The properties for the button.
 * @returns {JSX.Element} The Button component.
 */
const Button: React.FC<ButtonProps> = ({
  action,
  text,
  icon,
  animation,
  animationOptions,
  animationTiming
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  /**
   * Handler for the click event for the button.
   */
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
