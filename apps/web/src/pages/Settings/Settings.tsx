import React from "react";
import styles from "./Settings.module.css";

const Settings: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>
      <div className={styles.content}>
        <p className={styles.placeholder}>
          This page is under construction. Application settings will be
          available here.
        </p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>General</h2>
          <p>General application settings</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Timer</h2>
          <p>Timer settings</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Statistics</h2>
          <p>Statistics settings</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
