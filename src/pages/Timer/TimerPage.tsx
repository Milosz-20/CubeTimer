import React from "react";
import styles from "./TimerPage.module.css";
import TimerModule from "../../features/TimerModule/TimerModule";
import StatsBlock from "../../features/StatsBlock/StatsBlock";
import SolvesBlock from "../../features/SolvesBlock/SolvesBlock";
import ScrambleVisualizer from "../../features/ScrambleVisualizer/ScrambleVisualizer";

const TimerPage: React.FC = () => {
  return (
    <main className={styles.container}>
      <div className={styles.timer}>
        <TimerModule />
      </div>
      <div className={styles.stats}>
        <SolvesBlock />
        <StatsBlock />
        <ScrambleVisualizer />
      </div>
    </main>
  );
};

export default TimerPage;
