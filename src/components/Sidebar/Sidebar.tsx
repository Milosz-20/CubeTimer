import React from "react";
import styles from "@components/Sidebar/Sidebar.module.css";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.container}>
      <h2 className={styles.title}>Cube Timer</h2>
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
    </aside>
  );
};

export default Sidebar;
