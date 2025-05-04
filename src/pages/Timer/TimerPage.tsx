import React from "react";
import styles from "./TimerPage.module.css";
import TimerDisplay from "../../components/TimerDisplay/TimerDisplay";
import StatsBlock from "../../components/StatsBlock/StatsBlock";
import SolvesBlock from "../../components/SolvesBlock/SolvesBlock";
import ScrambleVisualizer from "../../components/ScrambleVisualizer/ScrambleVisualizer";

const TimerPage: React.FC = () => {
  return (
    <main className={styles.container}>
      <div className={styles.timer}>
        <TimerDisplay />
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
