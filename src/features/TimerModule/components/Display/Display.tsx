import React from "react";
import styles from "./Display.module.css";

interface DisplayProps {
  time: string; // Or number, depending on how you manage time state
}

const Display: React.FC<DisplayProps> = ({ time }) => {
  return <div className={styles.time}>{time}</div>;
};

export default Display;
