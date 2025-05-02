// src/components/Sidebar.tsx
import React from "react";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.container}>
      <h2 className={styles.title}>Cube Timer</h2>
      <ul>
        <li className={styles.listItem}>
          <Link to="/timer">Home</Link>
        </li>
        <li className={styles.listItem}>
          <Link to="/subpage1">Subpage 1</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
