import React from "react";
import styles from "./Timer.module.css";

const Timer: React.FC = () => {
  return (
    <main className={styles.mainContent}>
      <h1>Timer</h1>
      <p>To jest obszar na główną zawartość strony.</p>
      <p>Możesz tu umieścić dowolne komponenty i treść.</p>
    </main>
  );
};

export default Timer;
