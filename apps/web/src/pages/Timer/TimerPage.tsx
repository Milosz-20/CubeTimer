import React from "react";
import styles from "./TimerPage.module.css";
import { TimerModule } from "@features/TimerModule";
import { StatsBlock } from "@features/StatsBlock";
import { SolvesBlock } from "@features/SolvesBlock";
import { ScrambleVisualiser } from "@features/ScrambleVisualiser";

const TimerPage: React.FC = () => {
  return (
    <main className={styles.container}>
      <div className={styles.timer}>
        <TimerModule />
      </div>
      <div className={styles.stats}>
        <SolvesBlock />
        <StatsBlock />
        <ScrambleVisualiser />
      </div>
    </main>
  );
};

export default TimerPage;
