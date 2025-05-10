/** @format */

import React from "react";
import styles from "./TimerPage.module.css";
import TimerDisplay from "../../features/TimerModule/TimerModule";
import StatsBlock from "../../features/StatsBlock/StatsBlock";
import SolvesBlock from "../../features/SolvesBlock/SolvesBlock";
import ScrambleVisualizer from "../../features/ScrambleVisualizer/ScrambleVisualizer";

/**
 * Main page with the timer and basic stats.
 *
 * @returns {JSX.Element} timer page component
 *
 * @see {@link TimerDisplay}
 */
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
