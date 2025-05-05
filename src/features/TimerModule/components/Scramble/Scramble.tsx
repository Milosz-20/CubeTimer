import React from "react";
import styles from "./Scramble.module.css";

interface ScrambleProps {
  text: string;
}

const Scramble: React.FC<ScrambleProps> = ({ text }) => {
  return <div className={styles.scramble}>{text}</div>;
};

export default Scramble;
