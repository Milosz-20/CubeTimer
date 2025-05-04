import React from "react";
import styles from "./Stats.module.css";

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
