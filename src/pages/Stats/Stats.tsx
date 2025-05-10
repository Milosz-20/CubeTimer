/** @format */

import React from "react";
import styles from "./Stats.module.css";

/**
 * Statistics page
 *
 * @returns {JSX.Element} stats page component
 *
 * @see {@link TimerDisplay}
 * @alpha
 */
const StatsPage: React.FC = () => {
  return (
    <main className={styles.mainContent}>
      <h1>Tu pojawią sie statystyki</h1>
      <p>To jest obszar na główną zawartość strony.</p>
      <p>Możesz tu umieścić dowolne komponenty i treść.</p>
    </main>
  );
};

export default StatsPage;
