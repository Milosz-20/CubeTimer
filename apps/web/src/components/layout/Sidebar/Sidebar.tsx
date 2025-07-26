import React from "react";
import styles from "@components/layout/Sidebar/Sidebar.module.css";
import { Link } from "react-router-dom";
import { Clock, BarChart2, Bell, Settings } from "lucide-react";

export const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.title}>
        <h2>Cube Timer</h2>
      </div>
      <ul>
        <li className={styles.listItem}>
          <Link to="/timer">
            <Clock size={20} />
            Timer
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link to="/statistics">
            <BarChart2 size={20} />
            Statistics
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link to="/notifications">
            <Bell size={20} />
            Notifications
          </Link>
        </li>
        <li className={styles.listItem}>
          <Link to="/settings">
            <Settings size={20} />
            Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
};
