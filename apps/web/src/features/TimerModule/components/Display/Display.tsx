import React from "react";
import styles from "./Display.module.css";

interface DisplayProps {
  time: string;
  textColor?: string;
}

const Display: React.FC<DisplayProps> = ({ time, textColor }) => {
  const displayStyle = textColor ? { color: textColor } : {};

  return (
    <div className={styles.time} style={displayStyle}>
      {time}
    </div>
  );
};

export default Display;
