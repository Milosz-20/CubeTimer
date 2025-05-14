import React, { useState } from "react";
import styles from "@components/Sidebar/Sidebar.module.css";
import { Link } from "react-router-dom";
import Button from "@components/ui/Button/Button";
import NotificationHistory from "@components/NotificationHistory/NotificationHistory";

const Sidebar: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);

  const handleToggleHistory = () => {
    setShowHistory((prev) => !prev);
  };
  return (
    <aside className={styles.sidebar}>
      <div>
        <h2 className={styles.title}>Cube Timer</h2>
        <Button
          action={handleToggleHistory}
          icon="bell"
          animation="bounce"
          animationTiming={{ duration: 200 }}
        />
      </div>
      <ul>
        <li className={styles.listItem}>
          <Link to="/timer">Timer</Link>
        </li>
        <li className={styles.listItem}>
          <Link to="/stats">Stats</Link>
        </li>
        <li className={styles.listItem}>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
      {showHistory && (
        <div style={{ marginTop: "1rem" }}>
          <NotificationHistory />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
