import React from "react";
import styles from "./Scramble.module.css";

/**
 * Properties for the Scramble component.
 */
interface ScrambleProps {
  /**
   * The scramble string to display.
   */
  text: string;
}

/**
 * Scramble component to display a scramble string.
 * 
 * @param {ScrambleProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const Scramble: React.FC<ScrambleProps> = ({ text }) => {
  return <div className={styles.scramble}>{text}</div>;
};

export default Scramble;
