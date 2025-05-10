import React from "react";
import styles from "./Display.module.css";

/**
 * Properties for the Display component.
 */
interface DisplayProps {
  /**
   * The time to display.
   */
  time: string;
  /**
   * The color of the text.
   */
  textColor?: string;
}

/**
 * Display component to show the timer value.
 *
 * @param {DisplayProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const Display: React.FC<DisplayProps> = ({ time, textColor }) => {
  const displayStyle = textColor ? { color: textColor } : {};

  return (
    <div className={styles.time} style={displayStyle}>
      {time}
    </div>
  );
};

export default Display;
