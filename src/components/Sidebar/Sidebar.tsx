import React from "react";
import styles from "@components/Sidebar/Sidebar.module.css";
import { Link } from "react-router-dom";
import Button from "@components/ui/Button/Button";
import { toggleHistory } from "@state/notifications/notificationsSlice";
import { useDispatch } from "react-redux";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.title}>
        <h2>Cube Timer</h2>
        <Button
          action={() => {
            dispatch(toggleHistory());
          }}
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
    </aside>
  );
};

export default Sidebar;
