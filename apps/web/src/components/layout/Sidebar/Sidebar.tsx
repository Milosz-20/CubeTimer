import React from "react";
import styles from "@components/layout/Sidebar/Sidebar.module.css";
import { Link, useLocation } from "react-router-dom";
import { Clock, BarChart2, Bell, Settings } from "lucide-react";

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.title}>
        <h2>Cube Timer</h2>
      </div>
      <ul>
        <li
          className={`${styles.listItem} ${isActive("/timer") ? styles.active : ""}`}
        >
          <Link to="/timer">
            <Clock size={20} />
            Timer
          </Link>
        </li>
        <li
          className={`${styles.listItem} ${isActive("/statistics") ? styles.active : ""}`}
        >
          <Link to="/statistics">
            <BarChart2 size={20} />
            Statistics
          </Link>
        </li>
        <li
          className={`${styles.listItem} ${isActive("/notifications") ? styles.active : ""}`}
        >
          <Link to="/notifications">
            <Bell size={20} />
            Notifications
          </Link>
        </li>
        <li
          className={`${styles.listItem} ${isActive("/settings") ? styles.active : ""}`}
        >
          <Link to="/settings">
            <Settings size={20} />
            Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
};
