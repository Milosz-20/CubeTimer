import React from "react";
import styles from "./Scramble.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@state/store";

interface ScrambleProps {
  text: string;
}

const Scramble: React.FC<ScrambleProps> = ({ text }) => {
  const cube = useSelector((state: RootState) => state.scramble.cube);
  if (!cube)
    return (
      <div className={styles.scramble}>
        <div style={{ opacity: "0" }}>
          <span>loading...</span>
        </div>
      </div>
    );

  return (
    <div className={styles.scramble}>
      <div className={styles.fadeIn}>{text}</div>
    </div>
  );
};

export default Scramble;
